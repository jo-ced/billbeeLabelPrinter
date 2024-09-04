function parseOrder(order) {
  // Parse the order data to label data
  let items = order.OrderItems;

  let labels = items.map((item) => {
    let label = {
      RechnungsNr: order.InvoiceNumber,
      ArtikelName:
        item.Product.Title.length > 78
          ? item.Product.Title.substring(0, 75) + "..."
          : item.Product.Title,
      SKU: item.Product.SKU,
      Menge: item.Quantity.toString(),
      hasNext: item !== items[items.length - 1] ? true : false,
    };
    return label;
  });

  return labels;
}

function parseOrders(orders) {
  // Parse the orders data to label data
  let labels = orders.map((order) => parseOrder(order));

  return labels;
}

export { parseOrders };
