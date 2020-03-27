/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const csv = require('csv-parser')
const fs = require('fs')

const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

const groupByCategory = groupBy('category');
const groupByWeek = groupBy('week');

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

    const signData = result.data.allSign.nodes

    signData.forEach(sign => {
        createPage({
            path: `/sign/${sign.sign}`,
            component: require.resolve(`./src/templates/sign-template.js`),
            context: { sign },
        })
    })
}

function makeSignNode(sign, {createNodeId, createContentDigest}) {
    const node = {
        ...sign,
        id: createNodeId(`Sign-${sign.sign}`),
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
        const node = makeSignNode(sign, {createNodeId, createContentDigest})
        actions.createNode(node);
    });

    const categories = groupByCategory(signData);
    console.log(categories);

    Object.keys(categories).forEach(category => {
        console.log(categories[category])
        const node = {
            category,
            signs: categories[category].map(s => makeSignNode(s, {createNodeId, createContentDigest})),
            id: createNodeId(`Category-${category}`),
            internal: {
                type: "Category",
                contentDigest: createContentDigest(category)
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
