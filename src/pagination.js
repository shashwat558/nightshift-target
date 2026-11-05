// Page numbers are one-based; offset is zero-based.

export function paginate(items, page, limit) {
  const safeLimit = Math.max(1, Number.isFinite(limit) ? limit : 5);
  const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
  const start = (safePage - 1) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    page: safePage,
    limit: safeLimit,
    total: items.length,
  };
}
