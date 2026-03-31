const CATEGORY_PAGES = [
  "./becostreet.com.br/product-category/abstrato/index.html",
  "./becostreet.com.br/product-category/antiguidade/index.html",
  "./becostreet.com.br/product-category/aquarela/index.html",
  "./becostreet.com.br/product-category/black-friday/index.html",
  "./becostreet.com.br/product-category/cartoon/index.html",
  "./becostreet.com.br/product-category/colagem/index.html",
  "./becostreet.com.br/product-category/desenho/index.html",
  "./becostreet.com.br/product-category/escultura/index.html",
  "./becostreet.com.br/product-category/figurativo/index.html",
  "./becostreet.com.br/product-category/geometrico/index.html",
  "./becostreet.com.br/product-category/obras/index.html",
  "./becostreet.com.br/product-category/original/index.html",
  "./becostreet.com.br/product-category/pintura/index.html"
];

const STORY_PAGES = [
  "./becostreet.com.br/revitalizando-espacos-e-acelerando-talentos-a-missao-do-beco-street/index.html",
  "./becostreet.com.br/beco-street-elevando-a-arte-urbana-a-novos-patamares/index.html",
  "./becostreet.com.br/conectando-arte-e-tecnologia-uma-nova-era-para-artistas-e-galerias-no-beco-street/index.html",
  "./becostreet.com.br/descubra-a-inovacao-no-beco-street-tecnologia-de-ponta-para-a-arte/index.html"
];

const STATIC_DATA = window.BECO_DATA || null;

const FALLBACK_IMAGES = STATIC_DATA?.fallbackImages?.length
  ? STATIC_DATA.fallbackImages
  : [
      "./becostreet.com.br/wp-content/uploads/2024/02/PRIMEIRO-POST-BECO-STREET.jpg",
      "./becostreet.com.br/wp-content/uploads/2024/02/shell2333-1100x600.jpg",
      "./becostreet.com.br/wp-content/uploads/2024/02/shell2-1100x600.jpg",
      "./becostreet.com.br/wp-content/uploads/2024/02/IMG_4236-scaled.jpg"
    ];

const state = {
  products: [],
  stories: [],
  activeCategory: "Todos",
  search: ""
};

