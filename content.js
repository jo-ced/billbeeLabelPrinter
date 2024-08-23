// The content.js interacts directly with the webpage.
// It injects the button into the webpage and listens for the button click event.
// When the button is clicked, it sends a message to the background.js to generate the labels to be printed.

function injectButton() {
  // First, we need to find the iFrame that contains the order details
  let iFrame = document.querySelector("iframe");

  // If the iFrame is not found, return, else continue the search
  if (!iFrame) {
    return;
  }

  // Find the div where we'll inject the button --> it has the id: "actionbuttons"
  let actionButtons =
    iFrame.contentWindow.document.querySelector("#actionbuttons");

  // If the actionButtons div is not found, return, else continue
  if (!actionButtons) {
    return;
  }

  // Now we inject a new button("Print Labels") with the css class 'btn' into the actionButtons div
  let button = document.createElement("button");
  button.className = "btn";
  button.innerText = "Print Labels";
  button.addEventListener("click", triggerLabelGeneration);
  actionButtons.appendChild(button);

  // Remove the interval
  clearInterval(buttonSearch);
}

/**
The function called when the button is clicked.
It sends a message (type: "generate_labels") to the background.js to generate the labels.

@returns {void}
*/
async function triggerLabelGeneration() {
  // Get the selected order IDs
  let selectedOrderIDs = getSelectedOrderIDs();

  // Send a message to the background.js to generate the labels
  let response = await chrome.runtime.sendMessage({
    type: "generateLabels",
    selectedOrderIDs: selectedOrderIDs,
  });
}

/**
Get the selected order IDs from the order details page.
*
* @returns {Array<string>} - The selected order IDs.
*/
function getSelectedOrderIDs() {
  // Get the iFrame
  let iFrame = document.querySelector("iframe");

  // Now, get the order details 'grid'
  let odrderTable = iFrame.contentWindow.document.querySelector("#grid");

  // Get the selected rows (can be identified by the class 'success on the tr element)')
  let selectedRows = odrderTable.querySelectorAll("tr.success");

  // Now we get the order IDs from the selected rows (can be identified by the 'data-id' attribute on the tr element)
  let selectedOrderIDs = [];
  selectedRows.forEach((row) => {
    selectedOrderIDs.push(row.getAttribute("data-id"));
  });

  // Return the selected order IDs
  return selectedOrderIDs;
}

// Set an interval to check for the presence of the order details every second
let buttonSearch = setInterval(() => injectButton(), 1000);
