// Set constants
const API_KEY = "9C9CA46A-1005-4B81-9382-E8F77B99A6B6";
const USERNAME = "shop@dentrotec.de";
const PASSWORD = "Joshua*02+-";
const baseUrl = "https://app.billbee.io/api/v1/orders/";

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

async function fetchOrderDetails(selectedOrdersIDs) {
  // Fetch the order details for each selected order ID
  let orderDetails = await Promise.all(
    selectedOrdersIDs.map(
      async (orderID) => (await fetchSingleOrder(orderID)).Data,
    ),
  );

  // Return the order details
  return orderDetails;
}

export { fetchOrderDetails };
