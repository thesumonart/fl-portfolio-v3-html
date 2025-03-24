// Table Multiple wallet Open Close

let multiWallet = document.getElementsByClassName("multi-wallet");
function toggleContent(element) {
  const subContent = element.closest(".row-content").nextElementSibling;
  subContent.classList.toggle("visible");

  const icon = element.querySelector(".down-arrow-icon");
}
Array.from(multiWallet).forEach((wallet) => {
  wallet.addEventListener("click", function () {
    toggleContent(this);
  });
});

// NavBar

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".berger-button");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeMenu = document.getElementById("closeMenu");
  const overlay = document.getElementById("sidebarOverlay");

  // Function to open menu
  function openMenu() {
    sidebarMenu.classList.add("active");
    overlay.classList.add("active");
  }

  // Function to close menu
  function closeSidebar() {
    sidebarMenu.classList.remove("active");
    overlay.classList.remove("active");
  }

  menuButton.addEventListener("click", openMenu);
  closeMenu.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
});

// NavBar

// watchlist switch button toggle

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".switch-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});

// Watchlist items
document.addEventListener("DOMContentLoaded", function () {
  const marquee = document.querySelector(".marquee");

  marquee.addEventListener("mouseenter", function () {
    this.stop();
  });

  marquee.addEventListener("mouseleave", function () {
    this.start();
  });
});

// Customize Dropdown
const portfolioCustomizeDropdown = document.getElementById(
  "portfolioCustomizeDropdown"
);
const customizeOptions = document.getElementById("portfolioCustomizeOptions");
const customizeArrow = document.getElementById("portfolioCustomizeArrow");

const closeCustomizeDropdown = () => {
  customizeOptions.classList.remove("show");
  customizeArrow.classList.remove("open");
};

portfolioCustomizeDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  preventMultipleOpen(customizeOptions);
  customizeOptions.classList.toggle("show");
  customizeArrow.classList.toggle("open");
});

// Wallet Dropdown
document.querySelectorAll(".wallet-dropdown").forEach((dropdown) => {
  const walletOptions = dropdown.querySelector(".dropdown-options");
  const arrow = dropdown.querySelector(".arrow-icon");
  const selectedWalletOption = dropdown.querySelector(
    "#selected-wallet-option"
  );

  const closeWalletDropdown = () => {
    walletOptions.classList.remove("show");
    arrow.classList.remove("open");
  };

  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    preventMultipleOpen(walletOptions);
    walletOptions.classList.toggle("show");
    arrow.classList.toggle("open");
  });

  walletOptions.addEventListener("click", (e) => {
    if (e.target.type === "checkbox") {
      walletOptions
        .querySelectorAll('input[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
      e.target.checked = true;
      selectedWalletOption.textContent = e.target
        .closest(".option")
        .querySelector(".wallet-name").textContent;
      closeWalletDropdown();
    }
  });
});

// Close all dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
    dropdown.classList.remove("show");
    const parentDropdown = dropdown.closest(
      ".wallet-dropdown, #portfolioCustomizeDropdown"
    );
    if (parentDropdown) {
      const arrow = parentDropdown.querySelector(
        ".arrow-icon, #portfolioCustomizeArrow"
      );
      if (arrow) arrow.classList.remove("open");
    }
  });
});

// Prevent multiple dropdowns from opening
const preventMultipleOpen = (currentDropdown) => {
  document.querySelectorAll(".dropdown-options.show").forEach((dropdown) => {
    if (dropdown !== currentDropdown) {
      dropdown.classList.remove("show");
      const parentDropdown = dropdown.closest(
        ".wallet-dropdown, #portfolioCustomizeDropdown"
      );
      if (parentDropdown) {
        const arrow = parentDropdown.querySelector(
          ".arrow-icon, #portfolioCustomizeArrow"
        );
        if (arrow) arrow.classList.remove("open");
      }
    }
  });
};

// Table Action menu

