window.onload = function() {
            // 1. Get data from Local Storage
            const data = JSON.parse(localStorage.getItem('receipt_data'));
            
            if(!data) {
                document.body.innerHTML = "<h1>No Receipt Data Found</h1>";
                return;
            }

            // 2. Fill in the specific details
            document.getElementById('r-date').innerText = data.date;
            document.getElementById('r-time').innerText = data.time;    
            document.getElementById('r-id').innerText = "#" + data.id;
            document.getElementById('r-subtotal').innerText = "₹" + data.subtotal;
            document.getElementById('r-tax').innerText = "₹" + data.tax;
            document.getElementById('r-total').innerText = "₹" + data.grandTotal;

            // 3. Fill in the list of items
            const itemsContainer = document.getElementById('r-items');
            let itemsHTML = '';
            
            data.cart.forEach(item => {
                let itemTotal = item.price * item.quantity;
                itemsHTML += `
                    <tr>
                        <td>${item.quantity}</td>
                        <td>${item.name}</td>
                        <td class="text-right">${itemTotal}</td>
                    </tr>
                `;
            });
            itemsContainer.innerHTML = itemsHTML;

            // // 4. Auto Print and (Optional) Close
            // setTimeout(() => {
            //     // window.print();
            //     window.close(); // Uncomment if you want it to close automatically after printing
            // }, 5000);
        };