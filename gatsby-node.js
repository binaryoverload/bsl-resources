/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const csv = require('csv-parser')
const fs = require('fs')

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

function makeSignNode(sign, {createNodeId, createContentDigest}) {
    const newSign = {...sign}

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
    const signData = await getData();

    signData.forEach(sign => {
        sign.week = sign.week.split(",")
        sign.category = sign.category.split(",")
    })

    signData.forEach(sign => {
        const node = makeSignNode(sign, {createNodeId, createContentDigest})
        actions.createNode(node);
    });

    const categories = groupByCategory(signData);

    Object.keys(categories).forEach(category => {
        const node = {
            name: category,
            signs: categories[category].map(s => makeSignNode(s, {createNodeId, createContentDigest})),
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
            signs: weeks[week].map(s => makeSignNode(s, {createNodeId, createContentDigest})),
            id: createNodeId(`Week-${week}`),
            internal: {
                type: "Week",
                contentDigest: createContentDigest(week)
            }
        };

        actions.createNode(node);
    })
}

function getData() {
    return new Promise(resolve => {
        const results = [];

        fs.createReadStream('./src/data/signs.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                resolve(results)
            });
    })
}
