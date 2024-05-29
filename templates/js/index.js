// ===== JS index.html ========

// == Dropdown Menu Script ==
document.addEventListener("click", function (e) {
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  const isInsideDropdown = e.target.closest("[data-dropdown]") !== null;

  if (!isDropdownButton && !isInsideDropdown) {
    // If the click is outside the dropdown, close all dropdowns
    document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
    return;
  }

  let currentDropdown;
  if (isDropdownButton) {
    // Toggle the active state of the current dropdown
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  // Close other dropdowns except the current one
  document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("active");
    }
  });
});

// ======  navigations ==========//

const barEl = document.querySelector("#sidebar");
const toggleBtn = document.querySelector(".mobile-nav-toggle");
const chatCont = document.querySelector(".chat-container");

toggleBtn.addEventListener("click", function () {
  const barVisible = barEl.getAttribute("data-visible");
  const toggleEpanded = toggleBtn.getAttribute("aria-expanded");
  const chatblur = chatCont.getAttribute("data-isblur");
  if (barVisible === "true") {
    toggleBtn.setAttribute("aria-expanded", false);
    barEl.setAttribute("data-visible", false);
    chatCont.setAttribute("data-isblur", true);
  } else {
    toggleBtn.setAttribute("aria-expanded", true);
    barEl.setAttribute("data-visible", true);
    chatCont.setAttribute("data-isblur", false);
  }
});
