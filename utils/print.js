//Import
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

/**
Generates and downloads a label document for the given order

@param {Array} order - The data of the order
*/
function generateLabel(orderItems) {
  const templatePath = chrome.runtime.getURL("templates/label_template.docx");
  fetch(templatePath)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const zip = new PizZip(buffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      console.log(orderItems[0]);

      // Replace placeholders for all labels
      doc.render({ labels: orderItems });

      const output = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveToFile(
        output,
        "Nr_" + orderItems[0].RechnungsNr + "_labels" + ".docx",
      );
    });
}

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

export { generateLabel };
