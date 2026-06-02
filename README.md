# My AI Journal

A personal blog of all the bits and bites throughout my AI self-learning journey.

This repository contains a MkDocs Material blog published with GitHub Pages.

## Repository settings required on GitHub

The source files in this repository are ready for GitHub Pages, but GitHub still needs a few repository settings before the first deployment can succeed.

### 1. Push or merge this project to the publishing branch

The workflow in `.github/workflows/pages.yml` deploys when commits are pushed to `main` or `master`. If your repository uses another default branch name, either rename the branch on GitHub or add that branch name to the workflow's `on.push.branches` list.

For the expected site URL, this project is configured as:

- GitHub user: `daedaluschan`
- Repository: `weblog`
- Published site URL: `https://daedaluschan.github.io/weblog/`

That URL is also set in `mkdocs.yml` as `site_url`.

### 2. Enable GitHub Pages deployment from Actions

In the GitHub web UI for `daedaluschan/weblog`:

1. Open **Settings**.
2. Select **Pages** from the left sidebar.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save the setting if GitHub shows a save button.

Do **not** choose “Deploy from a branch” for this project. The workflow builds MkDocs into the generated `site/` directory and uploads that output as a Pages artifact.

### 3. Make sure Actions are allowed to run

In the GitHub web UI:

1. Open **Settings**.
2. Select **Actions** → **General**.
3. Under **Actions permissions**, allow GitHub Actions for this repository.
4. Under **Workflow permissions**, the default **Read repository contents permission** is enough because the workflow explicitly requests `pages: write` and `id-token: write` permissions.

### 4. About the Node.js 20 deprecation warning

If GitHub shows a warning such as `Node.js 20 actions are deprecated`, the workflow opts into the Node.js 24 JavaScript action runtime with `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`. It also uses the latest newer major versions where available: `actions/checkout@v6`, `actions/setup-python@v6`, and `actions/upload-pages-artifact@v4`. The Pages actions remain on the current supported major versions, `actions/configure-pages@v5` and `actions/deploy-pages@v4`, while the Node.js 24 runtime flag handles the deprecation warning.

### 5. Trigger the first deployment

After the settings above are in place, push a commit to `main` or `master`, or run the workflow manually:

1. Open the **Actions** tab.
2. Select **Deploy MkDocs site to GitHub Pages**.
3. Click **Run workflow**.

When the run completes, GitHub shows the deployed Pages URL in the deployment summary. It should be `https://daedaluschan.github.io/weblog/` for this repository.

### 6. Optional custom domain

No custom domain is required. If you add one later, configure it in **Settings** → **Pages** and then update `site_url` in `mkdocs.yml` to match the custom domain.

## Local preview

```bash
python -m pip install -r requirements.txt
mkdocs serve
```

## Build

```bash
mkdocs build --strict
```

## Add a new blog post

Create a Markdown file under `docs/blog/posts/` with front matter like this:

```markdown
---
date: 2026-06-02
tags:
  - AI learning
  - MkDocs
categories:
  - Learning Log
---

# Post title

Write the post here.
```

Commit and push the file, and GitHub Actions will publish the updated blog.
