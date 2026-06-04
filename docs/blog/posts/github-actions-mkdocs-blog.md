---
date: 2026-06-04
authors:
  - daedalus
tags:
  - GitHub Actions
  - GitHub Pages
  - MkDocs
  - Blogging
  - Deployment
categories:
  - Learning Log
  - Site Notes
image: ../../assets/images/ai-journal-cover.svg
---

# What I Learnt About GitHub Actions When Building My MkDocs Blog

When I first started setting up my personal blog with GitHub Pages and MkDocs, I thought the process would be quite simple.

I had my Markdown files. I had my `mkdocs.yml` configuration file. I knew MkDocs could turn Markdown into a website. I also knew GitHub Pages could host a static website.

But then I saw a GitHub Actions workflow file, and that was where I got confused.

<!-- more -->

At first, GitHub Actions felt like a mysterious extra layer. I could see lines like:

```yaml
uses: actions/checkout@v6
run: mkdocs build --strict
uses: actions/upload-pages-artifact@v4
uses: actions/deploy-pages@v4
```

I understood the words individually, but I did not really understand what was happening as a whole.

Where did the HTML files go?  
Who was building the website?  
Was GitHub Pages reading my `mkdocs.yml` directly?  
Was MkDocs running somewhere inside GitHub?

After spending some time learning it, the idea became much clearer.

## The Key Realisation

The most important thing I learnt is this:

> GitHub Pages does not directly read my `mkdocs.yml` and Markdown files. GitHub Actions runs MkDocs, builds the static website, and publishes the generated result to GitHub Pages.

My repository contains the source files:

```text
mkdocs.yml
docs/index.md
docs/about.md
requirements.txt
.github/workflows/deploy.yml
```

But visitors see generated files such as:

```text
index.html
assets/
search/
stylesheets/
```

Those files are created during the GitHub Actions workflow.

## What GitHub Actions Is Doing

I now think of GitHub Actions as an automated worker.

When I push changes to my repository, it:

1. Starts a temporary Linux machine.
2. Downloads my repository.
3. Sets up Python.
4. Installs MkDocs and required plugins.
5. Runs `mkdocs build --strict`.
6. Creates a `site/` folder containing the finished website.
7. Uploads that folder as a Pages artifact.
8. Deploys the artifact to GitHub Pages.

The build happens on a temporary GitHub Actions runner, not on my laptop or inside GitHub Pages itself.

## Why I Could Not See the HTML Files in My Repository

After deployment worked, I expected to find the generated HTML files in my repository.

With the newer GitHub Pages deployment method, those files are not committed back to the repository. They are created temporarily in the `site/` folder, uploaded as a deployment artifact, and then published.

```text
Markdown files + mkdocs.yml
        ↓
GitHub Actions runner
        ↓
mkdocs build
        ↓
site/ folder
        ↓
Pages artifact
        ↓
GitHub Pages website
```

The generated HTML exists, but not on my `main` branch.

## How I Understand Each Part Now

| Part | What it does |
|---|---|
| Markdown files | The content I write |
| `mkdocs.yml` | Site configuration |
| `requirements.txt` | Python packages needed for the build |
| GitHub Actions workflow | Automation instructions |
| MkDocs | Converts Markdown into HTML |
| GitHub Pages | Hosts the final static website |

The distinction is simple:

> GitHub Actions builds my MkDocs site, and GitHub Pages hosts it.

## Why GitHub Actions Is Useful

I could run `mkdocs build` manually, but then I would need to build and upload the site every time I made a change.

GitHub Actions automates that process. I can update my Markdown files, push to GitHub, and let the workflow handle the rest.

This makes deployments repeatable, consistent, and independent of my local setup.

## My Current Mental Model

> My repository stores the source of the website. GitHub Actions turns that source into a finished website. GitHub Pages publishes the finished website.

That single sentence explains the deployment process clearly.

GitHub Actions is simply a set of instructions running on a temporary machine. MkDocs runs during the workflow, and the `deploy-pages` step publishes the built `site/` folder rather than committing HTML files back to the repository.

## Final Thought

Learning this showed me that GitHub Actions is useful even for a simple personal blog. It automates the important task of building and publishing the site correctly every time.

What initially looked intimidating became straightforward:

```text
Write Markdown.
Push to GitHub.
GitHub Actions builds the site.
GitHub Pages publishes it.
```

That is the main lesson I learnt from setting up my MkDocs blog.

---

# 建立 MkDocs Blog 時，我學識咗 GitHub Actions 係點運作

最初我開始用 GitHub Pages 同 MkDocs 建立自己個 personal blog 時，我以為成件事應該幾簡單。

我有 Markdown files，有 `mkdocs.yml` configuration file。我知道 MkDocs 可以將 Markdown 轉成 website。我亦都知道 GitHub Pages 可以 host static website。

但當我見到 GitHub Actions workflow file 時，就開始覺得混亂。

一開始，GitHub Actions 對我嚟講好似係一層神秘嘅東西。我見到類似以下嘅 lines：

```yaml
uses: actions/checkout@v6
run: mkdocs build --strict
uses: actions/upload-pages-artifact@v4
uses: actions/deploy-pages@v4
```

每一個字我大概都明，但合埋一齊之後，我其實唔係好明成個流程實際發生緊咩事。

HTML files 去咗邊？  
邊個負責 build 個 website？  
係咪 GitHub Pages 直接讀我個 `mkdocs.yml`？  
MkDocs 係咪喺 GitHub 入面自己自動 run？

