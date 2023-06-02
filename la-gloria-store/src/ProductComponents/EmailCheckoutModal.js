import React, { useState, useEffect } from "react";

function EmailCheckoutModal(props) {
  const [email, setEmail] = useState("");
  const { orderDetailList, show, handleClose } = props;

  const [shoppingCart, setShoppingCart] = useState({
    total_price: 0,
    date: "",
    client_id: null,
    order_details: [],
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const calculateTotalPrice = async () => {
    let totalPrice = 0;

    for (const orderDetail of orderDetailList) {
      const productId = orderDetail.product_id;
      const productAmount = orderDetail.product_amount;

      const response = await fetch(
        `https://la-gloria-store-algorithm-aces.vercel.app/rest/products/id/${productId}`
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        const product = jsonResponse.data;

        const price = product.price;
        const orderDetailPrice = price * productAmount;

        totalPrice += orderDetailPrice;
      }
    }

    return totalPrice;
  };

  const submitShoppingCart = async () => {
    const jsonBody = JSON.stringify(shoppingCart);
    console.log(jsonBody);
    try {
      const response = await fetch(
        "https://la-gloria-store-algorithm-aces.vercel.app/rest/shopping-carts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonBody,
        }
      );

      if (response.ok) {
        console.log("Shopping cart submitted successfully");
      } else {
        console.log("Failed to submit shopping cart");
      }
    } catch (error) {
      console.log("Error submitting shopping cart:", error);
    }
  };

  useEffect(() => {
    if (shoppingCart.order_details.length > 0) {
      submitShoppingCart();
    }
  }, [shoppingCart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://la-gloria-store-algorithm-aces.vercel.app/rest/clients/email/${email}`
    );

    if (response.ok) {
      const client = await response.json();
      const clientId = client.data.id;

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split("T")[0];

      const totalPrice = await calculateTotalPrice();

      const updatedShoppingCart = {
        ...shoppingCart,
        total_price: totalPrice,
        client_id: clientId,
        date: formattedDate,
        order_details: orderDetailList,
      };
      setShoppingCart(updatedShoppingCart);

      handleClose();
    } else {
      console.log("Email not found");
    }
  };

  return (
    <div
      className={`modal ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Checkout</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailCheckoutModal;
