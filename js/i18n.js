/** Lightweight Korean/English localization. */
const I18N_MESSAGES = {
  ko: {
    "home.eyebrow": "오늘의 지혜", "home.title": "오늘의 명언",
    "home.categories": "카테고리", "home.recommended": "추천 명언",
    "explore.eyebrow": "발견", "explore.title": "둘러보기",
    "saved.eyebrow": "즐겨찾기", "saved.title": "저장한 명언",
    "settings.eyebrow": "환경설정", "settings.title": "설정",
    "toast.light": "라이트 모드", "toast.dark": "다크 모드",
    "toast.saved": "저장되었습니다", "toast.unsaved": "저장이 해제되었습니다",
    "toast.copied": "명언이 클립보드에 복사되었습니다",
    "toast.shareFailed": "공유를 지원하지 않는 환경입니다",
    "empty.title": "명언을 찾을 수 없습니다", "empty.category": "다른 카테고리를 선택해보세요.",
    "empty.search": "다른 키워드로 검색해보세요.", "saved.meta": "저장한 명언",
    "category.all": "전체"
  },
  en: {
    "home.eyebrow": "Today's Wisdom", "home.title": "Quote of the Day",
    "home.categories": "Categories", "home.recommended": "Recommended Quotes",
    "explore.eyebrow": "Discover", "explore.title": "Explore",
    "saved.eyebrow": "Favorites", "saved.title": "Saved",
    "settings.eyebrow": "Preferences", "settings.title": "Settings",
    "toast.light": "Light mode", "toast.dark": "Dark mode",
    "toast.saved": "Quote saved", "toast.unsaved": "Quote removed",
    "toast.copied": "Quote copied to clipboard",
    "toast.shareFailed": "Sharing is not supported in this browser",
    "empty.title": "No Quotes Found", "empty.category": "Try another category.",
    "empty.search": "Try another keyword.", "saved.meta": "Saved Quote",
    "category.all": "All"
  }
};

const CATEGORY_KO = {
  Motivation: "동기부여", Courage: "용기", Growth: "성장", Responsibility: "책임",
  Love: "사랑", Life: "삶", Hope: "희망", Success: "성공"
};

const EN_QUOTES = {
  1: "With great power comes great responsibility.",
  2: "A hero is someone who takes a step forward even when afraid.",
  3: "Our choices shape us, and through them we grow.",
  4: "Sacrifice is not about losing; it is about protecting.",
  5: "As long as you rise again, the story is not over.",
  6: "A mask does not make you strong. Strength begins in the heart.",
  7: "There are no perfect heroes, only people who refuse to give up.",
  8: "Success is not applause; it is making someone's day a little lighter.",
  9: "You may not carry everything alone, but you can still take responsibility.",
  10: "Even while the city sleeps, someone must stay awake.",
  11: "Higher than any building is the will to rise again.",
  12: "Connections as thin as webs can hold the world together.",
  13: "If you learn nothing today, tomorrow's you remains in yesterday.",
  14: "Mistakes are not enemies; they are part of the training.",
  15: "Hope does not shout. It quietly reaches out a hand.",
  16: "The more life shakes, the more we need to practice finding our center.",
  17: "Motivation is a spark; habit is the hearth.",
  18: "On the way to your goal, do not harm the people beside you.",
  19: "The world I protect eventually protects me.",
  20: "Heroes are not born. They are chosen every day.",
  21: "Do not hide failure; use it as a platform for your next leap.",
  22: "Love is not a weakness. It gives you a reason to fight.",
  23: "When you can see a brighter tomorrow, you can cross a dark today.",
  24: "When weighing success, count the hands that helped you get there."
};

