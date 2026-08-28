/**
 * Quote selection, rendering, swipe, navigation
 */

const Quote = {
  touchStartX: 0,
  touchStartY: 0,
  animating: false,

  listCardHTML(quote, index, showMeta) {
    const gradient = getListGradient(index);
    const theme = getThemeById(quote.theme);
    const bg = theme ? theme.gradient : gradient;
    const localizedText = I18n.quoteText(quote);
    const localizedCategory = I18n.category(quote.category);
    const meta = showMeta
      ? `<p class="list-card-meta">${localizedCategory} · ${I18n.t("saved.meta")}</p>`
      : `<p class="list-card-meta">${localizedCategory}</p>`;

    return `
      <div class="list-item-wrap">
        <button type="button" class="list-card" data-quote-id="${quote.id}"
          style="background-image:${bg}" aria-label="${escapeAttr(localizedText)}">
          <p class="list-card-text">${escapeHTML(localizedText)}</p>
          <p class="list-card-author">— ${escapeHTML(I18n.quoteAuthor(quote))}</p>
        </button>
        ${meta}
      </div>`;
  },

  renderHomeCard(direction) {
    const card = document.getElementById("home-quote-card");
    if (!card) return;

    const quote = getCurrentQuote();
    const themeId = state.selectedTheme || quote.theme;

    const applyContent = () => {
      Theme.applyCardBackground(card, themeId, quote.theme);

      const cat = document.getElementById("home-category");
      const text = document.getElementById("home-quote-text");
      const author = document.getElementById("home-quote-author");

      if (cat) cat.textContent = I18n.category(quote.category);
      if (text) text.textContent = I18n.quoteText(quote);
      if (author) author.textContent = `— ${I18n.quoteAuthor(quote)}`;

      Favorites.updateFavoriteButton(quote.id);
      this.renderDots();
      Storage.setLastQuoteId(quote.id);

      card.classList.remove("is-leaving-left", "is-leaving-right");
      card.classList.add("is-entering");
      setTimeout(() => card.classList.remove("is-entering"), 260);
    };

    if (direction && !this.animating) {
      this.animating = true;
      card.classList.add(
        direction === "next" ? "is-leaving-left" : "is-leaving-right"
      );
      setTimeout(() => {
        applyContent();
        this.animating = false;
      }, 200);
    } else {
      applyContent();
    }
  },

  renderDots() {
    const el = document.getElementById("dot-indicators");
    if (!el) return;

    const total = state.filteredQuoteIds.length;
    const maxDots = Math.min(total, 8);
    const current = state.currentQuoteIndex;

    let html = "";
    for (let i = 0; i < maxDots; i++) {
      const isActive =
        total <= 8
          ? i === current
          : i ===
            Math.round((current / Math.max(total - 1, 1)) * (maxDots - 1));
      html += `<span class="dot ${isActive ? "is-active" : ""}"></span>`;
    }
    el.innerHTML = html;
  },

  next() {
    if (this.animating) return;
    goNextQuote();
    this.renderHomeCard("next");
  },

  prev() {
    if (this.animating) return;
    goPrevQuote();
    this.renderHomeCard("prev");
  },

  renderCategoryChips(containerId, selected, onSelect) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const items = ["all", ...CATEGORIES];
    el.innerHTML = items
      .map((c) => {
        const label = c === "all" ? I18n.t("category.all") : I18n.category(c);
        const active = selected === c ? "is-active" : "";
        return `<button type="button" class="chip ${active}" data-category="${c}">${label}</button>`;
      })
      .join("");

    el.onclick = (e) => {
      const chip = e.target.closest("[data-category]");
      if (!chip) return;
      onSelect(chip.dataset.category);
    };
  },

  renderExplore() {
    const list = document.getElementById("explore-list");
    if (!list) return;

    let items = quotes;
    if (state.selectedCategory !== "all") {
      items = quotes.filter((q) => q.category === state.selectedCategory);
    }

    if (!items.length) {
      list.innerHTML = `
        <div class="empty-state">
          <h3>${I18n.t("empty.title")}</h3>
          <p>${I18n.t("empty.category")}</p>
        </div>`;
      return;
    }

    list.innerHTML = items
      .map((q, i) => this.listCardHTML(q, i, false))
      .join("");
  },

  renderRecommended() {
    const el = document.getElementById("home-recommended");
    if (!el) return;

    const current = getCurrentQuote();
    const recs = quotes
      .filter((q) => q.id !== current.id)
      .filter(
        (q) =>
          state.selectedCategory === "all" ||
          q.category === state.selectedCategory ||
          q.category === current.category
      )
      .slice(0, 4);

    el.innerHTML = recs.map((q, i) => this.listCardHTML(q, i, false)).join("");
  },

  openQuoteById(id) {
    const quote = getQuoteById(Number(id));
    if (!quote) return;

    // Ensure quote is in filtered list
    if (!state.filteredQuoteIds.includes(quote.id)) {
      setCategory("all");
      this.syncHomeChips();
    }

    const idx = state.filteredQuoteIds.indexOf(quote.id);
    if (idx >= 0) {
      state.currentQuoteIndex = idx;
      Storage.setLastQuoteId(quote.id);
    }

    showPage("home");
    this.renderHomeCard();
    this.renderRecommended();
  },

  onCategorySelect(cat) {
    setCategory(cat);
    this.syncHomeChips();
    this.syncExploreChips();
    this.renderHomeCard();
    this.renderRecommended();
    if (state.currentPage === "explore") {
      this.renderExplore();
    }
  },

  syncHomeChips() {
    this.renderCategoryChips(
      "home-category-chips",
      state.selectedCategory,
      (cat) => this.onCategorySelect(cat)
    );
  },

  syncExploreChips() {
    this.renderCategoryChips(
      "explore-category-chips",
      state.selectedCategory,
      (cat) => this.onCategorySelect(cat)
    );
  },

  bindSwipe() {
    const card = document.getElementById("home-quote-card");
    if (!card) return;

    card.addEventListener(
      "touchstart",
      (e) => {
        const t = e.changedTouches[0];
        this.touchStartX = t.screenX;
        this.touchStartY = t.screenY;
      },
      { passive: true }
    );

    card.addEventListener(
      "touchend",
      (e) => {
        const t = e.changedTouches[0];
        const dx = t.screenX - this.touchStartX;
        const dy = t.screenY - this.touchStartY;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) this.next();
        else this.prev();
      },
      { passive: true }
    );
  },

  bindEvents() {
    const prev = document.getElementById("btn-prev");
    const next = document.getElementById("btn-next");
    const fav = document.getElementById("btn-favorite");
    const share = document.getElementById("btn-share");

    if (prev) prev.addEventListener("click", () => this.prev());
    if (next) next.addEventListener("click", () => this.next());

    if (fav) {
      fav.addEventListener("click", () => {
        const q = getCurrentQuote();
        const on = Favorites.toggle(q.id);
        Favorites.updateFavoriteButton(q.id);
        Favorites.renderSaved();
        showToast(I18n.t(on ? "toast.saved" : "toast.unsaved"));
      });
    }

    if (share) {
      share.addEventListener("click", () => {
        Share.share(getCurrentQuote());
      });
    }

    document.addEventListener("click", (e) => {
      const card = e.target.closest(".list-card[data-quote-id]");
      if (!card) return;
      this.openQuoteById(card.dataset.quoteId);
      Search.close();
    });

    document.addEventListener("keydown", (e) => {
      if (state.currentPage !== "home") return;
      const overlay = document.getElementById("search-overlay");
      if (overlay && overlay.classList.contains("is-open")) return;
      if (e.key === "ArrowRight") this.next();
      if (e.key === "ArrowLeft") this.prev();
    });

    this.bindSwipe();
  },
};

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str) {
  return escapeHTML(str).replace(/'/g, "&#39;");
}

