// Translate menu: preselect the visitor's browser language when it is offered.
(function () {
  const select = document.getElementById('translate-to');
  if (!select) return;
  const codes = Array.from(select.options, (o) => o.value.toLowerCase());
  for (const lang of navigator.languages || [navigator.language || '']) {
    const l = lang.toLowerCase();
    const i = codes.includes(l) ? codes.indexOf(l) : codes.indexOf(l.split('-')[0]);
    if (i >= 0) {
      select.selectedIndex = i;
      return;
    }
  }
})();

// Recipe page: remember ticked ingredients in this browser.
(function () {
  const list = document.getElementById('ingredients');
  if (!list) return;
  const key = 'recipe:' + location.pathname.replace(/\.html$/, '');
  const boxes = list.querySelectorAll('input[type=checkbox]');

  function save() {
    const checked = [];
    boxes.forEach((box, i) => { if (box.checked) checked.push(i); });
    try {
      if (checked.length) localStorage.setItem(key, JSON.stringify(checked));
      else localStorage.removeItem(key);
    } catch (e) { /* storage blocked: ticks just won't persist */ }
  }

  try {
    (JSON.parse(localStorage.getItem(key)) || []).forEach((i) => {
      if (boxes[i]) boxes[i].checked = true;
    });
  } catch (e) { /* storage blocked or corrupt */ }

  list.addEventListener('change', save);
  const reset = document.getElementById('reset-ingredients');
  if (reset) {
    reset.addEventListener('click', () => {
      boxes.forEach((box) => { box.checked = false; });
      save();
    });
  }
})();

// Home page: search and filter the recipe list.
(function () {
  const list = document.getElementById('recipe-list');
  if (!list) return;
  const search = document.getElementById('search');
  const langSelect = document.getElementById('filter-lang');
  const tagSelect = document.getElementById('filter-tag');
  const noResults = document.getElementById('no-results');

  // Lowercase and drop accents so searches ignore case and diacritics.
  const normalize = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

  const items = Array.from(list.children, (li) => ({
    li,
    text: normalize(li.dataset.text),
    lang: li.dataset.lang,
    tags: li.dataset.tags.toLowerCase().split(','),
  }));

  function apply() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const lang = langSelect.value;
    const tag = tagSelect.value.toLowerCase();
    let shown = 0;
    items.forEach((item) => {
      const match = words.every((w) => item.text.includes(w))
        && (!lang || item.lang === lang)
        && (!tag || item.tags.includes(tag));
      item.li.hidden = !match;
      if (match) shown++;
    });
    noResults.hidden = shown > 0;
  }

  // Allow links like /?tag=soup or /?lang=el or /?q=lentils.
  const params = new URLSearchParams(location.search);
  if (params.has('q')) search.value = params.get('q');
  if (params.has('lang')) langSelect.value = params.get('lang');
  if (params.has('tag')) tagSelect.value = params.get('tag');

  [search, langSelect, tagSelect].forEach((el) => el.addEventListener('input', apply));
  apply();
})();
