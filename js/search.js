/**
 * Search
 */

const Search = {
  query(keyword) {
    const q = (keyword || "").trim().toLowerCase();
    if (!q) return quotes.slice();

    return quotes.filter((item) => {
      const hay = [
        item.text,
        EN_QUOTES[item.id] || "",
        item.author,
        item.source,
        item.category,
        CATEGORY_KO[item.category] || "",
        ...(item.tags || []),
        item.description || "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  },

  renderResults(keyword) {
    const container = document.getElementById("search-results");
    if (!container) return;

    const results = this.query(keyword);
    state.searchKeyword = keyword;

    if (!results.length) {
      container.innerHTML = `
        <div class="empty-state">
          <h3>${I18n.t("empty.title")}</h3>
          <p>${I18n.t("empty.search")}</p>
        </div>`;
      return;
    }

    container.innerHTML = results
      .map((q, i) => Quote.listCardHTML(q, i, false))
      .join("");
  },

  open() {
    const overlay = document.getElementById("search-overlay");
    const input = document.getElementById("search-input");
    if (!overlay) return;
    overlay.classList.add("is-open");
    this.renderResults("");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 50);
    }
  },

  close() {
    const overlay = document.getElementById("search-overlay");
    if (overlay) overlay.classList.remove("is-open");
    state.searchKeyword = "";
  },

  bindEvents() {
    const input = document.getElementById("search-input");
    const closeBtn = document.getElementById("btn-search-close");
    const openBtn = document.getElementById("btn-search");

    if (openBtn) openBtn.addEventListener("click", () => this.open());
    if (closeBtn) closeBtn.addEventListener("click", () => this.close());
    if (input) {
      input.addEventListener("input", (e) => {
        this.renderResults(e.target.value);
      });
    }
  },
};

