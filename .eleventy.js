const sortPostsByDate = require('./src/utils/sort-posts-by-date.js')
const rssPlugin = require('@11ty/eleventy-plugin-rss')

// Filters
const dateFilter = require('./src/filters/date-filter.js')
const w3DateFilter = require('./src/filters/w3-date-filter.js')

module.exports = (config) => {
    // Add filters
    config.addFilter('dateFilter', dateFilter)
    config.addFilter('w3DateFilter', w3DateFilter)

    // Plugins
    config.addPlugin(rssPlugin)

    // Returns posts, sorted by display order
    config.addCollection('posts', (collection) => {
        return sortPostsByDate(collection.getFilteredByGlob('./src/posts/*.md'))
    })

    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/static/*/*')

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist',
        },
    }
}
