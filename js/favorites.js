/**
 * Favorites
 */

const Favorites = {
  isFavorite(quoteId) {
    return state.favorites.includes(quoteId);
  },

  toggle(quoteId) {
    const idx = state.favorites.indexOf(quoteId);
    if (idx >= 0) {
      state.favorites.splice(idx, 1);
    } else {
      state.favorites.push(quoteId);
    }
    Storage.setFavorites(state.favorites);
    return this.isFavorite(quoteId);
  },

  getFavoriteQuotes() {
    return state.favorites
      .map((id) => getQuoteById(id))
      .filter(Boolean);
  },

  updateFavoriteButton(quoteId) {
    const btn = document.getElementById("btn-favorite");
    if (!btn) return;
    const on = this.isFavorite(quoteId);
    btn.classList.toggle("is-favorited", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", I18n.language() === "ko"
      ? (on ? "즐겨찾기 해제" : "즐겨찾기")
      : (on ? "Remove from favorites" : "Add to favorites"));
  },

  renderSaved() {
    const list = document.getElementById("saved-list");
    if (!list) return;

    const favs = this.getFavoriteQuotes();
    if (favs.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon" aria-hidden="true">♡</div>
          <h3>${I18n.language() === "ko" ? "아직 저장한 명언이 없습니다" : "No saved quotes yet"}</h3>
          <p>${I18n.language() === "ko" ? "마음에 드는 명언을 발견하면<br />하트 버튼을 눌러 저장해보세요." : "When a quote speaks to you,<br />tap the heart to save it."}</p>
        </div>`;
      return;
    }

    list.innerHTML = favs
      .map((q, i) => Quote.listCardHTML(q, i, true))
      .join("");
  },
};

