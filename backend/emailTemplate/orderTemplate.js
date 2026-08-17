const orderSuccessEmail = (name, cartItems) => {
  return {
    body: {
      name,

      intro: "Your order has been placed successfully.",

      table: {
        data: cartItems.map((item) => ({
          product: item.name,
          price: `$${item.price}`,
          quantity: item.cartQuantity,
          total: `$${item.price * item.cartQuantity}`,
        })),

        columns: {
          customWidth: {
            product: "40%",
          },
        },
      },

      action: {
        instructions:
          "You can check the status of your order and more in your dashboard:",

        button: {
          color: "#3869D4",
          text: "Go to Dashboard",
          link: "http://localhost:3000",
        },
      },

      outro: "We thank you for your purchase.",
    },
  };
};

module.exports = {
  orderSuccessEmail,
};


