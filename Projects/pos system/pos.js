const product = [
    {id: 'p1', name: 'pancake', image: 'https://kitchenfunwithmy3sons.com/wp-content/uploads/2022/06/fluffy-pancakes-feature.jpg', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p2', name: 'cheesecake', image: 'https://www.mybakingaddiction.com/wp-content/uploads/2022/08/plated-blueberry-cheesecake-hero.jpg', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p3', name: 'choco lava cake', image: 'https://images.getrecipekit.com/20250325120225-how-20to-20make-20chocolate-20molten-20lava-20cake-20in-20the-20microwave.png?width=650&quality=90&', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p4', name: 'ice cream sundae', image: 'https://www.homemadeinterest.com/wp-content/uploads/2017/02/Ice-Cream-Waffle-Sundae_featured.jpg', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p5', name: 'waffles', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBsQzYfonMgV354TmlJmkBA8KSxSHgui_WA&s', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p6', name: 'chocolate syrup', image: 'https://www.theflourhandprint.com/wp-content/uploads/2019/11/chocolate-syrup-recipe-12-500x500.jpg', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
     {id: 'p7', name: 'hot chocolate', image: 'https://www.allrecipes.com/thmb/lnb_004MI6wGuJXQ-uDxMUNZmQk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20211-creamy-hot-cocoa-DDMFS-4x3-ed6183b2bbb74bbba4a06a78e4d72350.jpg', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},
    {id: 'p8', name: 'marshmallow', image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1163514_11-86c1f82.jpg?quality=90&resize=440,400', info: 'soft and fluffy vanilla pancakes with maple syrup', price:'20'},  
];
let cart =[];
const container = document.getElementById('product-container');
 const cartContainer = document.getElementById('cart-container');

function emptie(){

    if(cart.length==0){
        cartContainer.innerHTML += '<p class = "ns"> Nothing To See Here Click the + icon to get started!</p>';
        
    }
}
function addproduct(products){
    const cardHTML = `
    <div class="card">
    <div class="card-top">
    <img class= "prod-img" src="${products.image}" alt="">
    </div>
    <div class="card-bottom">
    <p class = "itemName">${products.name}</p>
    <!----<p class="desc">${products.info}</p>------>
    <div class = "pricing">
    <p class="price">₹${products.price}</p>
    <p class="btn" onclick="addToCart('${products.id}')">+</p>
    </div>
    </div>
    </div>
    ` ;
    
    container.innerHTML += cardHTML;
}

function addCart(){
 cartContainer.innerHTML = '';

 let total = 0;

 cart.forEach(function(item){
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    const html = `
    <div class="cartTop">
     <div class="cart-item">
                <div class="cart-info">
                    <p class="prodname">${item.name}</p>
                    <p class="prodPrice">₹${item.price}</p>
                </div>
                <div class="itemPrice">
                    <div class = "change">
                    <p class="remove" onclick="removeCart('${item.id}')">-</P>
                    <p class = "itemQuantity"> x${item.quantity}</p>
                    <p class="add" onclick="addToCart('${item.id}')">+</P>
                     </div>
                    <p class="itemTotal">₹${itemTotal}</p>
                </div>
            </div>
            
    </div>
    `;
    cartContainer.innerHTML += html;

 });

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
}


function removeCart(productId){
let existingItem = cart.find(function(item){
    return String(item.id) === String( productId);
});
if(existingItem){
    existingItem.quantity--;
}
if(existingItem.quantity<1){
    let products = product.find(function(p){
        return String(p.id) === String(productId);
    });
    const index = cart.indexOf(existingItem);
    cart.splice(index,1);
}

addCart();
emptie();
}
emptie();
product.forEach(addproduct);