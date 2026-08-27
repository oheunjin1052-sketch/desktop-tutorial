/**
 * Share via Web Share API or Clipboard
 */

const Share = {
  formatText(quote) {
    return `"${I18n.quoteText(quote)}"\n\n— ${I18n.quoteAuthor(quote)}\n\n#Quote #${quote.category} #SpiderMan`;
  },

  async share(quote) {
    const text = this.formatText(quote);
    const payload = {
      title: I18n.language() === "ko" ? "오늘의 명언" : "Today's Quote",
      text,
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return "shared";
      } catch (err) {
        if (err && err.name === "AbortError") return "cancelled";
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      showToast(I18n.t("toast.copied"));
      return "copied";
    } catch {
      showToast(I18n.t("toast.shareFailed"));
      return "failed";
    }
  },
};

