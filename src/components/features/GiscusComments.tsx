"use client";

export function GiscusComments() {
  return (
    <section
      style={{ width: "100%" }}
      ref={(element) => {
        if (!element) {
          return;
        }

        const scriptElement = document.createElement("script");
        scriptElement.setAttribute("src", "https://giscus.app/client.js");
        scriptElement.setAttribute("data-repo", "WHS95/latlngtool");
        scriptElement.setAttribute("data-repo-id", "R_kgDOO_98Ew");
        scriptElement.setAttribute("data-category", "comments");
        scriptElement.setAttribute("data-category-id", "DIC_kwDOO_98E84Cr377");
        scriptElement.setAttribute("data-mapping", "pathname");
        scriptElement.setAttribute("data-strict", "0");
        scriptElement.setAttribute("data-reactions-enabled", "1");
        scriptElement.setAttribute("data-emit-metadata", "0");
        scriptElement.setAttribute("data-input-position", "bottom");
        scriptElement.setAttribute("data-theme", "light");
        scriptElement.setAttribute("data-lang", "ko");
        scriptElement.setAttribute("data-loading", "lazy");
        scriptElement.setAttribute("crossorigin", "anonymous");

        element.replaceChildren(scriptElement);
      }}
    />
  );
}
