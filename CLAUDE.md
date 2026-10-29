# Fagaki recipes

Jekyll site on GitHub Pages, fully translated. Site languages and interface texts: `_data/languages.yml` (`code` is the language code, also used as URL prefix and folder name, e.g. `el` for Greek).

A recipe `_recipes/<code>/<name>.md` is published at `/<code>/<name>.html` (format: see TEMPLATE.md). The same `<name>` in every language folder links the versions together.

## Translating a recipe

When asked to translate a recipe (or after adding one), create `_recipes/<code>/<name>.md` for every other site language. Each one is a normal recipe file in that language, plus `translated_from: <code of the original>`:

```markdown
---
title: Lentil soup
author: Eleni
tags: [soup, vegan]
translated_from: el
ingredients:
  - 500 g lentils
  - 1 onion, finely chopped
---

1. Rinse the lentils...
```

Rules:
- Translate from the original recipe, not from another translation.
- Same number and order of ingredients as the original: checkbox ticks are shared by position across languages.
- Keep quantities and units. Write abbreviations the way cooks in that language do (e.g. Greek "κ.σ." becomes "tbsp" in English, "EL" in German).
- Farsi: Persian digits (۰-۹) in ingredients and steps; keep the Markdown list numbers as `1.`, `2.` (CSS shows them in Persian).
- Portuguese: European Portuguese (chávena, tacho, lume brando).
- `title` is a natural dish name in the target language, not a transliteration.
- `author`: the name written in the target language's script (Ελένη becomes Eleni in Latin-script languages).
- `tags`: translate each tag, keeping one tag word per original tag.
- Same steps as the original, as a numbered Markdown list. Do not add tips or drop details.
- Quote YAML strings that contain ": ".
- When a recipe changes, update its translations too.

## Adding a site language

Add an entry to `_data/languages.yml` (all interface texts translated; add `dir: rtl` for right-to-left scripts), create `<code>/index.html` with front matter `layout: home`, and translate every recipe into the new language.

Check with a build afterwards (see README, "Preview locally").
