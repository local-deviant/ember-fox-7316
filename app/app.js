// Friday Beacon — wiring: state, toolbar events, modal open/close.

const state = {
  query: "",
  category: "",
  store: "",
  minDiscount: 0,
  sort: "best"
};

function applyFilters() {
  const filtered = sortDeals(filterDeals(FRIDAY_BEACON_DEALS, state), state.sort);
  renderGrid(filtered);
  renderChips(dealCategories(FRIDAY_BEACON_DEALS), state.category);
}

function readUrlState() {
  // Shareable links: ?q=airpods&store=Amazon&min=40&sort=discount&cat=TVs
  // and #deal-<id> opens a deal's detail modal on load.
  const params = new URLSearchParams(location.search);
  if (params.get("q")) {
    state.query = params.get("q");
    document.getElementById("search").value = state.query;
  }
  if (params.get("store")) {
    state.store = params.get("store");
    document.getElementById("store").value = state.store;
  }
  if (params.get("min")) {
    state.minDiscount = Number(params.get("min")) || 0;
    document.getElementById("min-discount").value = String(state.minDiscount);
  }
  if (params.get("sort")) {
    state.sort = params.get("sort");
    document.getElementById("sort").value = state.sort;
  }
  if (params.get("cat")) {
    state.category = params.get("cat");
  }
  if (location.hash.startsWith("#deal-")) {
    const deal = FRIDAY_BEACON_DEALS.find((d) => d.id === location.hash.slice(6));
    if (deal) openModal(deal);
  }
}

function init() {
  renderStats(FRIDAY_BEACON_DEALS);
  // Deal of the day: the lowest-ever price with the biggest saving story.
  renderHero(FRIDAY_BEACON_DEALS.find((d) => d.id === "airpods-pro-3-amazon"));
  renderCompare(FRIDAY_BEACON_DEALS);
  readUrlState();
  applyFilters();
  // ?scroll=finder jumps to a section after the page has rendered.
  const scrollTo = new URLSearchParams(location.search).get("scroll");
  if (scrollTo) {
    const target = document.getElementById(scrollTo);
    if (target) target.scrollIntoView();
  }

  document.getElementById("search").addEventListener("input", (e) => {
    state.query = e.target.value;
    applyFilters();
  });
  document.getElementById("store").addEventListener("change", (e) => {
    state.store = e.target.value;
    applyFilters();
  });
  document.getElementById("min-discount").addEventListener("change", (e) => {
    state.minDiscount = Number(e.target.value);
    applyFilters();
  });
  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    applyFilters();
  });
  document.getElementById("chips").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-category]");
    if (!chip) return;
    state.category = chip.dataset.category;
    applyFilters();
  });

  // Open the detail modal from any card, hero button or Details button.
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-details]");
    if (!trigger) return;
    if (e.target.closest("a")) return; // let store links navigate
    const deal = FRIDAY_BEACON_DEALS.find((d) => d.id === trigger.dataset.details);
    if (deal) {
      openModal(deal);
      history.replaceState(null, "", "#deal-" + deal.id);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Enter" && e.target.matches && e.target.matches(".card")) {
      const deal = FRIDAY_BEACON_DEALS.find((d) => d.id === e.target.dataset.details);
      if (deal) openModal(deal);
    }
  });
  document.getElementById("modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop") closeModal();
  });
}

init();
