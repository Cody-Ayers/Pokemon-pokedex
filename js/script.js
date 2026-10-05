let pokeDex = (function () {
  let pokemonList = [];
  let pokeweb = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    }
  }

  function getAll() { return pokemonList; }

  function addListItem(pokemon) {
    let list = document.querySelector('.pokemon-list');
    let li   = document.createElement('li');

    let button = document.createElement('button');
    button.classList.add('poke-button');
    button.addEventListener('click', () => showDetails(pokemon));

    // placeholder while sprite loads
    let placeholder = document.createElement('div');
    placeholder.classList.add('poke-placeholder');
    button.appendChild(placeholder);

    // number label
    let number = document.createElement('div');
    number.classList.add('poke-number');
    number.textContent = '#' + String(pokemon.id).padStart(3, '0');

    // name label
    let name = document.createElement('span');
    name.textContent = pokemon.name;

    button.appendChild(number);
    button.appendChild(name);
    li.appendChild(button);
    list.appendChild(li);

    // load sprite in background
    fetch(pokemon.detailsUrl)
      .then(r => r.json())
      .then(details => {
        let sprite = details.sprites.front_default;
        if (sprite) {
          let img = document.createElement('img');
          img.src = sprite;
          img.alt = pokemon.name;
          img.onload = () => {
            placeholder.replaceWith(img);
          };
        } else {
          placeholder.remove();
        }
        pokemon.imageUrl = sprite;
        pokemon.height   = details.height;
        pokemon.weight   = details.weight;
        pokemon.types    = details.types;
        pokemon.stats    = details.stats;
        pokemon.loaded   = true;
      });
  }

  function loadList() {
    return fetch(pokeweb)
      .then(r => r.json())
      .then(json => {
        json.results.forEach((item, index) => {
          let pokemon = { name: item.name, detailsUrl: item.url, id: index + 1 };
          add(pokemon);
        });
      })
      .catch(e => console.error(e));
  }

  function loadDetails(item) {
    if (item.loaded) return Promise.resolve();
    return fetch(item.detailsUrl)
      .then(r => r.json())
      .then(details => {
        item.imageUrl = details.sprites.front_default;
        item.height   = details.height;
        item.weight   = details.weight;
        item.types    = details.types;
        item.stats    = details.stats;
        item.loaded   = true;
      })
      .catch(e => console.error(e));
  }

  function showDetails(item) {
    loadDetails(item).then(() => showModal(item));
  }

  /* ── Modal ── */
  function showModal(pokemon) {
    let container = document.querySelector('#modal-container');
    container.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    // header
    let header = document.createElement('div');
    header.classList.add('modal-header');

    let title = document.createElement('h1');
    title.textContent = pokemon.name;

    let closeBtn = document.createElement('button');
    closeBtn.classList.add('modal-close');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', hideModal);

    header.appendChild(title);
    header.appendChild(closeBtn);

    // body
    let body = document.createElement('div');
    body.classList.add('modal-body');

    // number
    let numEl = document.createElement('p');
    numEl.classList.add('modal-number');
    numEl.textContent = '#' + String(pokemon.id).padStart(3, '0');
    body.appendChild(numEl);

    // sprite
    if (pokemon.imageUrl) {
      let img = document.createElement('img');
      img.src = pokemon.imageUrl;
      img.alt = pokemon.name;
      img.classList.add('modal-sprite');
      body.appendChild(img);
    }

    // type badges
    if (pokemon.types && pokemon.types.length) {
      let typesDiv = document.createElement('div');
      typesDiv.classList.add('modal-types');
      pokemon.types.forEach(t => {
        let badge = document.createElement('span');
        badge.classList.add('type-badge', 'type-' + t.type.name);
        badge.textContent = t.type.name;
        typesDiv.appendChild(badge);
      });
      body.appendChild(typesDiv);
    }

    // stats
    if (pokemon.stats && pokemon.stats.length) {
      let statsDiv = document.createElement('div');
      statsDiv.classList.add('modal-stats');

      let statLabels = { hp: 'HP', attack: 'ATK', defense: 'DEF', 'special-attack': 'SpATK', 'special-defense': 'SpDEF', speed: 'SPD' };

      pokemon.stats.forEach(s => {
        let label = statLabels[s.stat.name] || s.stat.name;
        let value = s.base_stat;
        let pct   = Math.min(100, Math.round((value / 255) * 100));

        let row = document.createElement('div');
        row.classList.add('stat-row');

        let labelEl = document.createElement('span');
        labelEl.classList.add('stat-label');
        labelEl.textContent = label;

        let barWrap = document.createElement('div');
        barWrap.classList.add('stat-bar-wrap');

        let bar = document.createElement('div');
        bar.classList.add('stat-bar');
        bar.style.width = '0%';
        barWrap.appendChild(bar);
        setTimeout(() => { bar.style.width = pct + '%'; }, 50);

        let valueEl = document.createElement('span');
        valueEl.classList.add('stat-value');
        valueEl.textContent = value;

        row.appendChild(labelEl);
        row.appendChild(barWrap);
        row.appendChild(valueEl);
        statsDiv.appendChild(row);
      });

      body.appendChild(statsDiv);
    }

    // height + weight
    if (pokemon.height !== undefined) {
      let hw = document.createElement('p');
      hw.classList.add('modal-height');
      hw.textContent = `Height: ${(pokemon.height / 10).toFixed(1)} m · Weight: ${(pokemon.weight / 10).toFixed(1)} kg`;
      body.appendChild(hw);
    }

    modal.appendChild(header);
    modal.appendChild(body);
    container.appendChild(modal);
    container.classList.add('is-visible');

    // close on backdrop click
    container.addEventListener('click', e => {
      if (e.target === container) hideModal();
    }, { once: true });
  }

  function hideModal() {
    document.querySelector('#modal-container').classList.remove('is-visible');
  }

  // close on Escape
  window.addEventListener('keydown', e => {
    let c = document.querySelector('#modal-container');
    if (e.key === 'Escape' && c && c.classList.contains('is-visible')) hideModal();
  });

  // search filter
  document.querySelector('#pokemon-search').addEventListener('input', function () {
    let q = this.value.toLowerCase();
    document.querySelectorAll('.poke-button').forEach(btn => {
      let name = btn.querySelector('span').textContent.toLowerCase();
      btn.closest('li').style.display = name.includes(q) ? '' : 'none';
    });
  });

  return { add, getAll, addListItem, loadList, showDetails };
})();

pokeDex.loadList().then(() => {
  pokeDex.getAll().forEach(p => pokeDex.addListItem(p));
});
