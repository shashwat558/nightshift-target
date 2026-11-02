// Pagination with a pointed bug the crew will fix in BACKLOG-3:
// page 2 (and up) asks for the previous page's items — an off-by-one in the
// offset math (`safePage - 2` instead of `safePage - 1`). Today's tests only
// ever request page 1, so the suite is green. BACKLOG-3 asks for the failing
// test to be written first, then the fix.

export function paginate(items, page, limit) {
  const safeLimit = Math.max(1, Number.isFinite(limit) ? limit : 5);
  const safePage = Math.max(1, Number.isFinite(page) ? page : 1);
  const start = safePage === 1 ? 0 : (safePage - 2) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    page: safePage,
    limit: safeLimit,
    total: items.length,
  };
}