const refs = {
  statProducts: document.getElementById("stat-products"),
  statArtists: document.getElementById("stat-artists"),
  statCategories: document.getElementById("stat-categories"),
  heroMain: document.getElementById("hero-feature-main"),
  heroStack: document.getElementById("hero-feature-stack"),
  manifestoGrid: document.getElementById("manifesto-grid"),
  featuredGrid: document.getElementById("featured-grid"),
  filterBar: document.getElementById("filter-bar"),
  collectionCount: document.getElementById("collection-count"),
  collectionGrid: document.getElementById("collection-grid"),
  artistWall: document.getElementById("artist-wall"),
  storyGrid: document.getElementById("story-grid"),
  searchInput: document.getElementById("search-input")
};

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanText(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleize(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function shortText(value, size) {
  const text = cleanText(value);
  if (text.length <= size) {
    return text;
  }
  return `${text.slice(0, size).trim()}…`;
}

function resolveUrl(resource, pageUrl) {
  if (!resource) {
    return "";
  }
  try {
    return new URL(resource, pageUrl).href;
  } catch (error) {
    return resource;
  }
}

function buildWhatsAppUrl(title) {
  const message = `EU QUERO COMPRAR OBRA ${cleanText(title)} - +55 11 99431-7886`;
  return `https://api.whatsapp.com/send?phone=5511994317886&text=${encodeURIComponent(message)}`;
}

function priceToNumber(price) {
  if (!price || !price.includes("R$")) {
    return 0;
  }
  const normalized = price
    .replace(/[^\d,]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function getProductHref(product) {
  if (product?.detailAvailable && product?.href) {
    return product.href;
  }
  return buildWhatsAppUrl(product?.title || "Beco Street");
}

function getProductLinkLabel(product) {
  return product?.detailAvailable ? "Ver obra" : "Comprar Agora";
}

function extractArtist(title, description) {
  const titleMatch = cleanText(title).match(/artista[:\s-]+(.+)$/i);
  if (titleMatch) {
    return cleanText(titleMatch[1]);
  }
  const descriptionMatch = cleanText(description).match(/artista[:\s-]+(.+)$/i);
  if (descriptionMatch) {
    return cleanText(descriptionMatch[1]);
  }
  const plainDescriptionMatch = cleanText(description).match(/^artista\s+(.+)$/i);
  if (plainDescriptionMatch) {
    return cleanText(plainDescriptionMatch[1]);
  }
  return "Beco Street";
}

function extractPrice(card) {
  const directPrice = cleanText(card.querySelector(".price")?.textContent || "");
  if (directPrice) {
    return directPrice;
  }
  const detailsContainer = card.querySelector(".details-container");
  if (!detailsContainer) {
    return "Consultar";
  }
  const clone = detailsContainer.cloneNode(true);
  clone.querySelectorAll(".woocommerce-product-details__short-description, .details-review-container, .bottom-components, .bottom-components-list, .component").forEach((node) => node.remove());
  const raw = cleanText(clone.textContent);
  if (!raw) {
    return "Consultar";
  }
  if (/leil[aã]o/i.test(raw)) {
    return raw;
  }
  return raw.includes("R$") ? raw : "Consultar";
}

function parseCategories(card) {
  return Array.from(card.classList)
    .filter((className) => className.startsWith("product_cat-"))
    .map((className) => titleize(className.replace("product_cat-", "")));
}

function parseProductCard(card, pageUrl) {
  const titleNode = card.querySelector(".archive-product-title a") || card.querySelector(".woocommerce-loop-product__link");
  const imageNode = card.querySelector(".woo_catalog_media_images img") || card.querySelector(".attachment-woocommerce_thumbnail");
  const descriptionNode = card.querySelector(".woocommerce-product-details__short-description");
  const href = resolveUrl(titleNode?.getAttribute("href") || "", pageUrl);
  const title = cleanText(titleNode?.textContent || "");
  const description = cleanText(descriptionNode?.textContent || "");
  if (!href || !title) {
    return null;
  }
  return {
    id: href,
    title,
    href,
    image: resolveUrl(imageNode?.getAttribute("src") || imageNode?.getAttribute("data-src") || "", pageUrl),
    description,
    price: extractPrice(card),
    artist: extractArtist(title, description),
    categories: parseCategories(card)
  };
}

async function fetchDocument(path) {
  const pageUrl = new URL(path, window.location.href).href;
  const response = await fetch(pageUrl);
  if (!response.ok) {
    throw new Error(`Falha ao carregar ${path}`);
  }
  const html = await response.text();
  const parser = new DOMParser();
  return {
    pageUrl,
    doc: parser.parseFromString(html, "text/html")
  };
}

async function loadProducts() {
  if (STATIC_DATA?.products?.length) {
    return [...STATIC_DATA.products].sort((first, second) => {
      const priceDiff = priceToNumber(second.price) - priceToNumber(first.price);
      if (priceDiff !== 0) {
        return priceDiff;
      }
      return String(first.title || "").localeCompare(String(second.title || ""), "pt-BR");
    });
  }
  const settled = await Promise.allSettled(CATEGORY_PAGES.map(fetchDocument));
  const productsMap = new Map();
  settled.forEach((result) => {
    if (result.status !== "fulfilled") {
      return;
    }
    const { doc, pageUrl } = result.value;
    doc.querySelectorAll("li.product").forEach((card) => {
      const product = parseProductCard(card, pageUrl);
      if (!product) {
        return;
      }
      const existing = productsMap.get(product.id);
      if (!existing) {
        productsMap.set(product.id, product);
        return;
      }
      const mergedCategories = Array.from(new Set([...(existing.categories || []), ...(product.categories || [])]));
      productsMap.set(product.id, {
        ...existing,
        ...product,
        description: existing.description.length > product.description.length ? existing.description : product.description,
        price: existing.price !== "Consultar" ? existing.price : product.price,
        image: existing.image || product.image,
        artist: existing.artist !== "Beco Street" ? existing.artist : product.artist,
        categories: mergedCategories
      });
    });
  });

  return Array.from(productsMap.values()).sort((first, second) => {
    const priceDiff = priceToNumber(second.price) - priceToNumber(first.price);
    if (priceDiff !== 0) {
      return priceDiff;
    }
    return first.title.localeCompare(second.title, "pt-BR");
  });
}

function parseStory(doc, pageUrl) {
  const title = cleanText(doc.querySelector("h1")?.textContent || doc.querySelector("title")?.textContent || "");
  const paragraphs = Array.from(doc.querySelectorAll(".article-content p, .entry-content p, article p"))
    .map((node) => cleanText(node.textContent))
    .filter((text) => text.length > 90);
  const imageNode = doc.querySelector(".post-thumbnail img, article img, .wp-post-image");
  return {
    title,
    excerpt: paragraphs.slice(0, 2).join(" "),
    image: resolveUrl(imageNode?.getAttribute("src") || "", pageUrl),
    href: pageUrl
  };
}

async function loadStories() {
  if (STATIC_DATA?.stories?.length) {
    return [...STATIC_DATA.stories];
  }
  const settled = await Promise.allSettled(STORY_PAGES.map(fetchDocument));
  return settled
    .filter((result) => result.status === "fulfilled")
    .map((result) => parseStory(result.value.doc, result.value.pageUrl))
    .filter((story) => story.title && story.excerpt);
}

function renderStats(products) {
  const artists = new Set(products.map((product) => product.artist).filter(Boolean));
  const categories = new Set(products.flatMap((product) => product.categories || []).filter(Boolean));
  refs.statProducts.textContent = String(products.length);
  refs.statArtists.textContent = String(artists.size);
  refs.statCategories.textContent = String(categories.size);
}

function renderHero(products) {
  const selection = [...products].slice(0, 4);
  const mainProduct = selection[0];
  if (mainProduct) {
    refs.heroMain.innerHTML = `
      <img class="hero-media" src="${escapeHtml(mainProduct.image || FALLBACK_IMAGES[0])}" alt="${escapeHtml(mainProduct.title)}">
      <div class="hero-overlay"></div>
      <div class="hero-panel-content">
        <p class="eyebrow">${escapeHtml(mainProduct.artist)}</p>
        <h3>${escapeHtml(mainProduct.title)}</h3>
        <p>${escapeHtml(mainProduct.price || "Consultar")}</p>
      </div>
    `;
  }
  const stackItems = selection.slice(1);
  refs.heroStack.innerHTML = stackItems.map((product, index) => `
    <article class="hero-stack-item">
      <img class="hero-media" src="${escapeHtml(product.image || FALLBACK_IMAGES[index + 1] || FALLBACK_IMAGES[0])}" alt="${escapeHtml(product.title)}">
      <div class="hero-overlay"></div>
      <div class="hero-panel-content">
        <p class="eyebrow">${escapeHtml(product.artist)}</p>
        <h3>${escapeHtml(shortText(product.title, 46))}</h3>
      </div>
    </article>
  `).join("");
}

function renderManifesto(stories) {
  refs.manifestoGrid.innerHTML = stories.slice(0, 3).map((story, index) => `
    <article class="manifesto-card" style="background:
      linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.78)),
      url('${escapeHtml(story.image || FALLBACK_IMAGES[index])}') center/cover;">
      <p class="eyebrow">Texto ${(index + 1).toString().padStart(2, "0")}</p>
      <h3>${escapeHtml(story.title)}</h3>
      <p>${escapeHtml(shortText(story.excerpt, 260))}</p>
    </article>
  `).join("");
}

function renderFeatured(products) {
  const highlighted = [...products].slice(0, 6);
  refs.featuredGrid.innerHTML = highlighted.map((product, index) => `
    <article class="featured-card ${index < 2 ? "large" : "small"}">
      <img src="${escapeHtml(product.image || FALLBACK_IMAGES[index] || FALLBACK_IMAGES[0])}" alt="${escapeHtml(product.title)}">
      <div class="featured-copy">
        <p class="eyebrow">${escapeHtml(product.artist)}</p>
        <h3>${escapeHtml(product.title)}</h3>
        <p>${escapeHtml(product.price)}</p>
      </div>
    </article>
  `).join("");
}

function getCategoryCounts(products) {
  const counts = new Map();
  products.forEach((product) => {
    (product.categories || []).forEach((category) => {
      counts.set(category, (counts.get(category) || 0) + 1);
    });
  });
  return Array.from(counts.entries()).sort((first, second) => second[1] - first[1]);
}

function renderFilters(products) {
  const categories = getCategoryCounts(products).slice(0, 12);
  const buttons = [
    `<button class="filter-chip ${state.activeCategory === "Todos" ? "active" : ""}" data-category="Todos">Todos</button>`,
    ...categories.map(([category, count]) => `
      <button class="filter-chip ${state.activeCategory === category ? "active" : ""}" data-category="${escapeHtml(category)}">
        ${escapeHtml(category)} · ${count}
      </button>
    `)
  ];
  refs.filterBar.innerHTML = buttons.join("");
  refs.filterBar.querySelectorAll(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeCategory = button.dataset.category || "Todos";
      renderFilters(state.products);
      renderCollection();
    });
  });
}

function getFilteredProducts() {
  const searchTerm = cleanText(state.search).toLowerCase();
  return state.products.filter((product) => {
    const matchesCategory = state.activeCategory === "Todos" || (product.categories || []).includes(state.activeCategory);
    if (!matchesCategory) {
      return false;
    }
    if (!searchTerm) {
      return true;
    }
    const haystack = [
      product.title,
      product.artist,
      product.description,
      ...(product.categories || [])
    ].join(" ").toLowerCase();
    return haystack.includes(searchTerm);
  });
}

function renderCollection() {
  const filtered = getFilteredProducts();
  refs.collectionCount.textContent = `${filtered.length} obras exibidas`;
  if (!filtered.length) {
    refs.collectionGrid.innerHTML = `
      <article class="product-card">
        <div class="product-body">
          <h3>Nenhuma obra encontrada</h3>
          <p>Tente outro artista, categoria ou termo de busca.</p>
        </div>
      </article>
    `;
    return;
  }

  refs.collectionGrid.innerHTML = filtered.map((product) => `
    <article class="product-card">
      <a class="product-media" href="${escapeHtml(getProductHref(product))}" ${product.detailAvailable ? "" : 'target="_blank" rel="noopener"'}>
        <img src="${escapeHtml(product.image || FALLBACK_IMAGES[0])}" alt="${escapeHtml(product.title)}" loading="lazy">
      </a>
      <div class="product-body">
        <div class="product-meta">
          <p class="eyebrow">${escapeHtml(product.artist)}</p>
          <h3>${escapeHtml(product.title)}</h3>
          <p>${escapeHtml(shortText(product.description || "Obra disponível no acervo Beco Street.", 150))}</p>
        </div>
        <div class="product-tag-row">
          ${(product.categories || []).slice(0, 3).map((category) => `<span class="product-tag">${escapeHtml(category)}</span>`).join("")}
        </div>
        <strong class="product-price">${escapeHtml(product.price)}</strong>
        <div class="product-actions">
          <a class="button button-secondary" href="${escapeHtml(getProductHref(product))}" ${product.detailAvailable ? "" : 'target="_blank" rel="noopener"'}>${getProductLinkLabel(product)}</a>
          <a class="button button-primary" href="${escapeHtml(buildWhatsAppUrl(product.title))}" target="_blank" rel="noopener">Comprar Agora</a>
        </div>
      </div>
    </article>
  `).join("");
}

function renderArtists(products) {
  const artistMap = new Map();
  products.forEach((product) => {
    const key = product.artist || "Beco Street";
    const current = artistMap.get(key) || { name: key, count: 0, categories: new Set() };
    current.count += 1;
    (product.categories || []).forEach((category) => current.categories.add(category));
    artistMap.set(key, current);
  });

  const topArtists = Array.from(artistMap.values())
    .sort((first, second) => second.count - first.count)
    .slice(0, 12);

  refs.artistWall.innerHTML = topArtists.map((artist) => `
    <article class="artist-pill">
      <strong>${escapeHtml(artist.name)}</strong>
      <span>${artist.count} obra(s) · ${escapeHtml(Array.from(artist.categories).slice(0, 3).join(" / ") || "Acervo Beco Street")}</span>
    </article>
  `).join("");
}

function renderStories(stories) {
  refs.storyGrid.innerHTML = stories.slice(0, 3).map((story, index) => `
    <article class="story-card">
      <img src="${escapeHtml(story.image || FALLBACK_IMAGES[index] || FALLBACK_IMAGES[0])}" alt="${escapeHtml(story.title)}">
      <div class="story-copy">
        <p class="eyebrow">Editorial Beco</p>
        <h3>${escapeHtml(story.title)}</h3>
        <p>${escapeHtml(shortText(story.excerpt, 220))}</p>
        <a class="button button-secondary" href="${escapeHtml(story.href)}">Ler texto original</a>
      </div>
    </article>
  `).join("");
}

function bindSearch() {
  refs.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value || "";
    renderCollection();
  });
}

async function bootstrap() {
  bindSearch();
  try {
    const [products, stories] = await Promise.all([loadProducts(), loadStories()]);
    state.products = products;
    state.stories = stories;
    renderStats(products);
    renderHero(products);
    renderManifesto(stories);
    renderFeatured(products);
    renderFilters(products);
    renderCollection();
    renderArtists(products);
    renderStories(stories);
  } catch (error) {
    refs.collectionCount.textContent = "Falha ao carregar o acervo.";
    refs.collectionGrid.innerHTML = `
      <article class="product-card">
        <div class="product-body">
          <h3>Não foi possível montar o acervo agora.</h3>
          <p>Confira se a pasta interna becostreet.com.br está publicada junto desta página para que as obras, textos e imagens do Beco Street carreguem corretamente.</p>
        </div>
      </article>
    `;
  }
}

bootstrap();
