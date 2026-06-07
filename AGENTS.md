# AGENTS.md

## Project background

This repository is the source for **My AI Journal**, a personal Markdown-first blog by **Daedalus (DD)**.

- Site title: `My AI Journal`
- Description: `A personal blog of all the bits and bites throughout my AI self-learning journey`
- GitHub user: `daedaluschan`
- Repository: `weblog`
- Published URL: `https://daedaluschan.github.io/weblog/`

The blog is intended for mixed personal and technical notes about AI self-learning. There is no CMS or web-based post editor. Posts are expected to be generated or edited as Markdown files, often with AI assistance, and committed to Git.

## Technical stack

- Static site generator: **MkDocs**
- Theme and blog support: **Material for MkDocs**
- Python dependencies: `requirements.txt`
- Site configuration: `mkdocs.yml`
- Source content: `docs/`
- Blog posts: `docs/blog/posts/`
- Generated output: `site/` and must not be committed

Material for MkDocs was chosen because its built-in blog plugin supports the required blog features:

- Markdown posts under `docs/`
- Pagination
- Archive pages
- Categories
- Tags
- Optional post images/front matter
- No post editing UI required

## Content conventions

Add new blog posts under `docs/blog/posts/`.

Use front matter similar to:

```markdown
---
date: 2026-06-02
authors:
  - daedalus
tags:
  - AI learning
  - MkDocs
categories:
  - Learning Log
image: ../../assets/images/ai-journal-cover.svg
---

# Post title

Opening excerpt.

<!-- more -->

Rest of the post.
```

Notes:

- Keep post files in Markdown.
- Include `<!-- more -->` because `mkdocs.yml` currently requires post excerpts.
- Reuse images from `docs/assets/images/` when possible.
- Author metadata is stored in `docs/blog/.authors.yml`.
- The tags page uses the Material marker in `docs/tags.md`; do not reintroduce deprecated `tags_file` configuration in `mkdocs.yml`.

## Deployment details

GitHub Pages deployment is handled by `.github/workflows/pages.yml`.

The workflow:

1. Runs on pushes to `main` or `master`, and can also be started manually with `workflow_dispatch`.
2. Installs Python 3.12 dependencies from `requirements.txt`.
3. Runs `mkdocs build --strict`.
4. Uploads the generated `site/` directory as a Pages artifact.
5. Deploys the artifact to GitHub Pages.

Required GitHub repository settings:

1. Go to **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Do not choose branch-based deployment for this repository.
4. Go to **Settings → Actions → General** and ensure GitHub Actions are allowed.

## Previously encountered build/deployment issues

### Node.js 20 GitHub Actions warning

During setup, GitHub Actions showed a warning like:

```text
Node.js 20 actions are deprecated. The following actions are running on Node.js 20 and may not work as expected: actions/checkout@v4, actions/configure-pages@v5, actions/setup-python@v5.
```

The fix was to update the workflow and avoid the older action/runtime combination:

- Use newer action major versions where available, such as `actions/checkout@v6`, `actions/setup-python@v6`, and `actions/upload-pages-artifact@v4`.
- Remove the `actions/configure-pages@v5` step because it was not required for this simple MkDocs Pages deployment and was part of the warning.
- Keep `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` in the workflow environment so JavaScript actions run with the Node.js 24 runtime.

If a future Actions run reports the same old warning, first verify that the run is using the latest committed `.github/workflows/pages.yml` and not an older workflow revision.

### MkDocs strict mode warnings

`mkdocs build --strict` treats warnings as failures.

Two strict-mode issues were fixed previously:

- The deprecated Material tags plugin option `tags_file` was removed from `mkdocs.yml`.
- The homepage blog link was changed from `blog/` to `blog/index.md` to avoid unresolved-link warnings.

Always run this before committing MkDocs changes:

```bash
mkdocs build --strict
```

## Agent instructions for future changes

- Preserve the Markdown-first blog workflow.
- Keep blog source files under `docs/`.
- Do not commit generated `site/` output.
- Do not re-add `actions/configure-pages@v5` unless there is a confirmed need and the Node.js runtime warning is addressed.
- Do not re-add deprecated MkDocs Material options that break strict mode.
- After changing workflow, MkDocs configuration, or content links, run `mkdocs build --strict`.
