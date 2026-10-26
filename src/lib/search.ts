/**
 * Bridge so the search trigger can live inside the navbar while the palette
 * itself stays a top-level overlay in the layout.
 */
export const OPEN_SEARCH_EVENT = "evay:open-search";

export function openSearch() {
  window.dispatchEvent(new CustomEvent(OPEN_SEARCH_EVENT));
}
