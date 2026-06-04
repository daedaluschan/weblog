---
date: 2026-06-02
authors:
  - daedalus
tags:
  - AI learning
  - GitHub Pages
  - MkDocs
  - Blogging
categories:
  - Learning Log
  - Site Notes
image: ../../assets/images/ai-journal-cover.svg
---

# Starting My AI Journal

Today I am opening a small public notebook for my AI self-learning journey. I want a place that can hold both technical notes and personal reflections: the commands that worked, the concepts that finally clicked, the prompts that helped, and the mistakes that taught me something.

<!-- more -->

## Why a Markdown-first blog?

I expect many of my future posts to be drafted with AI assistance, so I do not need a heavy content management system or a visual editor. Markdown is enough. It keeps every post readable in Git, easy to review, and simple to regenerate or improve later.

The most important requirement is that publishing should stay boring:

1. Write a Markdown file under `docs/blog/posts/`.
2. Add front matter for the date, tags, and categories.
3. Commit and push to GitHub.
4. Let GitHub Actions build and publish the site.

That workflow is friendly to humans and AI tools because the source of truth is plain text.

## How this blog is published

This repository uses [MkDocs](https://www.mkdocs.org/) with the Material theme. The built-in Material blog plugin scans the posts folder, then generates the blog index, pagination, archives, and category pages automatically. The tags plugin generates a topic index from the tags declared in each post.

The publishing pipeline is also intentionally small:

- `mkdocs.yml` defines the site name, theme, navigation, blog plugin, and tags plugin.
- `requirements.txt` pins the Python package family needed to build the site.
- `.github/workflows/pages.yml` installs those dependencies, runs `mkdocs build --strict`, uploads the generated `site/` directory, and deploys it to GitHub Pages.

## How to publish your own GitHub Pages blog

If you want to create a similar blog, the shape is straightforward:

```text
.
├── .github/workflows/pages.yml
├── docs/
│   ├── index.md
│   ├── tags.md
│   └── blog/
│       ├── index.md
│       └── posts/
│           └── my-first-post.md
├── mkdocs.yml
└── requirements.txt
```

A post is just Markdown with metadata at the top:

```markdown
---
date: 2026-06-02
tags:
  - MkDocs
  - GitHub Pages
categories:
  - Site Notes
---

# My first post

Write the post here.
```

After pushing to GitHub, enable GitHub Pages for the repository and choose **GitHub Actions** as the source. From then on, every push to the main publishing branch can rebuild and redeploy the blog.

## What comes next

My plan is to keep this journal practical. Some posts will be polished explanations. Others will be raw learning logs. Over time, I want the archive to become a map of how my understanding of AI systems, tools, and workflows grows through steady experimentation.

## Share this post

[Share on X](https://twitter.com/intent/tweet?text=Starting%20My%20AI%20Journal&url=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F02%2Fstarting-my-ai-journal%2F){ .md-button target="_blank" rel="noopener" }
[Share on LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F02%2Fstarting-my-ai-journal%2F){ .md-button target="_blank" rel="noopener" }
[Share on Facebook](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F02%2Fstarting-my-ai-journal%2F){ .md-button target="_blank" rel="noopener" }
