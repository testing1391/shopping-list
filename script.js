// === DOM ELEMENTS ===
// These constants grab elements from the DOM by their ID
const itemForm = document.querySelector("#item-form"); // The form used to submit new items
const itemInput = document.querySelector("#item-input"); // The text input where users type new items
const itemList = document.querySelector("#item-list"); // The unordered list where items will be displayed
const clearBtn = document.querySelector("#clear"); // The "Clear All" button
const itemFilter = document.querySelector("#filter"); // The input field to filter/search through items
const formBtn = itemForm.querySelector("button"); // Submit button for adding or updating items
let isEditMode = false; // flag to track whether list item is in edit mode

// === FUNCTION: Display Stored Items on Load ===
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

// === FUNCTION: Add Item to List ===
function onAddItemSubmit(e) {
  e.preventDefault(); // Prevents default form submission behavior (page reload)

  const newItem = itemInput.value.trim(); // Get value from input field and trim whitespace

  // Validate input: ensure it's not empty
  if (newItem === "") {
    console.log("Please add an item");
    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    // Removes item from local storage
    removeItemFromStorage(itemToEdit.textContent);

    // Removes edit mode class
    itemToEdit.classList.remove('edit-mode');

    // Removes item from DOM
    itemToEdit.remove();

    // isEditMode go back to false
    isEditMode = false;
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
  const itemsFromStorage = getItemsFromStorage();

  itemsFromStorage.push(item); // Add new item to array

  localStorage.setItem("items", JSON.stringify(itemsFromStorage)); // Save updated array to localStorage
}

// === STORAGE: Get Items from Local Storage ===
function getItemsFromStorage() {
  let itemsFromStorage;

  // Get existing items from localStorage, or initialize an empty array
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
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

// === EVENT: Remove or Edit Single Item from List ===
function onClickItem(e) {
  // Removes item if 'X' is clicked
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
  // Edit mode is triggered if clicked outside of 'X'
  else {
    setItemToEdit(e.target);
  }
}

// === FUNCTION: Edit Mode for Selected Item ===
function setItemToEdit(item) {
  isEditMode = true;

  // Remove edit mode for all items
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  // Adds edit mode class to selected item
  item.classList.add("edit-mode");

  // Update form button to indicate editing state
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";

  // Populate input field with the item's current text
  itemInput.value = item.textContent;
}

// === FUNCTION: Remove Item from DOM & Storage ===
function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();
  }

  // Remove Item from Storage
  removeItemFromStorage(item.textContent);

  // Update UI
  checkUI();
}

// === STORAGE: Remove ITem from Local Storage ===
function removeItemFromStorage(item) {
  // Retrieve items from local storage
  let itemsFromStorage = getItemsFromStorage();

  // Filter out removed item
  itemsFromStorage = itemsFromStorage.filter((i) => i != item);

  // Update & save local storage items
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// === EVENT: Clear All Items from List ===
function clearItems() {
  // Remove all <li> elements from the list using a while loop
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // Clear from local storage
  localStorage.removeItem("items");

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

  // Resets form button to "Add item" and disables edit mode
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor='#333';
  isEditMode = false;
}

// === INITIALIZE APP ===
function init() {
  // === EVENT LISTENERS ===
  itemForm.addEventListener("submit", onAddItemSubmit); // When user submits form
  itemList.addEventListener("click", onClickItem); // When user clicks on list items (edit mode or item deletion)
  clearBtn.addEventListener("click", clearItems); // When user clicks "Clear All"
  itemFilter.addEventListener("input", filterItems); // When user types in filter field
  document.addEventListener("DOMContentLoaded", displayItems); // Displays item(s) on page load

  checkUI();
}

init(); // created this function in order to clean up the global scope from clutter
