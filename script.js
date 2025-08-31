// Add Items to List
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === "") {
    console.log("Please add an item");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add to the DOM
  itemList.appendChild(li);
  itemInput.value = "";

  // Checks if list items are empty or not
  checkUI();
}

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

// Removes list Item if user clicks on 'X' icon
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();

    checkUI();
  }
}

// Clear Button functionality, using while loop which will run as long as there is a first child
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// Checks whether list items is empty; add function in areas where list item changes
function checkUI() {
    // define items here, not in global because it never updates if global
    const items = document.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    }
    else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }
}

// Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clearBtn.addEventListener("click", clearItems);

checkUI();