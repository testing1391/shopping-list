// === DOM ELEMENTS ===
// These constants grab elements from the DOM by their ID
const itemForm = document.querySelector("#item-form"); // The form used to submit new items
const itemInput = document.querySelector("#item-input"); // The text input where users type new items
const itemList = document.querySelector("#item-list"); // The unordered list where items will be displayed
const clearBtn = document.querySelector("#clear"); // The "Clear All" button
const itemFilter = document.querySelector("#filter"); // The input field to filter/search through items

// === FUNCTION: Add Item to List ===
function onAddItemSubmit(e) {
  e.preventDefault(); // Prevents default form submission behavior (page reload)

  const newItem = itemInput.value.trim(); // Get value from input field and trim whitespace

  // Validate input: ensure it's not empty
  if (newItem === "") {
    console.log("Please add an item");
    return;
  }

  // Add new item to the DOM
  addItemToDOM(newItem);

  // Save item to localStorage
  addItemToStorage(newItem);

  // Update UI visibility (clear button, filter field, etc.)
  checkUI();

  // Clear input field after submission
  itemInput.value = "";
}

// === DOM: Create and Add Item to List ===
function addItemToDOM(item) {
  const li = document.createElement("li"); // Create new <li> element
  li.appendChild(document.createTextNode(item)); // Add item text to <li>

  const button = createButton("remove-item btn-link text-red"); // Create delete button
  li.appendChild(button); // Add delete button to <li>

  itemList.appendChild(li); // Add complete <li> to the list
}

// === STORAGE: Save Item to localStorage ===
function addItemToStorage(item) {
  let itemsFromStorage;

  // Get existing items from localStorage, or initialize an empty array
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  itemsFromStorage.push(item); // Add new item to array

  localStorage.setItem("items", JSON.stringify(itemsFromStorage)); // Save updated array to localStorage
}

// === UI: Create Delete Button with Icon ===
function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark"); // Create "X" icon (Font Awesome class)
  button.appendChild(icon);

  return button;
}

// === UI: Create Icon ===
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// === EVENT: Remove Single Item from List ===
function removeItem(e) {
  // Check if the clicked element is inside a "remove-item" button
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove(); // Remove the <li> element
    checkUI(); // Update UI (show/hide clear & filter if needed)
  }
}

// === EVENT: Clear All Items from List ===
function clearItems() {
  // Remove all <li> elements from the list using a while loop
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI(); // Update UI after clearing
}

// === EVENT: Filter List Items in Real Time ===
function filterItems(e) {
  const items = itemList.querySelectorAll("li"); // Get all <li> elements
  const text = e.target.value.toLowerCase(); // Get lowercase input from filter field

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    // Show item if it includes the filtered text, hide it otherwise
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}
// === UI: Check and Update Visibility of Clear and Filter Elements ===
function checkUI() {
  const items = document.querySelectorAll("li"); // Current list items

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// === EVENT LISTENERS ===
itemForm.addEventListener("submit", onAddItemSubmit); // When user submits form
itemList.addEventListener("click", removeItem); // When user clicks remove icon
clearBtn.addEventListener("click", clearItems); // When user clicks "Clear All"
itemFilter.addEventListener("input", filterItems); // When user types in filter field

// === INITIAL UI STATE ===
checkUI(); // Set initial state of UI based on whether there are any list items
