document.addEventListener("DOMContentLoaded", () => {
  const getBasePath = () => {
    const script = document.currentScript || [...document.scripts].find(s =>
      s.src.includes("script.js")
    );

    if (!script) return "";

    return script.src.substring(0, script.src.lastIndexOf("/") + 1);
  };

  const basePath = getBasePath();

  const isAbsoluteUrl = (url) => {
    return /^(https?:|mailto:|tel:|#|\/)/.test(url);
  };

  const normalizeInjectedPaths = (target) => {
    target.querySelectorAll("[href]").forEach((el) => {
      const href = el.getAttribute("href");
      if (href && !isAbsoluteUrl(href)) {
        el.setAttribute("href", basePath + href);
      }
    });

    target.querySelectorAll("[src]").forEach((el) => {
      const src = el.getAttribute("src");
      if (src && !isAbsoluteUrl(src)) {
        el.setAttribute("src", basePath + src);
      }
    });
  };

  const loadHTML = (url, targetId, callback) => {
    fetch(basePath + url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${basePath + url}`);
        return res.text();
      })
      .then((html) => {
        const target = document.getElementById(targetId);
        if (!target) throw new Error(`Missing element with id="${targetId}"`);
        target.innerHTML = html;

        normalizeInjectedPaths(target);

        if (typeof callback === "function") callback();
      })
      .catch((err) => console.error(err));
  };

  const setActiveNav = () => {
    const section = document.body.dataset.nav;
    if (!section) return;

    const map = {
      home: "index.html",
      about: "about.html",
      projects: "projects.html",
      photo: "photo.html",
      blog: "blog.html",
      resume: "resume.html",
      contact: "contact.html"
    };

    const hrefToMatch = map[section];
    if (!hrefToMatch) return;

    document
      .querySelectorAll(".navbar nav a")
      .forEach((a) => a.classList.remove("active"));

    const activeLink = [...document.querySelectorAll(".navbar nav a")].find((a) =>
      a.getAttribute("href")?.endsWith(hrefToMatch)
    );

    if (activeLink) activeLink.classList.add("active");
  };

  const setFooterYear = () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  };

  loadHTML("header.html", "site-header", setActiveNav);
  loadHTML("footer.html", "site-footer", setFooterYear);
});