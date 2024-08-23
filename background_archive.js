import { Document, patchDocument, PatchType, TextRun } from "docx";

// Define constants
const API_KEY = "9C9CA46A-1005-4B81-9382-E8F77B99A6B6";
const USERNAME = "shop@dentrotec.de";
const PASSWORD = "Joshua*02+-";
const baseUrl = "https://app.billbee.io/api/v1/orders/";

// Adding a listener to the chrome.runtime.onMessage event "generateLabels".
// This event is triggered by the content.js when the button is clicked.
chrome.runtime.onMessage.addListener(
  async function (request, sender, sendResponse) {
    // Check if the message type is "generateLabels"
    if (request.type === "generateLabels") {
      // Generate the labels based on the selected orders
      await generateLabels(request.selectedOrderIDs);

      // Send a response back to the content.js
      sendResponse({ message: "Labels generated successfully" });
    }
  },
);

/**
Generate the labels based on the selected orders.

@param {Array<string>} selectedOrdersIDs - The selected order IDs.
@returns {Promise<boolean>} - The promise that resolves when the labels are generated.
*/
async function generateLabels(selectedOrdersIDs) {
  // Fetch the order details from the server
  let orderDetails = await fetchOrderDetails(selectedOrdersIDs);

  // Generate the patches for the document
  let patches = createPatches(orderDetails);

  // Create labels based on the patches
  let labels = [];
  patches.forEach((patch) => {
    patchLabel(patch);
  });

  // Download the patched document

  return true; // Return a promise that resolves when the labels are generated
}

/**
Function to fetch a single order from the server.

@param {Array<string>} selectedOrdersIDs - The selected order IDs.
@returns {Promise<Array>} - The promise that resolves with the order details stored as order object
*/
async function fetchSingleOrder(orderID) {
  // First, build the Headers object with the required headers
  let headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("X-Billbee-Api-Key", API_KEY);
  headers.set("Authorization", "Basic " + btoa(USERNAME + ":" + PASSWORD));

  //Create url (base url + order ids)
  let orderUrl = `${baseUrl}${orderID}`;

  // Fetch the order details for each selected order ID
  let response = await fetch(orderUrl, {
    method: "GET",
    headers: headers,
  });

  let data = await response.json();

  return data;
}

/**
Fetch details for multiple orders from the server.

@param {Array<string>} selectedOrdersIDs - The selected order IDs.
@returns {Array} - The promise that resolves with the order details stored as Array of objects

*/
async function fetchOrderDetails(selectedOrdersIDs) {
  // Fetch the order details for each selected order ID
  let orderDetails = await Promise.all(
    selectedOrdersIDs.map((orderID) => fetchSingleOrder(orderID)),
  );

  // Return the order details
  return orderDetails;
}

/**
 * Generates the labels based on the selected orders.
 *
 * @param {Object} patches - The patches to apply to the document.
 * @returns {Promise<Document>} - The promise that resolves when the document is patched and downloaded.
 */
async function patchLabel(patches) {
  try {
    // Fetch the DOCX template
    const response = await fetch("./templates/label_template.docx");
    if (!response.ok) {
      throw new Error("Failed to fetch template.docx");
    }
  } catch (error) {
    console.error("Error processing the document:", error);
  }

  const reader = new FileReader();
  reader.onload = async function (event) {
    console.log("File loaded successfully");
    const arrayBufferData = event.target.result;

    let nodebuffer = await patchDocument(arrayBufferData, {
      outputType: "nodebuffer",
      keepOriginalStyles: true, // Keep the original styles of the document template
      patches: patches,
    });

    new Document();

    console.log(doc);
    console.log(typeof doc);

    // patchDocument(arrayBufferData, {
    //   outputType: "nodebuffer",
    //   keepOriginalStyles: true, // Keep the original styles of the document template
    //   patches: patches,
    // }).then((nodebuffer) => {
    //   // Convert the nodebuffer to a Blob
    //   let blob = new Blob([nodebuffer], {
    //     type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    //   });
    //   // Creaet a new Document from the Blob
    //   let doc = new Document(blob);

    //   return doc;
    // });
  };

  let label = reader.readAsArrayBuffer(await response.blob());
  return label;
}

/**
 * Generates the patches for the document based on the order details.
 *
 * @param {Array} orderDetails - The order details as an array of objects.
 * @returns {Array} - The patches as an array of objects, whereby each object represents a document.
 */
function createPatches(orderDetails) {
  const patches = [];
  const replacements = [];

  // Loop through each order and generate the patches
  orderDetails.forEach((order) => {
    const orderData = order.Data;
    let orderNumber = orderData.OrderNumber;
    let orderItems = orderData.OrderItems;
    orderItems.forEach((item) => {
      // Get the product
      let quantity = item.Quantity.toString();
      let product = item.Product;

      // Create a dict for the replacement values from the order
      const replacement = {
        OrderNumber: orderNumber,
        SKU: product.SKU,
        Titel: product.Title,
        Quantity: quantity,
      };

      replacements.push(replacement);
    });
  });

  console.log(replacements);

  // Transform the replacements into patches
  replacements.forEach((replacement) => {
    // Create a new patch object for the order
    const transformed = {};

    for (const [key, value] of Object.entries(replacements)) {
      transformed[key] = {
        type: PatchType.PARAGRAPH,
        children: [new TextRun(value)],
      };
    }

    patches.push(createPatches(transformed));
  });

  // Return the patches
  return patches;
}

// Function to save the Blob as a file
function saveToFile(blob, filename) {
  // Convert Blob to a data URL
  const reader = new FileReader();
  reader.onload = function () {
    const dataUrl = reader.result;

    // Use the chrome.downloads API to download the file
    chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: true, // This prompts the user with a Save As dialog
    });
  };
  reader.readAsDataURL(blob);
}
