/**
 * LocalStorage helpers
 */

const Storage = {
  keys: {
    favorites: "favoriteQuotes",
    theme: "selectedTheme",
    category: "selectedCategory",
    lastQuote: "lastQuote",
    settings: "settings",
  },

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("Storage set failed:", err);
    }
  },

  getFavorites() {
    const list = this.get(this.keys.favorites, []);
    return Array.isArray(list) ? list : [];
  },

  setFavorites(ids) {
    this.set(this.keys.favorites, ids);
  },

  getTheme() {
    return this.get(this.keys.theme, "cinematic");
  },

  setTheme(themeId) {
    this.set(this.keys.theme, themeId);
  },

  getCategory() {
    return this.get(this.keys.category, "all");
  },

  setCategory(category) {
    this.set(this.keys.category, category);
  },

  getLastQuoteId() {
    return this.get(this.keys.lastQuote, null);
  },

  setLastQuoteId(id) {
    this.set(this.keys.lastQuote, id);
  },

  getSettings() {
    return this.get(this.keys.settings, {
      appTheme: "dark",
      language: "ko",
      dailyQuote: true,
      defaultCategory: "all",
    });
  },

  setSettings(settings) {
    this.set(this.keys.settings, settings);
  },
};

