const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");
const cartCount = document.querySelector(".cart-count");
const cartLink = document.querySelector(".cart-link");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    menuCards.forEach((card) => {
      card.hidden = selectedCategory !== "all" && card.dataset.category !== selectedCategory;
    });
  });
});

let itemsInCart = 0;

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    itemsInCart += 1;
    cartCount.textContent = String(itemsInCart);
    cartLink.setAttribute("aria-label", `Cart, ${itemsInCart} ${itemsInCart === 1 ? "item" : "items"}`);

    const originalText = button.innerHTML;
    button.classList.add("is-added");
    button.innerHTML = `Added ${button.dataset.item} <span aria-hidden="true">✓</span>`;

    window.setTimeout(() => {
      button.classList.remove("is-added");
      button.innerHTML = originalText;
    }, 1100);
  });
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const firstName = contactForm.elements.name.value.trim().split(/\s+/)[0];
  formStatus.textContent = `Thanks, ${firstName}! Your message is ready. We'll be in touch soon.`;
  contactForm.reset();
});
