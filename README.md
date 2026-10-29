# Fagaki

Home recipes from amateur cooks, in many languages. Live at https://fagaki.github.io/.

The site is built with Jekyll, which GitHub Pages runs by itself on every push. There is no build pipeline to maintain.

## Add a recipe

1. Copy [TEMPLATE.md](TEMPLATE.md) to `_recipes/<name>.md`.
2. Fill in the title, author, language, tags, ingredients and steps.
3. Commit and push. The page appears at `https://fagaki.github.io/<name>.html` within a minute or two.

```markdown
---
title: Moussaka
author: Maria
lang: el
tags: [main, oven]
ingredients:
  - 3 eggplants
  - 500 g minced beef
  - "Salt: to taste"
---

1. Slice the eggplants...
2. ...
```

Tips:

- **File name = URL.** Use Latin letters, digits and hyphens (`moussaka.md`, `banana-bread.md`). Never use `index`.
- **`lang`** is the recipe's language code (`en`, `el`, `fr`...). It labels the recipe and helps translation detect the language. Codes and names live in [_data/languages.yml](_data/languages.yml). Add a language there to offer it in the translate menu.
- **`tags`**: use short lowercase English words (`soup`, `dessert`, `vegan`) so the home page filter groups recipes across languages.
- **Ingredients** are a YAML list, one item per line, each starting with `- `. Put quotes around an item that contains a colon (`"Salt: to taste"`).
- **Steps** go below the second `---` as a numbered Markdown list.

## Features

- Ingredients are checkboxes. Ticks are remembered in the visitor's browser, and there is a Reset button.
- Translate menu on every page. It opens the page through Google Translate, so it only works on the live site, not on localhost.
- The home page has search (name, ingredient, cook) and filters by language and tag. Links like `/?tag=soup`, `/?lang=el` or `/?q=lentils` open with the filter already set.
- Clean print layout, sitemap, SEO tags and schema.org Recipe data.

## Preview locally

Requires Ruby 3.x (macOS system Ruby is too old: `brew install ruby`).

```sh
bundle config set path vendor/bundle
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

## Publish

In the GitHub repo: Settings > Pages > Build and deployment > Source: Deploy from a branch > `main` / `/ (root)`.

## License

Recipes are licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and belong to their authors. Site code is [Apache-2.0](LICENSE).