const I18n = {
  language() { return state.settings.language === "en" ? "en" : "ko"; },
  t(key) { return I18N_MESSAGES[this.language()][key] || I18N_MESSAGES.ko[key] || key; },
  quoteText(quote) { return this.language() === "en" ? EN_QUOTES[quote.id] : quote.text; },
  quoteAuthor(quote) { return quote.author; },
  category(category) { return this.language() === "ko" ? (CATEGORY_KO[category] || category) : category; },

  updateHeaderControls() {
    const lang = this.language();
    const languageBtn = document.getElementById("btn-language");
    const themeBtn = document.getElementById("btn-theme");
    if (languageBtn) {
      languageBtn.querySelector(".language-label").textContent = lang === "ko" ? "EN" : "KO";
      languageBtn.setAttribute("aria-label", lang === "ko" ? "영어로 변경" : "Switch to Korean");
    }
    if (themeBtn) {
      const light = state.settings.appTheme === "light";
      themeBtn.setAttribute("aria-label", lang === "ko"
        ? (light ? "다크 테마로 전환" : "라이트 테마로 전환")
        : (light ? "Switch to dark theme" : "Switch to light theme"));
    }
  },

  apply() {
    const lang = this.language();
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = this.t(el.dataset.i18n); });
    const staticText = {
      "#page-settings .settings-item-label": lang === "ko" ? "매일의 명언" : "Daily Quote",
      "#page-settings .settings-item-desc": lang === "ko" ? "알림 UI (MVP · 실제 푸시 없음)" : "Notification UI (MVP · no push yet)",
      "#page-settings .settings-item:nth-child(2) .settings-item-label": lang === "ko" ? "기본 카테고리" : "Default category",
      "#page-settings .settings-item:nth-child(2) .settings-item-desc": lang === "ko" ? "홈 필터 기본값" : "Default Home filter"
    };
    Object.entries(staticText).forEach(([selector, value]) => {
      document.querySelectorAll(selector).forEach((el) => { el.textContent = value; });
    });
    const navLabels = lang === "ko" ? ["홈", "둘러보기", "저장", "설정"] : ["Home", "Explore", "Saved", "Settings"];
    document.querySelectorAll(".nav-item span").forEach((el, i) => { el.textContent = navLabels[i]; });
    const input = document.getElementById("search-input");
    if (input) input.placeholder = lang === "ko" ? "명언, 저자, 카테고리 검색…" : "Search quotes, authors, categories…";
    const close = document.getElementById("btn-search-close");
    if (close) close.textContent = lang === "ko" ? "닫기" : "Close";
    const settingHeadings = document.querySelectorAll("#page-settings > .section-title");
    const headingLabels = lang === "ko" ? ["카드 테마", "테마 조합", "추천 테마", "앱 정보"] : ["Themes", "Theme Mixes", "For You", "About"];
    settingHeadings.forEach((el, i) => { el.textContent = headingLabels[i]; });
    const filterLabels = lang === "ko" ? ["전체", "단색", "분위기"] : ["All", "Plain", "Atmospheric"];
    document.querySelectorAll("#theme-filter-chips .chip").forEach((el, i) => { el.textContent = filterLabels[i]; });
    const about = document.querySelector(".about-block p");
    if (about) about.innerHTML = lang === "ko"
      ? "<strong>Quote — Today's Wisdom</strong><br />매일을 위한 작은 지혜.<br /><br />MVP v1.0 · Vanilla HTML/CSS/JS<br />개인정보: 데이터는 이 기기의 LocalStorage에만 저장됩니다."
      : "<strong>Quote — Today's Wisdom</strong><br />A little wisdom for every day.<br /><br />MVP v1.0 · Vanilla HTML/CSS/JS<br />Privacy: Your data stays in LocalStorage on this device.";
    this.updateHeaderControls();
    Theme.renderThemeUI(); Quote.syncHomeChips(); Quote.syncExploreChips(); Quote.renderHomeCard();
    Quote.renderRecommended(); Favorites.renderSaved(); renderSettingsUI();
    if (state.currentPage === "explore") Quote.renderExplore();
    if (document.getElementById("search-overlay")?.classList.contains("is-open")) Search.renderResults(state.searchKeyword);
  },

  setLanguage(language) {
    updateSettings({ language: language === "en" ? "en" : "ko" });
    this.apply();
  }
};

