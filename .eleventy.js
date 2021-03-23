const sortPostsByDate = require('./src/utils/sort-posts-by-date.js')
const rssPlugin = require('@11ty/eleventy-plugin-rss')

// Filters
const dateFilter = require('./src/filters/date-filter.js')
const w3DateFilter = require('./src/filters/w3-date-filter.js')

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js')

const Image = require('@11ty/eleventy-img')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
        widths: [300, 600],
        formats: ['avif', 'jpeg'],
        outputDir: './dist/img/',
    })

    let imageAttributes = {
        alt,
        sizes,
        loading: 'lazy',
        decoding: 'async',
    }

    return Image.generateHTML(metadata, imageAttributes)
}

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production'

module.exports = (config) => {
    // Add filters
    config.addFilter('dateFilter', dateFilter)
    config.addFilter('w3DateFilter', w3DateFilter)

    // Plugins
    config.addPlugin(rssPlugin)
    config.addPlugin(syntaxHighlight)

    // Returns posts, sorted by display order
    config.addCollection('posts', (collection) => {
        return sortPostsByDate(collection.getFilteredByGlob('./src/posts/*.md'))
    })

    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform('htmlmin', htmlMinTransform)
    }

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false)

    // Add custom template shortcodes
    config.addNunjucksAsyncShortcode('image', imageShortcode)

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
