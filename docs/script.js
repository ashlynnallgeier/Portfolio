  document.addEventListener("DOMContentLoaded", () => {
    const loadHTML = (url, targetId, callback) => {
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to load ${url}`);
          return res.text();
        })
        .then(html => {
          document.getElementById(targetId).innerHTML = html;
          if (callback) callback();
        })
        .catch(err => console.error(err));
    };

    loadHTML("header.html", "site-header");

    loadHTML("footer.html", "site-footer", () => {
      const yearSpan = document.getElementById("year");
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    });
  });

