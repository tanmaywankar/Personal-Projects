window.onload = function() {
            // 1. Get data from Local Storage
            const data = JSON.parse(localStorage.getItem('receipt_data'));
            if(!data){
                alert("no data");
            }


        //item list loop
        document.getElementById('dT').innerText ="Date: "+data.date+" Time: "+data.time;
            const itemName = document.getElementById('pName');
            const itemQty = document.getElementById('pQuantity');
            const itemPrice = document.getElementById('pPrice');
            let itemNumber = document.getElementById('pNo');
            let nameText = '<p class="pHead">Name</p>';
            let qtyText = '<p class="pHead">Quant-ity</p>';
            let priceText = '<p class="pHead">Price \n <span class="noTax">(w/o tax)</span></p>';
            let numberText = '<p class="pHead">Sr No.</p>';
            let sno = 1;
        data.cart.forEach(item => {
            nameText += `
            <p class = "prodNames">${item.name}</p>
            `;
            qtyText += `
            <p class = "prodNames">x${item.quantity}</p>
            `;
            priceText += `
            <p class = "prodNames">${item.price}</p>
            `;
            numberText += `
            <p class = "prodNames">${sno}</p>
            `;
            sno++;
        });
        itemName.innerHTML = nameText;
        itemQty.innerHTML = qtyText;
        itemPrice.innerHTML = priceText;
        itemNumber.innerHTML = numberText;


        //final price code
        let subtotal = document.getElementById('st');
        let tax = document.getElementById('tx');
        let grandTotal = document.getElementById('tt');
        subtotal.innerText = "subtotal: ₹" + data.subtotal;
        tax.innerText = "tax(18%): ₹" + data.tax;
        grandTotal.innerText = "grand total: ₹" + data.grandTotal;
        };