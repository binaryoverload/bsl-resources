/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const csv = require('csv-parser')
const fs = require('fs')
const { Readable } = require('stream');

const groupBy = (key, defaultValue) => array =>
    array.reduce((objectsByKeyValue, obj) => {
        let values = obj[key];
        if (!values || !values[0]) values = ([defaultValue] || ["unknown"])

        values.forEach(value => {
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        })

        return objectsByKeyValue;
    }, {});

const groupByCategory = groupBy('category', 'uncategorised');
const groupByWeek = groupBy('week', 'undefined');

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allSign {
                nodes {
                    sign
                    category
                    week
                    video_url
                    hint
                }
            }

        }
    `)
}

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
            groupingData[fileData.meta.name || file.substring(0, file.lastIndexOf("."))] = fileData.results
        } else {
            groupingData[file.substring(0, file.lastIndexOf("."))] = fileData.results
        }
    }

    console.log(JSON.stringify(signData, null, 2))
    console.log(JSON.stringify(groupingData, null, 2))

    signData.forEach(sign => {
        sign.week = sign.week.split(",")
        sign.category = sign.category.split(",")
    })

    signData.forEach(sign => {
        const node = makeSignNode(sign, { createNodeId, createContentDigest })
        actions.createNode(node);
    });

    const categories = groupByCategory(signData);

    Object.keys(categories).forEach(category => {
        const node = {
            name: category,
            signs: categories[category].map(s => makeSignNode(s, { createNodeId, createContentDigest })),
            id: createNodeId(`Category-${category}`),
            internal: {
                type: "Category",
                contentDigest: createContentDigest(category)
            }
        };

        actions.createNode(node);
    })

    const weeks = groupByWeek(signData);
    Object.keys(weeks).forEach(week => {
        const node = {
            name: week,
            signs: weeks[week].map(s => makeSignNode(s, { createNodeId, createContentDigest })),
            id: createNodeId(`Week-${week}`),
            internal: {
                type: "Week",
                contentDigest: createContentDigest(week)
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
            .pipe(csv())
            .on('data', (data) => result.results.push(data))
            .on('end', () => {
                resolve(result)
            });
    })
}
