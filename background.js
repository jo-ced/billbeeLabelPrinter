import { fetchOrderDetails } from "./utils/fetch";
import { parseOrders } from "./utils/parse";
import { generateLabel } from "./utils/print";
// Define constants
const API_KEY = "9C9CA46A-1005-4B81-9382-E8F77B99A6B6";
const USERNAME = "shop@dentrotec.de";
const PASSWORD = "Joshua*02+-";
const baseUrl = "https://app.billbee.io/api/v1/orders/";

// Adding a listener to the chrome.runtime.onMessage event "generateLabels".
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if the message type is "generateLabels"
  if (request.type === "generateLabels") {
    // Generate the labels based on the selected orders
    generateLabels(request.selectedOrderIDs);

    // Send a response back to the content.js
    sendResponse({ message: "Labels generated successfully" });
  }
});

async function generateLabels(selectedOrdersIDs) {
  let orders = await fetchOrderDetails(selectedOrdersIDs);
  let labels = parseOrders(orders); // Array of arrays
  // For each order (level 1), generate a document of labels (level 2)
  let documents = labels.map((order) => generateLabel(order));
}

/*********************
FETCHING
*********************/

/*********************
UTILS
*********************/
/**
 * Transform the order items data to a format that can be used to generate labels
 * @param {Object} orderItem - The data of the order item
 * @returns {Array} - An object with the replacement data forr each order Item
 */
function transformOrderItem(orderItem) {}
