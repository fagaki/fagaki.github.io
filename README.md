# Fagaki

**Φαγάκι - Little dish - Petit plat - Kleines Gericht - Piattino - Comidita - Comidinha - غذای خانگی**

Home recipes from amateur cooks, in many languages. Live at https://fagaki.github.io/.

The site is built with Jekyll, which GitHub Pages runs by itself on every push. There is no build pipeline to maintain.

## Languages

The whole site exists in every language listed in [_data/languages.yml](_data/languages.yml), each under its own URL:

| Language | Home page | A recipe |
|---|---|---|
| Greek (default) | `/el/` | `/el/fakes.html` |
| English | `/en/` | `/en/fakes.html` |
| French, German, Italian, Spanish, Portuguese, Farsi | `/fr/`, `/de/`, `/it/`, `/es/`, `/pt/`, `/fa/` | `/fr/fakes.html`, ... |

`https://fagaki.github.io/` sends visitors to `/el/`, or to the language they last picked in the menu. The language menu in the header opens the same page in another language.

Each entry in [_data/languages.yml](_data/languages.yml) holds the language code (also the URL prefix and the `_recipes/` folder name), its own name, all interface texts, and `fagaki`: the word "Φαγάκι" in that language. The home page heading is built from the `fagaki` words of all languages. Farsi has `dir: rtl`, so its pages read right to left.

### Add a language

1. Add an entry to [_data/languages.yml](_data/languages.yml) with all interface texts translated (and `dir: rtl` for right-to-left scripts).
2. Create `<code>/index.html` containing only:
   ```yaml
   ---
   layout: home
   ---
   ```
3. Translate every recipe into `_recipes/<code>/` (ask Claude Code, see below).

## Add a recipe

1. Copy [TEMPLATE.md](TEMPLATE.md) to `_recipes/<language>/<name>.md`, e.g. `_recipes/el/moussaka.md`.
2. Fill in the title, author, tags, ingredients and steps, all in the recipe's language.
3. Translate it: ask Claude Code in this repo *"translate the recipe `<name>`"*. It creates `_recipes/en/<name>.md`, `_recipes/fr/<name>.md`, ... following the rules in [CLAUDE.md](CLAUDE.md). Translations are ordinary recipe files, so you can also write or fix them by hand.
4. Commit and push. The pages appear within a minute or two.

```markdown
---
title: Μουσακάς
author: Μαρία
tags: [κυρίως, φούρνος]
ingredients:
  - 3 μελιτζάνες
  - 500 γρ. κιμάς
  - "Αλάτι: όσο χρειάζεται"
---

1. Κόβουμε τις μελιτζάνες...
2. ...
```

Tips:

- **File name = URL.** Use Latin letters, digits and hyphens (`moussaka.md`, `banana-bread.md`), and the same name in every language folder. Never use `index`.
- **Ingredients** are a YAML list, one item per line, each starting with `- `. Put quotes around an item that contains a colon.
- **Steps** go below the second `---` as a numbered Markdown list.
- A recipe missing in some language simply doesn't appear on that language's home page; the menu then points to that language's home page.

## Features

- Ingredients are checkboxes. Ticks are remembered in the visitor's browser, shared across the language versions of a recipe, and there is a Reset button.
- Each translated recipe links to its original.
- Each home page has search (name, ingredient, cook; accents ignored) and a tag filter. Links like `/en/?tag=soup` or `/en/?q=lentils` open with the filter already set.
- Clean print layout, sitemap, `hreflang` links between languages and schema.org Recipe data.

## Preview locally

With Docker (nothing to install besides Docker Desktop), running in the background:

```sh
docker run -d --rm --name fagaki-dev -p 4000:4000 -v "$PWD":/srv -w /srv ruby:3.3 \
  bash -c "bundle config set path vendor/bundle && bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
```

The site rebuilds automatically when a file is saved; refresh the browser to see changes. Stop it with `docker stop fagaki-dev`.

Or with Ruby 3.x (macOS system Ruby is too old: `brew install ruby`):

```sh
bundle config set path vendor/bundle
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Project layout

```
_config.yml            site settings (default language: el)
_data/languages.yml    languages, interface texts, "fagaki" words
_layouts/              default (header, menu, footer), home, recipe
_includes/tagline.html the multilingual home page heading
_recipes/<code>/       one folder of recipes per language
<code>/index.html      one home page per language
index.html             redirects / to the visitor's language
assets/                style.css, site.js (menu, checkboxes, search)
TEMPLATE.md            blank recipe to copy
CLAUDE.md              translation rules for Claude Code
```

## Publish

In the GitHub repo: Settings > Pages > Build and deployment > Source: Deploy from a branch > `main` / `/ (root)`.

## License

Recipes are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and belong to their authors. Site code is [Apache-2.0](LICENSE).
