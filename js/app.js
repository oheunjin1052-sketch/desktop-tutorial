/**
 * App bootstrap — SPA navigation & settings
 */

function showToast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.classList.add("is-visible");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    el.classList.remove("is-visible");
  }, 2200);
}

function showPage(page) {
  setPage(page);

  document.querySelectorAll(".page").forEach((p) => {
    p.classList.toggle("is-active", p.dataset.page === page);
  });

  document.querySelectorAll(".nav-item").forEach((n) => {
    n.classList.toggle("is-active", n.dataset.nav === page);
  });

  if (page === "explore") {
    Quote.syncExploreChips();
    Quote.renderExplore();
  }
  if (page === "saved") {
    Favorites.renderSaved();
  }
  if (page === "settings") {
    Theme.renderThemeUI();
    renderSettingsUI();
  }
  if (page === "home") {
    Quote.renderHomeCard();
    Quote.renderRecommended();
  }
}

function renderSettingsUI() {
  const { dailyQuote, defaultCategory } = state.settings;

  document.querySelectorAll("#daily-toggle .settings-option").forEach((btn) => {
    const on = dailyQuote ? "on" : "off";
    btn.classList.toggle("is-active", btn.dataset.value === on);
  });

  const select = document.getElementById("default-category");
  if (select) {
    select.innerHTML =
      `<option value="all">${I18n.t("category.all")}</option>` +
      CATEGORIES.map((c) => `<option value="${c}">${I18n.category(c)}</option>`).join("");
  }
  if (select) select.value = defaultCategory || "all";
}

function bindSettings() {
  const dailyToggle = document.getElementById("daily-toggle");
  const select = document.getElementById("default-category");

  if (dailyToggle) {
    dailyToggle.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-value]");
      if (!btn) return;
      const on = btn.dataset.value === "on";
      updateSettings({ dailyQuote: on });
      renderSettingsUI();
      showToast(I18n.language() === "ko"
        ? (on ? "매일의 명언 알림 켜짐 (UI만 지원)" : "매일의 명언 알림 꺼짐")
        : (on ? "Daily Quote on (UI only)" : "Daily Quote off"));
    });
  }

  if (select) {
    select.addEventListener("change", () => {
      updateSettings({ defaultCategory: select.value });
      setCategory(select.value);
      Quote.syncHomeChips();
      Quote.syncExploreChips();
      Quote.renderHomeCard();
      Quote.renderRecommended();
      showToast(I18n.language() === "ko" ? "기본 카테고리가 저장되었습니다" : "Default category saved");
    });
  }

}

function bindHeaderActions() {
  document.getElementById("btn-home")?.addEventListener("click", () => showPage("home"));
  document.getElementById("btn-theme")?.addEventListener("click", () => {
    const next = state.settings.appTheme === "light" ? "dark" : "light";
    updateSettings({ appTheme: next });
    Theme.applyAppTheme(next);
    I18n.updateHeaderControls();
    showToast(I18n.t(next === "light" ? "toast.light" : "toast.dark"));
  });
  document.getElementById("btn-language")?.addEventListener("click", () => {
    I18n.setLanguage(state.settings.language === "en" ? "ko" : "en");
  });
}

function bindNav() {
  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      showPage(btn.dataset.nav);
    });
  });
}

function initApp() {
  initState();
  Theme.applyAppTheme(state.settings.appTheme || "dark");

  Quote.bindEvents();
  Quote.syncHomeChips();
  Quote.syncExploreChips();
  Theme.bindEvents();
  Search.bindEvents();
  bindNav();
  bindSettings();
  bindHeaderActions();

  Quote.renderHomeCard();
  Quote.renderRecommended();
  Theme.renderThemeUI();
  renderSettingsUI();
  Favorites.renderSaved();
  I18n.apply();
}

document.addEventListener("DOMContentLoaded", initApp);

