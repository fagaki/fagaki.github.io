// Language menu: open the same page in the chosen language.
// The choice is remembered, so https://fagaki.github.io/ opens in that language next time.
(function () {
  const select = document.getElementById('site-lang');
  if (!select) return;
  select.addEventListener('change', () => {
    try { localStorage.setItem('site-lang', select.selectedOptions[0].lang); } catch (e) { /* storage blocked */ }
    location.href = select.value;
  });
})();

// Recipe page: remember ticked ingredients in this browser.
// All language versions list the same ingredients in the same order, so ticks are shared by
// position across /el/fakes.html, /fr/fakes.html, ...
(function () {
  const boxes = document.querySelectorAll('.ingredients input[type=checkbox]');
  if (!boxes.length) return;
  const key = 'recipe:' + location.pathname.split('/').pop().replace(/\.html$/, '');
  let checked = new Set();
  try {
    checked = new Set(JSON.parse(localStorage.getItem(key)) || []);
  } catch (e) { /* storage blocked or corrupt */ }

  function update() {
    boxes.forEach((box) => { box.checked = checked.has(Number(box.dataset.index)); });
    try {
      if (checked.size) localStorage.setItem(key, JSON.stringify([...checked].sort((a, b) => a - b)));
      else localStorage.removeItem(key);
    } catch (e) { /* storage blocked: ticks just won't persist */ }
  }

  boxes.forEach((box) => box.addEventListener('change', () => {
    const i = Number(box.dataset.index);
    if (box.checked) checked.add(i);
    else checked.delete(i);
    update();
  }));
  document.querySelectorAll('.reset-ingredients').forEach((button) => button.addEventListener('click', () => {
    checked.clear();
    update();
  }));
  update();
})();

// Home page: search and filter the recipe list.
(function () {
  const list = document.getElementById('recipe-list');
  if (!list) return;
  const search = document.getElementById('search');
  const tagSelect = document.getElementById('filter-tag');
  const noResults = document.getElementById('no-results');

  // Lowercase and drop accents so searches ignore case and diacritics.
  const normalize = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

  const items = Array.from(list.children, (li) => ({
    li,
    text: normalize(li.dataset.text),
    tags: li.dataset.tags.toLowerCase().split(','),
  }));

  function apply() {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const tag = tagSelect.value.toLowerCase();
    let shown = 0;
    items.forEach((item) => {
      const match = words.every((w) => item.text.includes(w))
        && (!tag || item.tags.includes(tag));
      item.li.hidden = !match;
      if (match) shown++;
    });
    noResults.hidden = shown > 0;
  }

  // Allow links like /en/?tag=soup or /en/?q=lentils.
  const params = new URLSearchParams(location.search);
  if (params.has('q')) search.value = params.get('q');
  if (params.has('tag')) tagSelect.value = params.get('tag');

  [search, tagSelect].forEach((el) => el.addEventListener('input', apply));
  apply();
})();