花咗少少時間理解之後，件事開始清晰好多。

## 最重要嘅理解

我學到最重要嘅一點係：

> GitHub Pages 唔係直接讀我個 `mkdocs.yml` 同 Markdown files。真正做 build 嘅係 GitHub Actions。GitHub Actions 會 run MkDocs，build 出 static website，然後再將生成出嚟嘅結果 publish 到 GitHub Pages。

我個 repository 入面放嘅係 source files：

```text
mkdocs.yml
docs/index.md
docs/about.md
requirements.txt
.github/workflows/deploy.yml
```

但 visitors 真正見到嘅，係生成出嚟嘅 files，例如：

```text
index.html
assets/
search/
stylesheets/
```

呢啲 files 係 GitHub Actions workflow run 嘅時候產生出嚟。

## GitHub Actions 實際做緊咩

而家我會將 GitHub Actions 想像成一個自動化工人。

當我 push changes 去 repository，佢就會：

1. 開一部 temporary Linux machine。
2. 下載我個 repository。
3. Set up Python。
4. Install MkDocs 同需要用到嘅 plugins。
5. Run `mkdocs build --strict`。
6. 建立一個 `site/` folder，入面放住完成咗嘅 website。
7. 將呢個 folder upload 成 Pages artifact。
8. 將 artifact deploy 去 GitHub Pages。

所以 build 個過程唔係發生喺我部 laptop，亦都唔係 GitHub Pages 自己直接做。  
真正 build 嘅地方，係一個 temporary GitHub Actions runner。

## 點解我喺 Repository 見唔到 HTML Files

另一個令我混亂嘅地方係：deployment 成功之後，我以為應該可以喺 repository 入面見到生成出嚟嘅 HTML files。

但用現代 GitHub Pages deployment method 時，呢啲 HTML files 唔會 commit 返入 repository。

佢哋會喺 workflow run 嘅時候暫時建立喺 `site/` folder 入面，然後 upload 成 deployment artifact，再 publish 出去。

流程大概係：

```text
Markdown files + mkdocs.yml
        ↓
GitHub Actions runner
        ↓
mkdocs build
        ↓
site/ folder
        ↓
Pages artifact
        ↓
GitHub Pages website
```

所以 generated HTML 係存在嘅，只係唔喺我個 `main` branch 入面。

## 我而家點樣理解每一部分

| Part | 作用 |
|---|---|
| Markdown files | 我寫嘅內容 |
| `mkdocs.yml` | Website configuration |
| `requirements.txt` | Build website 時需要嘅 Python packages |
| GitHub Actions workflow | 自動化指令 |
| MkDocs | 將 Markdown 轉成 HTML |
| GitHub Pages | Host 最終嘅 static website |

而家我會咁樣理解：

> GitHub Actions 負責 build 我個 MkDocs site，而 GitHub Pages 負責 host 佢。

## 點解 GitHub Actions 有用

其實我可以喺自己部電腦手動 run `mkdocs build`，但咁樣每次改完文章之後，我都要記得自己 build 同 upload。

GitHub Actions 就係幫我自動化呢個過程。

我只需要 update Markdown files，push 去 GitHub，之後 workflow 就會自動處理餘下嘅事情。

呢個做法令 deployment 更加 repeatable、consistent，亦唔需要依賴我自己部機裝咗啲咩。

## 我而家嘅 Mental Model

> 我個 repository 儲存 website 嘅 source。GitHub Actions 將 source 轉成完成版 website。GitHub Pages 將完成版 website publish 出去。

呢一句基本上解釋咗成個 deployment process。

GitHub Actions 唔係魔法。佢其實只係一堆指令，喺一部 temporary machine 上面執行。

MkDocs 係 workflow 入面 run。  
`deploy-pages` step 亦唔係將 HTML files commit 返入 repository，而係將已經 build 好嘅 `site/` folder publish 去 GitHub Pages。

## 最後感想

學識呢個過程之後，我發現 GitHub Actions 唔係淨係俾大型 engineering team 或者複雜 CI/CD pipeline 用。

就算只係一個簡單 personal blog，GitHub Actions 都好有用，因為佢幫我自動處理一件重要但重複嘅工作：每次正確咁 build 同 publish 個 website。

一開始 workflow file 睇落好 intimidating，但當我理解背後個故事之後，就變得直接好多：

```text
Write Markdown.
Push to GitHub.
GitHub Actions builds the site.
GitHub Pages publishes it.
```

呢個就係我建立 MkDocs blog 時，對 GitHub Actions 最大嘅理解。

## Share this post

[Share on X](https://twitter.com/intent/tweet?text=What%20I%20Learnt%20About%20GitHub%20Actions%20When%20Building%20My%20MkDocs%20Blog&url=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F04%2Fwhat-i-learnt-about-github-actions-when-building-my-mkdocs-blog%2F){ .md-button target="_blank" rel="noopener" }
[Share on LinkedIn](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F04%2Fwhat-i-learnt-about-github-actions-when-building-my-mkdocs-blog%2F){ .md-button target="_blank" rel="noopener" }
[Share on Facebook](https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdaedaluschan.github.io%2Fweblog%2Fblog%2F2026%2F06%2F04%2Fwhat-i-learnt-about-github-actions-when-building-my-mkdocs-blog%2F){ .md-button target="_blank" rel="noopener" }
