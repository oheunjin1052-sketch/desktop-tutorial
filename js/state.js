/**
 * Application state
 */

const state = {
  currentQuoteIndex: 0,
  selectedCategory: "all",
  selectedTheme: "cinematic",
  favorites: [],
  searchKeyword: "",
  currentPage: "home",
  settings: {
    appTheme: "dark",
    language: "ko",
    dailyQuote: true,
    defaultCategory: "all",
  },
  filteredQuoteIds: [],
};

function initState() {
  state.favorites = Storage.getFavorites();
  state.selectedTheme = Storage.getTheme();
  state.selectedCategory = Storage.getCategory();
  state.settings = Storage.getSettings();

  if (state.settings.defaultCategory && state.settings.defaultCategory !== "all") {
    state.selectedCategory = state.settings.defaultCategory;
  }

  refreshFilteredQuotes();

  const lastId = Storage.getLastQuoteId();
  if (lastId != null) {
    const idx = state.filteredQuoteIds.indexOf(lastId);
    if (idx >= 0) state.currentQuoteIndex = idx;
  }
}

function refreshFilteredQuotes() {
  let list = quotes;

  if (state.selectedCategory && state.selectedCategory !== "all") {
    list = list.filter((q) => q.category === state.selectedCategory);
  }

  state.filteredQuoteIds = list.map((q) => q.id);

  if (state.filteredQuoteIds.length === 0) {
    state.filteredQuoteIds = quotes.map((q) => q.id);
  }

  if (state.currentQuoteIndex >= state.filteredQuoteIds.length) {
    state.currentQuoteIndex = 0;
  }
}

function getCurrentQuote() {
  const id = state.filteredQuoteIds[state.currentQuoteIndex];
  return getQuoteById(id) || quotes[0];
}

function setCategory(category) {
  state.selectedCategory = category;
  Storage.setCategory(category);
  state.currentQuoteIndex = 0;
  refreshFilteredQuotes();
}

function goNextQuote() {
  const len = state.filteredQuoteIds.length;
  if (!len) return;
  state.currentQuoteIndex = (state.currentQuoteIndex + 1) % len;
  Storage.setLastQuoteId(getCurrentQuote().id);
}

function goPrevQuote() {
  const len = state.filteredQuoteIds.length;
  if (!len) return;
  state.currentQuoteIndex = (state.currentQuoteIndex - 1 + len) % len;
  Storage.setLastQuoteId(getCurrentQuote().id);
}

function setPage(page) {
  state.currentPage = page;
}

function updateSettings(partial) {
  state.settings = { ...state.settings, ...partial };
  Storage.setSettings(state.settings);
}

