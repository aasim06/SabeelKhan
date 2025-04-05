// // Load saved data from localStorage
// let salesData = JSON.parse(localStorage.getItem('salesData')) || [];

// // Set currency symbol and format for Pakistani Rupees
// const CURRENCY_SYMBOL = "₨"; // Pakistani Rupees symbol

// // Function to add a new sale
// function addSale(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get input values
//     const clientName = document.getElementById('clientName').value;
//     const clientNumber = document.getElementById('clientNumber').value;
//     const glassWidth = parseFloat(document.getElementById('glassWidth').value);
//     const glassHeight = parseFloat(document.getElementById('glassHeight').value);
//     const pricePerSqFeet = parseFloat(document.getElementById('pricePerSqFeet').value);
//     const paymentStatus = document.getElementById('paymentStatus').value;
//     const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0; // Default to 0 if empty
//     const saleDate = new Date().toLocaleString(); // Current date and time

//     // Validate input values
//     if (!clientName || !clientNumber || isNaN(glassWidth) || isNaN(glassHeight) || isNaN(pricePerSqFeet)) {
//         alert("Please fill all fields with valid data.");
//         return;
//     }

//     // Calculate glass area in square inches
//     const glassAreaSqIn = glassWidth * glassHeight;

//     // Convert area to square feet (1 sq. ft = 144 sq. in)
//     const glassAreaSqFt = glassAreaSqIn / 144;

//     // Calculate total price
//     const totalPrice = glassAreaSqFt * pricePerSqFeet;

//     // Calculate remaining balance
//     const remainingBalance = totalPrice - amountPaid;

//     // Create a new sale object
//     const sale = {
//         clientName,
//         clientNumber,
//         glassWidth,
//         glassHeight,
//         glassAreaSqIn,
//         glassAreaSqFt,
//         pricePerSqFeet,
//         totalPrice,
//         paymentStatus,
//         amountPaid,
//         remainingBalance,
//         saleDate
//     };

//     // Add the sale to the array
//     salesData.push(sale);

//     // Save the updated data to localStorage
//     localStorage.setItem('salesData', JSON.stringify(salesData));

//     // Clear the form
//     document.getElementById('salesForm').reset();

//     // Refresh the table and total sales
//     displaySales();
// }

// // Function to display sales in the table
// function displaySales() {
//     const tableBody = document.querySelector('#salesTable tbody');
//     tableBody.innerHTML = ''; // Clear existing rows

//     let totalSales = 0;

//     // Loop through salesData and add rows to the table
//     salesData.forEach((sale, index) => {
//         // Validate numeric properties
//         if (
//             isNaN(sale.glassAreaSqIn) ||
//             isNaN(sale.glassAreaSqFt) ||
//             isNaN(sale.pricePerSqFeet) ||
//             isNaN(sale.totalPrice)
//         ) {
//             console.error("Invalid sale data:", sale);
//             return; // Skip this sale
//         }

//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${sale.clientName}</td>
//             <td>${sale.clientNumber}</td>
//             <td>${sale.glassWidth}</td>
//             <td>${sale.glassHeight}</td>
//             <td>${sale.glassAreaSqIn.toFixed(2)}</td>
//             <td>${sale.glassAreaSqFt.toFixed(2)}</td>
//             <td>${CURRENCY_SYMBOL}${sale.pricePerSqFeet.toFixed(2)}</td>
//             <td>${CURRENCY_SYMBOL}${sale.totalPrice.toFixed(2)}</td>
//             <td>${CURRENCY_SYMBOL}${sale.amountPaid.toFixed(2)}</td>
//             <td>${CURRENCY_SYMBOL}${sale.remainingBalance.toFixed(2)}</td>
//             <td>${sale.paymentStatus}</td>
//             <td>${sale.saleDate}</td>
//             <td><button onclick="editSale(${index})" class="btn btn-sm btn-warning">Edit</button></td>
//             <td><button onclick="deleteSale(${index})" class="btn btn-sm btn-danger">Delete</button></td>
//         `;
//         tableBody.appendChild(row);

