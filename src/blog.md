---
title: 'blog'
layout: 'layouts/feed.html'
pagination:
    data: collections.posts
    size: 5
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Newer posts'
paginationNextText: 'Older posts'
paginationAnchor: '#post-list'
---

My personal blog, with some thoughts about tech, discourse, and life.
