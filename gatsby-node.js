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
    const signData = await getData(fileBase + "signs.tsv")
    if (signData.error) throw signData.error

    const groupingData = {}

    const groupingMeta = await getData(fileBase + "groupings/groupings_meta.tsv")
    if (groupingMeta.error) throw groupingMeta.error

    console.log("groupingMeta", groupingMeta)
    for (let grouping of groupingMeta.results) {
        const name = grouping.name
        grouping.data = []

        // name, sign
        const groupDataIn = await getData(fileBase + "groupings/" + name + ".tsv")
        if (groupDataIn.error) throw groupDataIn.error

        // name, display_name
        const groupMetaIn = await getData(fileBase + "groupings/" + name + "_meta.tsv")
        if (groupDataIn.error) throw groupDataIn.error

        for (let groupData of groupDataIn.results) {
            const data = grouping.data.find((data) => data.name === groupData.name)
            if (!data) {
                grouping.data.push({
                    name: groupData.name,
                    signs: [groupData.sign]
                })
            } else {
                data.signs = [...(data.signs || []), groupData.sign]
            }
        }

        for (let groupMeta of groupMetaIn.results) {
            const data = grouping.data.find((data) => data.name === groupMeta.name)
            if (!data) {
                grouping.data.push({ ...groupMeta })
            } else {
                for (let key in groupMeta) {
                    data[key] = groupMeta[key]
                }
            }
        }

        groupingData[name] = grouping
    }

    signData.results.forEach(sign => {
        const node = makeSignNode(sign, { createNodeId, createContentDigest })
        actions.createNode(node);
    });

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


function getData(fileName) {
    return new Promise(resolve => {
        let results = []

        let file
        try {
            file = fs.readFileSync(fileName).toString()
        } catch (e) {
            resolve({error: e})
        }
        Readable.from(file.split("\n"))
            .pipe(csv({
                mapHeaders: ({ header }) => header === "" ? null : header,
                mapValues: ({ header, value }) => {
                    if (header === "elements") {
                        return value.split(";")
                    }
                    return value
                },
                separator: "\t"
            }))
            .on('data', (data) => results.push(data))
            .on('error', (error) => {
                console.error(error)
                resolve({ error })
            })
            .on('end', () => {
                resolve({ results })
            });
    })
}
