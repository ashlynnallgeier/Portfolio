document.addEventListener("DOMContentLoaded", () => {
  const loadHTML = (url, targetId, callback) => {
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        return res.text();
      })
      .then((html) => {
        const target = document.getElementById(targetId);
        if (!target) throw new Error(`Missing element with id="${targetId}"`);
        target.innerHTML = html;
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

    const activeLink = document.querySelector(
      `.navbar nav a[href="${hrefToMatch}"]`
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