//         // Add to total sales
//         totalSales += sale.totalPrice;
//     });

//     // Update total sales display
//     document.getElementById('totalSales').textContent = totalSales.toFixed(2);

//     // Update total pending payments
//     document.getElementById('totalPending').textContent = calculatePendingPayments();
// }

// // Function to edit a sale
// function editSale(index) {
//     const sale = salesData[index];

//     // Populate the form with the selected sale's data
//     document.getElementById('clientName').value = sale.clientName;
//     document.getElementById('clientNumber').value = sale.clientNumber;
//     document.getElementById('glassWidth').value = sale.glassWidth;
//     document.getElementById('glassHeight').value = sale.glassHeight;
//     document.getElementById('pricePerSqFeet').value = sale.pricePerSqFeet;
//     document.getElementById('paymentStatus').value = sale.paymentStatus;
//     document.getElementById('amountPaid').value = sale.amountPaid;
//     document.getElementById('remainingBalance').value = sale.remainingBalance;

//     // Remove the old sale from the array
//     salesData.splice(index, 1);

//     // Save the updated data to localStorage
//     localStorage.setItem('salesData', JSON.stringify(salesData));

//     // Refresh the table
//     displaySales();
// }

// // Function to delete a sale
// function deleteSale(index) {
//     // Remove the sale from the array
//     salesData.splice(index, 1);

//     // Save the updated data to localStorage
//     localStorage.setItem('salesData', JSON.stringify(salesData));

//     // Refresh the table
//     displaySales();
// }

// // Function to calculate total pending payments
// function calculatePendingPayments() {
//     const pendingSales = salesData.filter(sale => sale.paymentStatus === 'Pending' || sale.paymentStatus === 'Partial');
//     const totalPending = pendingSales.reduce((sum, sale) => sum + sale.remainingBalance, 0);
//     return totalPending.toFixed(2);
// }

// // Function to export sales data to CSV
// function exportToCSV() {
//     if (salesData.length === 0) {
//         alert("No data to export!");
//         return;
//     }

//     // Create CSV headers
//     const headers = [
//         "Client Name",
//         "Client Number",
//         "Glass Width (in)",
//         "Glass Height (in)",
//         "Area (sq. in)",
//         "Area (sq. ft)",
//         "Price per Sq. Ft",
//         "Total Price",
//         "Amount Paid",
//         "Remaining Balance",
//         "Payment Status",
//         "Date"
//     ];

//     // Create CSV rows
//     const rows = salesData.map(sale => [
//         sale.clientName,
//         sale.clientNumber,
//         sale.glassWidth,
//         sale.glassHeight,
//         sale.glassAreaSqIn.toFixed(2),
//         sale.glassAreaSqFt.toFixed(2),
//         sale.pricePerSqFeet.toFixed(2),
//         sale.totalPrice.toFixed(2),
//         sale.amountPaid.toFixed(2),
//         sale.remainingBalance.toFixed(2),
//         sale.paymentStatus,
//         sale.saleDate
//     ]);

//     // Combine headers and rows
//     const csvContent = [headers, ...rows]
//         .map(row => row.join(","))
//         .join("\n");

//     // Create a Blob and download the CSV file
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "sales_data.csv");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

// // Function to backup data as JSON
// function backupData() {
//     if (salesData.length === 0) {
//         alert("No data to backup!");
//         return;
//     }

//     const dataStr = JSON.stringify(salesData);
//     const blob = new Blob([dataStr], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.setAttribute("href", url);
//     link.setAttribute("download", "sales_backup.json");
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
// }

// // Function to restore data from JSON file
// function restoreData(event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         const data = JSON.parse(e.target.result);
//         salesData = data;
//         localStorage.setItem('salesData', JSON.stringify(salesData));
//         displaySales();
//         alert("Data restored successfully!");
//     };
//     reader.readAsText(file);
// }

// // Attach event listener to the form
// document.getElementById('salesForm').addEventListener('submit', addSale);

// // Display existing data on page load
// displaySales();