document.addEventListener("DOMContentLoaded", function () {
  const actionMenu = document.createElement("div");
  actionMenu.className = "action-menu";
  actionMenu.style.display = "none";

  actionMenu.innerHTML = `
                  <a class="tx-history-button" href="#">Tx History</a>
                  <a class="share-button" href="#">Share</a>
                  <a class="hide-button" href="#">Hide</a>
                  <a class="burn-button" href="#">Burn</a>`;

  const actionMenuWrappers = document.querySelectorAll(".action-menu-wrapper");
  actionMenuWrappers.forEach((wrapper) => {
    wrapper.appendChild(actionMenu.cloneNode(true));

    wrapper.addEventListener("click", function (event) {
      // Close any other open menus
      actionMenuWrappers.forEach((otherWrapper) => {
        if (otherWrapper !== wrapper) {
          const otherMenu = otherWrapper.querySelector(".action-menu");
          otherMenu.style.display = "none";
        }
      });

      const menu = this.querySelector(".action-menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
      event.stopPropagation();
    });
  });

  // Close the menu when clicking outside
  document.addEventListener("click", function (event) {
    actionMenuWrappers.forEach((wrapper) => {
      const menu = wrapper.querySelector(".action-menu");
      if (!wrapper.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
      }
    });
  });
});

// Modals

//Trade Modal

document.addEventListener("DOMContentLoaded", function () {
  // Modal Elements
  const tradeModalOverlay = document.getElementById("tradeModalOverlay");
  const buyButton = document.getElementById("buyButton");
  const sellButton = document.getElementById("sellButton");
  const amountInput = document.getElementById("amountInput");
  const quickActionButton = document.getElementById("quickActionButton");
  const pnlBtnIcon = document.querySelector(".change-pnl-icon");
  const pnlText = document.querySelector(".change-pnl");
  const firstInnerContent = document.querySelector(".first-inner-content");
  const secondInnerContent = document.querySelector(".second-inner-content");
  const seeTransactionText = document.querySelector(".see-transaction");
  const sendingLabelText = document.querySelector(".sending-label");
  const receivingLabelText = document.querySelector(".receiving-label");
  const cancelButton = document.querySelector(".cancel-btn");
  const confirmButton = document.querySelector(".confirm-btn");
  const doneButton = document.querySelector(".done-btn");
  const cancelConfirmWrapper = document.querySelector(
    ".cancel-confirm-btn-wrapper"
  );

  let currentMode = "buy";

  quickActionButton.addEventListener("click", function () {
    firstInnerContent.style.display = "none";
    secondInnerContent.style.display = "block";

    quickActionButton.style.display = "none";
    cancelConfirmWrapper.style.display = "flex";
  });

  cancelButton.addEventListener("click", function () {
    resetModalState();
  });

  confirmButton.addEventListener("click", function () {
    cancelButton.setAttribute("disabled", true);
    confirmButton.setAttribute("disabled", true);
    cancelButton.classList.add("disabled");
    confirmButton.classList.add("disabled");
    setTimeout(() => {
      cancelConfirmWrapper.style.display = "none";
      doneButton.style.display = "block";
      cancelButton.removeAttribute("disabled", true);
      confirmButton.removeAttribute("disabled", true);
      cancelButton.classList.remove("disabled");
      confirmButton.classList.remove("disabled");
      seeTransactionText.style.display = "Flex";

      sendingLabelText.innerHTML = `You Sent <span><img src="../public/images/check-mark-round.svg" alt="Check-mark-icon" /></span>`;
      sendingLabelText.style.color = "var(--textPositiveSecondary)";

      receivingLabelText.innerHTML = `You Received <span><img src="../public/images/check-mark-round.svg" alt="Check-mark-icon" /></span>`;
      receivingLabelText.style.color = "var(--textPositiveSecondary)";
    }, 2000);
  });

  doneButton.addEventListener("click", function () {
    closeModal();
  });

  function resetModalState() {
    firstInnerContent.style.display = "block";
    secondInnerContent.style.display = "none";

    quickActionButton.style.display = "flex";
    cancelConfirmWrapper.style.display = "none";
    doneButton.style.display = "none";

    seeTransactionText.style.display = "none";

    sendingLabelText.innerHTML = "You're Sending";
    sendingLabelText.style.color = "";

    receivingLabelText.innerHTML = "To Receive";
    receivingLabelText.style.color = "";
  }

  function closeModal() {
    resetModalState();
    tradeModalOverlay.classList.remove("active");
  }

  //change text to pnl from 24h change

  pnlBtnIcon.addEventListener("click", () => {
    if (pnlText.innerText.toLowerCase() == "pnl") {
      pnlText.innerText = "24h Change";
    } else {
      pnlText.innerText = "PnL";
    }
  });

  function openModal() {
    resetModalState();
    tradeModalOverlay.classList.add("active");
    updateButtonDisplay(currentMode);
  }

  function closeModal() {
    tradeModalOverlay.classList.remove("active");
  }

  function updateButtonDisplay(mode) {
    const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
    const isToggleChecked = quickBuyToggleBtn && quickBuyToggleBtn.checked;

    if (mode === "buy") {
      buyButton.classList.remove("button-inactive");
      buyButton.classList.add("buy-active");
      sellButton.classList.remove("sell-active");
      sellButton.classList.add("button-inactive");
      quickActionButton.classList.remove("sell-active");
      quickActionButton.classList.add("buy-active");

      if (isToggleChecked) {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
          </figure>
          Review Buy TOKEN
        `;
      } else {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/zap-icon.svg" alt="zap-icon" />
          </figure>
          Quick Buy TOKEN
        `;
      }

      amountInput.placeholder = "Amount to Buy (XRP)";
    } else {
      sellButton.classList.remove("button-inactive");
      sellButton.classList.add("sell-active");
      buyButton.classList.remove("buy-active");
      buyButton.classList.add("button-inactive");
      quickActionButton.classList.remove("buy-active");
      quickActionButton.classList.add("sell-active");

      if (isToggleChecked) {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/arrow-icon.svg" alt="arrow-icon" />
          </figure>
          Review Sell TOKEN
        `;
      } else {
        quickActionButton.innerHTML = `
          <figure>
            <img src="./public/images/zap-icon.svg" alt="zap-icon" />
          </figure>
          Quick Sell TOKEN
        `;
      }

      amountInput.placeholder = "Amount to Sell (XRP)";
    }
  }

  function setMode(mode) {
    currentMode = mode;
    updateButtonDisplay(mode);
  }

  function setAmount(xrp) {
    amountInput.value = xrp;
  }

  const quickBuyToggleBtn = document.getElementById("quickBuyToggleBtn");
  if (quickBuyToggleBtn) {
    quickBuyToggleBtn.addEventListener("change", function () {
      updateButtonDisplay(currentMode);
    });
  }

  document.querySelectorAll(".trade-button").forEach((tradeButton) => {
    tradeButton.addEventListener("click", openModal);
  });

  // Close modal when clicking outside
  tradeModalOverlay.addEventListener("click", function (event) {
    if (event.target === tradeModalOverlay) {
      closeModal();
    }
  });

  const presetCustomizeButton = document.querySelector(".preset-customize-btn");
  const presetInputs = document.querySelectorAll(".preset-btn");
  const mainAmountInput = document.querySelector(".amount-input");

  let isEditMode = false;
  let originalIcon = presetCustomizeButton.querySelector("img").src;

  presetInputs.forEach((input) => {
    let parentWrapper = input.closest(".preset-btn-wrapper");
    if (parentWrapper) {
      let initialValue = input.placeholder || "0";
      parentWrapper.setAttribute("data-value", initialValue);
    }
  });

  presetCustomizeButton.addEventListener("click", function () {
    isEditMode = !isEditMode;

    presetInputs.forEach((input) => {
      if (isEditMode) {
        input.removeAttribute("readonly");
        input.classList.add("editable");
        input.style.backgroundColor = "var(--bgDefaultPrimary)";
      } else {
        input.setAttribute("readonly", "true");
        input.classList.remove("editable");
        input.style.backgroundColor = "";

        let parentWrapper = input.closest(".preset-btn-wrapper");
        if (parentWrapper) {
          parentWrapper.setAttribute(
            "data-value",
            input.value || input.placeholder
          );
        }
      }
    });

    // Change button icon
    if (isEditMode) {
      presetCustomizeButton.classList.add("active");
      presetCustomizeButton.querySelector("img").src =
        "./public/images/check-mark-white.svg"; // Change to tick icon
      presetCustomizeButton.style.backgroundColor = "var(--bgBrandDefault)";
    } else {
      presetCustomizeButton.classList.remove("active");
      presetCustomizeButton.querySelector("img").src = originalIcon;
      presetCustomizeButton.style.backgroundColor = "";
    }
  });

  document.querySelectorAll(".preset-btn-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
      if (!isEditMode) {
        let storedValue = wrapper.getAttribute("data-value");
        if (storedValue) {
          mainAmountInput.value = storedValue;
        }
      }
    });
  });

  const portfolioModalWalletDropdown = document.getElementById(
    "portfolioModalWalletDropdown"
  );
  const modalWalletOptions = document.getElementById(
    "portfolioModalWalletOptions"
  );
  const modalArrow = document.getElementById("modalWalletArrow");
  const selectedWalletOption = document.getElementById(
    "selected-modal-wallet-option"
  );

  if (portfolioModalWalletDropdown) {
    portfolioModalWalletDropdown.addEventListener("click", function (event) {
      event.stopPropagation();

      if (modalWalletOptions) {
        if (modalWalletOptions.style.display === "block") {
          modalWalletOptions.style.display = "none";
          modalWalletOptions.classList.remove("show");
          if (modalArrow) modalArrow.classList.remove("open");
        } else {
          modalWalletOptions.style.display = "block";
          modalWalletOptions.classList.add("show");
          if (modalArrow) modalArrow.classList.add("open");
        }
      }
    });
  }

  function selectWalletOption(walletName) {
    if (selectedWalletOption) {
      selectedWalletOption.textContent = walletName;
    }

    if (modalWalletOptions) {
      modalWalletOptions.style.display = "none";
      modalWalletOptions.classList.remove("show");
      if (modalArrow) modalArrow.classList.remove("open");
    }
  }

  if (modalWalletOptions) {
    modalWalletOptions.addEventListener("click", function (event) {
      event.stopPropagation();

      if (event.target.type === "checkbox") {
        const checkboxes = this.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });

        event.target.checked = true;

        // Update selected text with wallet name
        const walletName = event.target
          .closest(".option")
          ?.querySelector(".wallet-name");
        if (walletName) {
          selectWalletOption(walletName.textContent);
        }
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (
      portfolioModalWalletDropdown &&
      !portfolioModalWalletDropdown.contains(event.target)
    ) {
      if (modalWalletOptions) {
        modalWalletOptions.style.display = "none";
        modalWalletOptions.classList.remove("show");
      }
      if (modalArrow) {
        modalArrow.classList.remove("open");
      }
    }
  });

  // Initialize with buy mode
  setMode("buy");

  // Make functions available globally
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.setMode = setMode;
  window.setAmount = setAmount;
});

// Trade Modal

// Share Modal

const modal = document.getElementById("modal-share");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".share-button").forEach((shareButton) => {
    shareButton.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Close share modal when clicking the close button
document.querySelectorAll(".close-share-modal").forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

// Share Modal

// History Modal

const historyModal = document.querySelector(".history-modal-overlay");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tx-history-button").forEach((openModalButton) => {
    openModalButton.addEventListener("click", () => {
      historyModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });
});

document.querySelectorAll(".close-button").forEach((closeModalBtn) => {
  closeModalBtn.addEventListener("click", () => {
    historyModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
});

window.addEventListener("click", (e) => {
  if (e.target === historyModal) {
    historyModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// History Modal

// Modals
