const invoiceData = {
    sellerDetails: "Varadadri Silk Exports, 75, 3rd Cross, Labagh Road, BENGALURU, KARNATAKA, 560027, IN, PAN No: AACFV3252K, GST Registration No: 29AACFV3252K1ZY",
    billingDetails: "Madhu B, Eurofins IT Solutions India Pvt Ltd, 1st Floor, Maruti Platinum, Lakshminarayana Pura, ACCS Layout, BENGALURU, KARNATAKA, 560037, IN, State/UT Code: 29",
    shippingDetails: "Madhu B, Eurofins IT Solutions India Pvt Ltd, 1st Floor, Maruti Platinum, Lakshminarayana Pura, ACCS Layout, BENGALURU, KARNATAKA, 560037, IN, State/UT Code: 29",
    placeOfSupply: "KARNATAKA",
    placeOfDelivery: "KARNATAKA",
    orderNo: "403-3225714-7676307",
    orderDate: "28.10.2019",
    invoiceNo: "KIA3/05680562-1920",
    invoiceDate: "28.10.2019",
    reverseCharge: "No",
    items: [
        { description: "Arrow Woven Men's Formal Shirt (B45-42, Navy Blue)", unitPrice: 1299.00, quantity: 1, discount: 650.00, taxRate: 0.18 },
        { description: "Shipping Charges", unitPrice: 0.00, quantity: 0, discount: 0.00, taxRate: 0.18 }
    ],
    sellerName: "Varadadri Silk Exports"
};

function populateInvoice(data) {
    document.getElementById('invoice-no').innerText = data.invoiceNo;
    document.getElementById('invoice-date').innerText = data.invoiceDate;
    document.getElementById('order-no').innerText = data.orderNo;
    document.getElementById('order-date').innerText = data.orderDate;
    document.getElementById('place-of-supply').innerText = data.placeOfSupply;
    document.getElementById('place-of-delivery').innerText = data.placeOfDelivery;
    document.getElementById('reverse-charge').innerText = data.reverseCharge;
    document.getElementById('seller-details').innerText = data.sellerDetails;
    document.getElementById('billing-details').innerText = data.billingDetails;
    document.getElementById('shipping-details').innerText = data.shippingDetails;
    document.getElementById('seller-name').innerText = data.sellerName;

    const itemsList = document.getElementById('items-list');
    let totalAmount = 0;
    data.items.forEach((item, index) => {
        const netAmount = (item.unitPrice * item.quantity) - item.discount;
        const taxAmount = netAmount * item.taxRate;
        const total = netAmount + taxAmount;
        totalAmount += total;

        const row = document.createElement('tr');
        row.classList.add('item');
        if (index === data.items.length - 1) {
            row.classList.add('last');
        }

        row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.unitPrice.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.discount.toFixed(2)}</td>
            <td>${netAmount.toFixed(2)}</td>
            <td>${(item.taxRate * 100).toFixed(2)}%</td>
            <td>${taxAmount.toFixed(2)}</td>
            <td>${total.toFixed(2)}</td>
        `;
        itemsList.appendChild(row);
    });

    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
    document.getElementById('amount-in-words').innerText = numberToWords(totalAmount);
}

function numberToWords(amount) {
    // Implement a function to convert numbers to words
    // Placeholder for simplicity
    return "One Thousand One Hundred and Ninety-five only";
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.html(document.getElementById('invoice-box'), {
        callback: function (doc) {
            doc.save('invoice.pdf');
        },
        x: 10,
        y: 10
    });
}

populateInvoice(invoiceData);
