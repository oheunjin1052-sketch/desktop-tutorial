/**
 * Theme system
 */

const Theme = {
  applyCardBackground(element, themeId, quoteThemeId) {
    const theme = getThemeById(themeId || quoteThemeId || "dark");
    const textColor = theme.textColor || "#ffffff";

    element.style.backgroundImage = theme.gradient;
    element.style.backgroundColor = theme.background || "#111";
    element.style.color = textColor;

    if (theme.id === "minimal" || theme.textColor === "#222222") {
      element.classList.add("quote-card--light");
    } else {
      element.classList.remove("quote-card--light");
    }
  },

  applySelectedTheme(themeId) {
    state.selectedTheme = themeId;
    Storage.setTheme(themeId);
  },

  applyAppTheme(appTheme) {
    document.documentElement.setAttribute(
      "data-app-theme",
      appTheme === "light" ? "light" : "dark"
    );
  },

  getStyleForTheme(theme) {
    return {
      backgroundImage: theme.gradient,
      backgroundColor: theme.background || "#111",
      color: theme.textColor || "#fff",
    };
  },

  renderThemeUI() {
    const mixes = document.getElementById("theme-mixes");
    const grid = document.getElementById("theme-grid");
    if (!mixes || !grid) return;

    const mixThemes = THEMES.filter((t) => t.id === "minimal" || t.id === "ocean");
    mixes.innerHTML = mixThemes
      .map(
        (t) => `
      <button type="button" class="theme-mix-card ${
        state.selectedTheme === t.id ? "is-selected" : ""
      }" data-theme-id="${t.id}" style="background-image:${t.gradient};color:${
          t.textColor
        }" aria-label="${I18n.language() === "ko" ? `${t.name} 테마` : `${t.name} theme`}">
        ${t.name}
      </button>`
      )
      .join("");

    this.renderThemeGrid("all");
  },

  renderThemeGrid(filter) {
    const grid = document.getElementById("theme-grid");
    if (!grid) return;

    let list = THEMES;
    if (filter === "solid") list = THEMES.filter((t) => t.type === "solid");
    if (filter === "photo") list = THEMES.filter((t) => t.type === "photo");

    grid.innerHTML = list
      .map(
        (t) => `
      <button type="button" class="theme-preview ${
        state.selectedTheme === t.id ? "is-selected" : ""
      }" data-theme-id="${t.id}" style="background-image:${t.gradient}" aria-label="${
          t.name
        } ${I18n.language() === "ko" ? "테마 선택" : "theme"}">
        <span class="theme-preview-aa" style="color:${t.textColor}">Aa</span>
        <span class="theme-badge">${I18n.language() === "ko" ? "무료" : "Free"}</span>
      </button>`
      )
      .join("");
  },

  bindEvents() {
    const mixes = document.getElementById("theme-mixes");
    const grid = document.getElementById("theme-grid");
    const filters = document.getElementById("theme-filter-chips");

    const onSelect = (e) => {
      const btn = e.target.closest("[data-theme-id]");
      if (!btn) return;
      this.applySelectedTheme(btn.dataset.themeId);
      this.renderThemeUI();
      Quote.renderHomeCard();
      showToast(I18n.language() === "ko" ? "카드 테마가 변경되었습니다" : "Card theme changed");
    };

    if (mixes) mixes.addEventListener("click", onSelect);
    if (grid) grid.addEventListener("click", onSelect);

    if (filters) {
      filters.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-filter]");
        if (!chip) return;
        filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        this.renderThemeGrid(chip.dataset.filter);
      });
    }
  },
};

