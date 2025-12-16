
let cart = JSON.parse(localStorage.getItem('POS_cart')) || [];
const container = document.getElementById('product-container');
 const cartContainer = document.getElementById('cart-top');
const cartContainerBottom = document.getElementById('cart-bottom');
let delAll = document.getElementById("deleteAll");
delAll.addEventListener('click',deleteAll);

window.onload = addCart;
function addproduct(products){
    const cardHTML = `
    <div class="card" onclick="addToCart('${products.id}')">
    <div class="card-top">
    <img class= "prod-img" src="${products.image}" alt="">
    </div>
    <div class="card-bottom">
    <p class = "itemName">${products.name}</p>
    <!----<p class="desc">${products.info}</p>------>
    <div class = "pricing">
    <p class="price">₹${products.price}</p>
    <p class="btn")">+</p>
    </div>
    </div>
    </div>
    ` ;
    
    container.innerHTML += cardHTML;
}

function addCart() {
    // save to local storage
    localStorage.setItem('POS_cart', JSON.stringify(cart));
    // 1. Create a variable to hold the HTML string (instead of writing to the page immediately)
    let cartHTML = ''; 
    let total = 0;

    cart.forEach(function(item) {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        // 2. Add to our string variable (this is super fast)
        cartHTML += `
            <div class="cart-item">
                <div class="cart-info">
                    <p class="prodname">${item.name}</p>
                    <p class="prodPrice">₹${item.price}</p>
                </div>
                <div class="itemPrice">
                    <div class="change">
                        <p class="delete" onclick="deleteCart('${item.id}')"><i class="fa-solid fa-trash"></i></p>
                        <p class="remove" onclick="removeCart('${item.id}')">-</p>
                        
                        <input
                            type="number"
                            class="itemQuantity" 
                            value="${item.quantity}"
                            onchange="updateList('${item.id}',this.value)"
                        >
                        <p class="add" onclick="addToCart('${item.id}')">+</p>
                    </div>
                    <p class="itemTotal">₹${itemTotal}</p>
                </div>
            </div>`;
    });

    // 3. Update the actual page ONLY ONE TIME at the very end
    cartContainer.innerHTML = cartHTML;

    // The rest of your logic stays exactly the same
    if (cart.length > 0) {
        document.getElementById("total").innerHTML = `${total}`;
        let checkbtn = document.getElementById("checkbtn");
        checkbtn.style.pointerEvents = "auto";
        checkbtn.style.backgroundColor = "";
    } else {
        document.getElementById("total").innerHTML = `0`;
        let checkbtn = document.getElementById("checkbtn");
        checkbtn.style.pointerEvents = "none";
        checkbtn.style.backgroundColor = "#5f5f5f";
    }

    //makes the delete all button visible/invisible
        if(cart == ''){
        delAll.style.visibility="hidden";
    }
    else{
        delAll.style.visibility="visible";
    }
}


function addToCart(productId){
let existingItem = cart.find(function(item){
    return String(item.id) === String( productId);
});
if(existingItem){
    existingItem.quantity++;
}
else{
    let products = product.find(function(p){
        return String(p.id) === String(productId);
    });
    cart.push(
        {
            id: products.id,
            name: products.name,
            quantity:1,
            price: products.price,
        }
    );
}
// console.log(cart);
addCart();
qty.addEventListener('click', editQuantity);
}


function removeCart(productId){
let existingItem = cart.find(function(item){
    return String(item.id) === String( productId);
});
if(existingItem){
    existingItem.quantity--;
}
if(existingItem.quantity<1){
    const index = cart.indexOf(existingItem);
    cart.splice(index,1);
}

addCart();
}

function deleteCart(productId){
    const index = cart.findIndex(function(p){
        return p.id === productId;
    });

    if(index > -1){
        cart.splice(index, 1);
    }

    addCart();
}
// change quantity using text
function updateList(productId,newValue){
let numberQty = parseInt(newValue);
    const item = cart.find(function(p){
        return p.id === productId;
    });

if(numberQty > 0){


    if(item){
        item.quantity = numberQty;
        addCart();
    }
    else{
       addCart();
    }
}
else if(numberQty <= 0){
    alert("quantity cannot be less than one");
    item.quantity = 1;
    addCart();
}

}

function deleteAll(){
    let userConfirm = confirm("do you really want to delete all items from cart?");
    if(userConfirm){
        cart = [];
        addCart();
    }
        
}

// product.forEach(addproduct);

function renderProducts(productList){
 container.innerHTML = '';

 if(productList.length === 0){
    container.innerHTML = '<p class="ns">No items found</p>';
    return;
 }
 productList.forEach(addproduct);
}
renderProducts(product);

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input',function(e){
    const searchText = e.target.value.toLowerCase();

    const filteredList = product.filter(function(item){
        return item.name.toLowerCase().includes(searchText);
    });
    renderProducts(filteredList);
});