# shopping-list

Traversy Media Tutorial

# Video Notes

// 1. Add Items to List (DOM ONLY)
     - Create variables for form, input, list
     - Create event listener for add item button 
     - addItem(e) function
        prevents default form behavior (hence e)
        checks if input field is empty or not
        if not empty, create list element and button element (calls functions for those)

    - createButton(classes) function
        creates button for the list item and calls icon function (the button will have an icon instead of text)

    - createIcon(classes) function
        creates and returns icon (the 'X' icon)
    
// 2. Setting Up Git & Github (Optional)

// 3. Remove & Clear Items
    - create removeItem, clearItems event listener
    - create clearBtn variable
    - removeItem(e) function
        use e.target.classList.contains('remove-item) to ensure that the 'X' button was clicked by user
        remove li element by doing e.target.parentElement.parentElement.remove()

    - clearItems()
        while loop to clear all list items
    
// 4. Clear UI State
    - create items, itemFilter variable
    - create checkUI() function
        displays filter or clear button based on item length
        runs on page load, so have to add the function in other functions that causes changes in the list items
        define items variable within checkUI function, so it updates otherwise will be showing whatever it was on page load

// 5. Filter Items
    - create filterItems(e) event listener & function
        grab text via input (e.target.value)
        loop through items text
        indexOf checks if text matches item text

// 6. Local Storage Crash Course
    - localStorage.setItem('name', 'Dania') // set value w/key
    - localStorage.getItem('name') // get value w/key
    - localStorage.removeItem('name') // del item w/key
    - localStorage.clear() // clear all values

// 7. Add Items To Local Storage
    - change addItem to onAddItemSubmit function/event handler
    - create addItemToDOM(item) function
        move list item code from onAddItemSubmit(e) to addItemToDOM(item) function
    
    - onAddItemSubmit(e)
        call addItemToDOM(newItem) inside function

    - addItemToStorage(item) function
        checks if local storage is null (sets to empty array) or updates variable with current local storage items (then pushes new item into local storage)

// 8. Display Items From Local Storage
    - create getItemsFromStorage function
        - moved code from addItemFromStorage to     getItemsFromStorage, so it can be DRY
        - function call inside getItemsFromStorage
    - create displayItems() function
        call getItemsFromStorage (to save items to var)
        loop through items and call addItemToDOM(item)
    - add event listener for DOMContentLoaded (displayItems)
    - create init()
        cleans up global scope
        adds event listeners to DOM variables

// 9. Remove Items From Local Storage
    - changed removeItem to onClickItem (event listener)
    - add onClickItem function
    - add removeItemFromStorage(item)
    - deleted code in removeItem
    - updated code in removeItem(item)
    - add code in clearItems() to remove local storage items

// 10. Set Item To Edit
// 11.
// 12.
// 13.