// Friday Beacon — filter and sort logic. Pure functions, no DOM here.

function money(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function discountPct(deal) {
  if (!deal.usual || deal.usual <= deal.sale) return 0;
  return Math.round((1 - deal.sale / deal.usual) * 100);
}

function saving(deal) {
  return Math.max(0, deal.usual - deal.sale);
}

function verdictRank(deal) {
  // Best verdict first, then biggest discount, then biggest saving.
  return { "TRUE LOW": 0, "STRONG DEAL": 1, "GOOD DEAL": 2, "ROUTINE SALE": 3 }[deal.verdict] ?? 4;
}

function filterDeals(deals, state) {
  const q = (state.query || "").trim().toLowerCase();
  return deals.filter((d) => {
    if (state.category && d.category !== state.category) return false;
    if (state.store && d.store !== state.store) return false;
    if (state.minDiscount && discountPct(d) < state.minDiscount) return false;
    if (q) {
      const hay = (d.product + " " + d.store + " " + d.category + " " + d.verdict + " " + d.note).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function sortDeals(deals, key) {
  const list = [...deals];
  switch (key) {
    case "discount":
      return list.sort((a, b) => discountPct(b) - discountPct(a) || saving(b) - saving(a));
    case "saving":
      return list.sort((a, b) => saving(b) - saving(a) || discountPct(b) - discountPct(a));
    case "price-asc":
      return list.sort((a, b) => a.sale - b.sale);
    case "price-desc":
      return list.sort((a, b) => b.sale - a.sale);
    case "best":
    default:
      return list.sort((a, b) =>
        verdictRank(a) - verdictRank(b) ||
        discountPct(b) - discountPct(a) ||
        saving(b) - saving(a));
  }
}

function dealCategories(deals) {
  return [...new Set(deals.map((d) => d.category))].sort();
}
