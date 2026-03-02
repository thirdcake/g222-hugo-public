(() => {
  // ns-hugo-imp:/home/ksk/g222-hugo/assets/js/colormode.js
  var ColorMode = class extends HTMLElement {
    svg;
    light;
    dark;
    #isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    constructor() {
      super();
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
      title.textContent = "\u30AB\u30E9\u30FC\u30E2\u30FC\u30C9\u5207\u66FF\u3048";
      this.svg.appendChild(title);
      this.svg.classList.add("g222-color-mode-svg", "ms-1");
      this.svg.setAttribute("viewBox", "0 0 16 16");
      this.light = document.createElementNS("http://www.w3.org/2000/svg", "use");
      this.light.setAttribute("href", "/img/icon.svg#moon");
      this.dark = document.createElementNS("http://www.w3.org/2000/svg", "use");
      this.dark.setAttribute("href", "/img/icon.svg#sun");
    }
    get isDark() {
      return this.#isDark;
    }
    set isDark(bool) {
      if (this.#isDark === bool) return;
      if (bool) {
        this.svg.removeChild(this.light);
        this.svg.appendChild(this.dark);
      } else {
        this.svg.removeChild(this.dark);
        this.svg.appendChild(this.light);
      }
      this.#isDark = bool;
    }
    connectedCallback() {
      this.setAttribute("role", "button");
      this.setAttribute("tabindex", "0");
      this.setAttribute("aria-label", "color \u30E2\u30FC\u30C9\u5207\u66FF\u3048");
      this.setAttribute("aria-pressed", "false");
      this.appendChild(this.svg);
      if (this.isDark) {
        this.svg.appendChild(this.dark);
      } else {
        this.svg.appendChild(this.light);
      }
      const local = window.localStorage.getItem("color-mode");
      if (local !== null) {
        this.isDark = local === "dark";
      }
      document.documentElement.dataset.bsTheme = this.isDark ? "dark" : "light";
      this.svg.addEventListener("click", () => {
        this.isDark = !this.isDark;
        document.documentElement.dataset.bsTheme = this.isDark ? "dark" : "light";
        window.localStorage.setItem("color-mode", this.isDark ? "dark" : "light");
      }, false);
    }
  };

  // ns-hugo-imp:/home/ksk/g222-hugo/assets/js/yukimasa.js
  var YukimasaContent = class extends HTMLElement {
    connectedCallback() {
      this.appendChild(this.image);
      this.appendChild(this.message);
    }
    get message() {
      const wrap = document.createElement("div");
      return wrap;
    }
    get image() {
      const figure = document.createElement("figure");
      figure.classList.add("figure");
      const img = document.createElement("img");
      img.src = this.monthlyImage;
      img.classList.add("img-fluid", "figure-img");
      img.width = "1";
      img.height = "1";
      img.style.width = "100%";
      img.style.maxWidth = "400px";
      img.style.height = "auto";
      img.alt = "\u65E5\u884C\u9023\u516C\u5F0F\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u300C\u30E6\u30AD\u30DE\u30B5\u304F\u3093\u300D";
      figure.appendChild(img);
      const caption = document.createElement("figcaption");
      caption.classList.add("figure-caption");
      caption.textContent = "\u65E5\u884C\u9023\u516C\u5F0F\u30AD\u30E3\u30E9\u30AF\u30BF\u30FC\u300C\u30E6\u30AD\u30DE\u30B5\u304F\u3093\u300D";
      figure.appendChild(caption);
      return figure;
    }
    get monthlyImage() {
      const date = /* @__PURE__ */ new Date();
      const images = [
        "https://img.thirdcake.com/img/c4bd7e3b06b4308dfbad8102e61a6649/dkqjvzl4x3m1mpt.webp",
        "https://img.thirdcake.com/img/946c0df20bb78e151a87180fee20e391/qdsk8elfxqvr7yk.webp",
        "https://img.thirdcake.com/img/a80281aa9a5f83bac7a8b7688ab7091c/xe6lsqwwj3zl0pc.webp",
        "https://img.thirdcake.com/img/bc6dd169aac2ce5ef828cf1408549476/ie1x4tlzlf9omou.webp",
        "https://img.thirdcake.com/img/665253585b122a818ef4a24784ec09eb/uvkcsrzo7aufbit.webp",
        "https://img.thirdcake.com/img/e556a8e911744d317282173df7cec33d/gmzbux8tdagvptd.webp",
        "https://img.thirdcake.com/img/ee391d4aa5dfc4ebc01197b7a5e4f208/w6jzwlacuohtr97.webp",
        "https://img.thirdcake.com/img/c0ba76c7d3cfb03f5213a2270d792bcb/feicsnl8153ohuj.webp",
        "https://img.thirdcake.com/img/2e2100618c989d273b25dcdb4f9490a5/u9bcjgnqx82yl7i.webp",
        "https://img.thirdcake.com/img/0c335a7933c3c2cc3d8d265833992c51/570p4eir6dhlluc.webp",
        "https://img.thirdcake.com/img/0f2ebe0ee517921e9e9358b15cfc6a3f/ehgyw9a5cqf0xr3.webp",
        "https://img.thirdcake.com/img/a8c0b0cfccfc978a8ab2609436f917a0/igt2psvlywa3x6j.webp"
      ];
      console.log(date.getMonth());
      return images[date.getMonth()];
    }
  };

  // <stdin>
  console.log("hugo main.js");
  var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.bsTheme = isDark ? "dark" : "light";
  customElements.define("color-mode", ColorMode);
  customElements.define("yukimasa-content", YukimasaContent);
})();
