/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const csv = require('csv-parser')
const fs = require('fs')
const { Readable } = require('stream');

function makeSignNode(sign, { createNodeId, createContentDigest }) {
    const newSign = { ...sign }

    const node = {
        ...newSign,
        id: createNodeId(`Sign-${newSign.sign}`),
        internal: {
            type: "Sign",
            contentDigest: createContentDigest(sign)
        }
    };

    return node
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const fileBase = "./src/data/"
    const signData = await getData(fileBase + "signs.csv")

    const groupingData = {}
    
    for (let file of fs.readdirSync(fileBase + "groupings/")) {
        if (!file.endsWith(".csv")) continue
        const fileData = await getData(fileBase + "groupings/" + file)
        if (fileData.meta) {
            groupingData[fileData.meta.name || file.substring(0, file.lastIndexOf("."))] = fileData
        } else {
            groupingData[file.substring(0, file.lastIndexOf("."))] = fileData
        }
    }

    signData.results.forEach(sign => {
        for (grouping in groupingData) {
            groupingData[grouping].results.forEach(row => {
                if (row.elements.includes(sign.sign)) {
                    sign[grouping] = [...(sign[grouping] || []), row.name]
                }
            })

            if (!sign[grouping]) {
                sign[grouping] = [groupingData[grouping].meta.unknown]
                let unknownGroup = groupingData[grouping].results.find(result => result.name === groupingData[grouping].meta.unknown);
                if (!unknownGroup) {
                    groupingData[grouping].results.push({
                        display_name: groupingData[grouping].meta.unknown_display,
                        name: groupingData[grouping].meta.unknown,
                        elements: [sign.sign]
                    })
                } else {
                    unknownGroup.elements.push(sign.sign)
                }
            }
        }

        const node = makeSignNode(sign, { createNodeId, createContentDigest })
        actions.createNode(node);
    });

    console.log(JSON.stringify(groupingData, null, 2))

    Object.keys(groupingData).forEach(groupingName => {
        const node = {
            ...groupingData[groupingName],
            id: createNodeId(`Grouping-${groupingName}`),
            internal: {
                type: "Grouping",
                contentDigest: createContentDigest(groupingName)
            }
        };

        actions.createNode(node);
        
    })
}

function getFileMeta(fileName) {
    const regex = /^---(?:\r?\n)?([^]+)(?:\r?\n)?---/;
    try {
        let file = fs.readFileSync(fileName).toString()
        let match;
        let meta;
        if ((match = regex.exec(file)) !== null) {
            file = file.toString().substring(match[0].length).trim()
            let metaLines = match[1].split("\n").filter(s => s !== "")
            meta = {}
            for (const line of metaLines) {
                const kv = line.split(":")
                if (kv.length === 2) {
                    meta[kv[0].trim()] = kv[1].trim()
                }
            }
        }
        return { file, meta }
    } catch (e) {
        console.error(e)
        return { error: e }
    }
}

function getData(fileName) {
    const { file, meta, error } = getFileMeta(fileName);

    return new Promise(resolve => {
        if (error) resolve({ error })

        let result = { meta, results: [] }

        Readable.from(file.split("\n"))
            .pipe(csv({
                mapValues: ({header, value}) => {
                    if (header === "elements") {
                        return value.split(";")
                    }
                    return value
                }
            }))
            .on('data', (data) => result.results.push(data))
            .on('end', () => {
                resolve(result)
            });
    })
}
