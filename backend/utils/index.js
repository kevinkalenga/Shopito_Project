const Product = require("../models/productModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Calculate total price 

const calculateTotalPrice = (products, cartItems) => {
    let totalPrice = 0;

    cartItems.forEach(function (cartItem) {
       const product = products.find(function (product) {
          return product._id?.toString() === cartItem._id;
       })

       if(product) {
         const quantity = cartItem.quantity ?? cartItem.cartQuantity;
         const price = parseFloat(product.price);
         totalPrice += quantity * price;
       }
    });

    return totalPrice * 100;
}

// const calculateWalletTotalPrice = (products, cartItems) => {
//   let totalPrice = 0;

//   cartItems.forEach(function (cartItem) {

//     const product = products.find(function (product) {
//       return product._id?.toString() === cartItem._id;
//     });

//     if (product) {

//       const quantity =
//         cartItem.quantity ?? cartItem.cartQuantity;

//       const price = parseFloat(product.price);

//       totalPrice += quantity * price;
//     }
//   });

//   return totalPrice;
// };


const calculateWalletTotalPrice = (products, cartItems) => {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {

    const product = products.find((product) => {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {

      const quantity =
        cartItem.quantity ?? cartItem.cartQuantity;

      const price = parseFloat(product.price);

      console.log("WALLET ITEM:", {
        product: product._id,
        name: product.name,
        price,
        quantity,
        subtotal: price * quantity
      });

      totalPrice += price * quantity;
    }
  });

  console.log("WALLET TOTAL:", totalPrice);

  return totalPrice;
};

const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
     return {
        updateOne: {
            filter: {
                _id: product._id
            },
            update: {
                $inc:{
                    quantity: -product.cartQuantity,
                    sold: +product.cartQuantity
                }
            }
        }
      
     }
  })
    await Product.bulkWrite(bulkOption, {});
}


const calculateFlutterwaveTotalPrice = (products, cartItems) => {
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
        const product = products.find(
            (product) => product._id?.toString() === cartItem._id
        );

        if (product) {
            const quantity = cartItem.quantity ?? cartItem.cartQuantity;
            const price = parseFloat(product.price);

            totalPrice += quantity * price;
        }
    });

    return totalPrice;
};

module.exports = {
    calculateTotalPrice,
    updateProductQuantity,
    calculateFlutterwaveTotalPrice,
    stripe,
    calculateWalletTotalPrice
}