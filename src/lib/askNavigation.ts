/** Prepare a question without triggering an inference request. */
export function preparePortfolioQuestion(question: string) {
  window.dispatchEvent(new CustomEvent("portfolio:question", { detail: question }));
  document.getElementById("ask")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start",
  });
}
