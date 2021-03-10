const sortPostsByDate = require("./src/utils/sort-posts-by-date.js");

module.exports = (config) => {
  // Returns posts, sorted by display order
  config.addCollection("posts", (collection) => {
    return sortPostsByDate(collection.getFilteredByGlob("./src/posts/*.md"));
  });

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/static/*/*");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
