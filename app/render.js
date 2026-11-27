// Friday Beacon — rendering: stats strip, hero, compare table, cards, modal.

function verdictClass(verdict) {
  return {
    "TRUE LOW": "verdict-true-low",
    "STRONG DEAL": "verdict-strong",
    "GOOD DEAL": "verdict-good",
    "ROUTINE SALE": "verdict-routine"
  }[verdict] || "verdict-routine";
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderStats(deals) {
  const totalSaved = deals.reduce((sum, d) => sum + saving(d), 0);
  const bestPct = Math.max(...deals.map(discountPct));
  const trueLows = deals.filter((d) => d.verdict === "TRUE LOW").length;
  document.getElementById("stats").innerHTML = `
    <div class="stat"><b>${deals.length}</b><span>deals checked</span></div>
    <div class="stat"><b>${money(totalSaved)}</b><span>total savings if you bought one of each</span></div>
    <div class="stat"><b>${bestPct}%</b><span>biggest discount</span></div>
    <div class="stat"><b>${trueLows}</b><span>lowest prices on record</span></div>`;
}

function renderHero(deal) {
  const el = document.getElementById("hero");
  el.innerHTML = `
    <article class="hero-card">
      <div>
        <span class="verdict ${verdictClass(deal.verdict)}">${esc(deal.verdict)}</span>
        <h3>${esc(deal.product)}</h3>
        <p class="store">${esc(deal.store)}</p>
        <p>${esc(deal.note)}</p>
        <div class="hero-actions">
          <a class="btn" href="${esc(deal.link)}" target="_blank" rel="noopener">Shop at ${esc(deal.store)} &rarr;</a>
          <button class="btn btn-ghost" data-details="${esc(deal.id)}">Details</button>
        </div>
        <p class="hero-meta">Checked ${esc(deal.checked)} &middot; ${esc(deal.source)}</p>
      </div>
      <div class="hero-price">
        <span class="sale">${money(deal.sale)}</span>
        <span class="usual">${money(deal.usual)}</span>
        <span class="off">${discountPct(deal)}% off &middot; save ${money(saving(deal))}</span>
      </div>
    </article>`;
}

function renderCompare(deals) {
  // Cross-store compare: the one product carried by more than one store.
  const byProduct = new Map();
  for (const d of deals) {
    if (!byProduct.has(d.product)) byProduct.set(d.product, []);
    byProduct.get(d.product).push(d);
  }
  const multi = [...byProduct.values()].find((group) => group.length > 1);
  const el = document.getElementById("compare");
  if (!multi) { el.innerHTML = "<p>No product in this set is carried by more than one store yet.</p>"; return; }
  const cheapest = Math.min(...multi.map((d) => d.sale));
  const rows = multi.map((d) => `
    <tr>
      <td><b>${esc(d.store)}</b></td>
      <td class="${d.sale === cheapest ? "win" : ""}">${money(d.sale)}</td>
      <td>${money(d.usual)}</td>
      <td>${discountPct(d)}% off</td>
      <td><a href="${esc(d.link)}" target="_blank" rel="noopener">Shop &rarr;</a></td>
    </tr>`).join("");
  el.innerHTML = `
    <table>
      <thead><tr><th>Store</th><th>Sale price</th><th>Usual price</th><th>Discount</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="compare-note">The same ${esc(multi[0].product)} costs ${money(cheapest)} at the cheapest store. Best Buy lists it at $180 (TrendThread deals diary, 26 Nov 2026) — $31 more than Amazon or Walmart — so the $149 listings are the ones to take. Checked 27 Nov 2026.</p>`;
}

function cardHtml(deal) {
  return `
    <article class="card" data-details="${esc(deal.id)}" tabindex="0" role="button" aria-label="Details for ${esc(deal.product)}">
      <span class="verdict ${verdictClass(deal.verdict)}">${esc(deal.verdict)}</span>
      <h3>${esc(deal.product)}</h3>
      <p class="store-line"><b>${esc(deal.store)}</b> &middot; ${esc(deal.category)}</p>
      <div class="price-row">
        <span class="sale">${money(deal.sale)}</span>
        <span class="usual">${money(deal.usual)}</span>
        <span class="off">${discountPct(deal)}% off</span>
      </div>
      <p class="save">You save ${money(saving(deal))}</p>
      <p class="note">${esc(deal.note)}</p>
      <p class="meta">Checked ${esc(deal.checked)} &middot; ${esc(deal.source)}</p>
      <div class="actions">
        <a class="btn" href="${esc(deal.link)}" target="_blank" rel="noopener">Shop at ${esc(deal.store)}</a>
        <button class="link-btn" data-details="${esc(deal.id)}">Details</button>
      </div>
    </article>`;
}

function renderGrid(deals) {
  const grid = document.getElementById("grid");
  const empty = document.getElementById("empty");
  const count = document.getElementById("result-count");
  count.textContent = `Showing ${deals.length} of ${FRIDAY_BEACON_DEALS.length} deals`;
  empty.hidden = deals.length !== 0;
  grid.innerHTML = deals.map(cardHtml).join("");
}

function renderChips(categories, active) {
  const el = document.getElementById("chips");
  const all = ["All", ...categories];
  el.innerHTML = all.map((c) =>
    `<button class="chip" data-category="${c === "All" ? "" : esc(c)}" aria-pressed="${(active || "") === (c === "All" ? "" : c)}">${esc(c)}</button>`).join("");
}

function openModal(deal) {
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <button class="close" id="modal-close" aria-label="Close">&times;</button>
    <span class="verdict ${verdictClass(deal.verdict)}">${esc(deal.verdict)}</span>
    <h2 id="modal-title">${esc(deal.product)}</h2>
    <dl>
      <dt>Store</dt><dd>${esc(deal.store)}</dd>
      <dt>Sale price</dt><dd>${money(deal.sale)}</dd>
      <dt>Usual price</dt><dd>${money(deal.usual)}</dd>
      <dt>Discount</dt><dd>${discountPct(deal)}% off — you save ${money(saving(deal))}</dd>
      <dt>Category</dt><dd>${esc(deal.category)}</dd>
      <dt>Checked</dt><dd>${esc(deal.checked)}</dd>
      <dt>Source</dt><dd>${esc(deal.source)}</dd>
    </dl>
    <p class="note">${esc(deal.note)}</p>
    <p class="note">Prices change on Black Friday — the store page is the final word. Check the price and the exact model before you pay.</p>
    <div class="actions">
      <a class="btn" href="${esc(deal.link)}" target="_blank" rel="noopener">Shop at ${esc(deal.store)} &rarr;</a>
    </div>`;
  document.getElementById("modal-backdrop").hidden = false;
  document.getElementById("modal-close").addEventListener("click", closeModal);
}

function closeModal() {
  document.getElementById("modal-backdrop").hidden = true;
  if (location.hash.startsWith("#deal-")) {
    history.replaceState(null, "", location.pathname + location.search);
  }
}
