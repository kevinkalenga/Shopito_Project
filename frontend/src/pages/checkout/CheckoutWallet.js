import React from "react";
import styles from "../../components/checkout/checkoutForm/CheckoutForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { selectUser } from "../../redux/features/auth/authSlice";

import {
  selectCartItems,
  selectCartTotalAmount,
  CLEAR_CART,
} from "../../redux/features/cart/cartSlice";

import {
  selectPaymentMethod,
  selectShippingAddress,
} from "../../redux/features/checkout/checkoutSlice";

import {
  payWithWallet,
} from "../../redux/features/order/orderSlice";

import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkout/checkoutSummary/CheckoutSummary";
import { Spinner } from "../../components/loader/Loader";

import mcImg from "../../assets/mc_symbol.png";

const CheckoutWallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =====================================================
  // SELECTORS
  // =====================================================

  const user = useSelector((state) => state.auth.user);

  const cartTotalAmount = useSelector(
    selectCartTotalAmount
  );

  const cartItems = useSelector(
    selectCartItems
  );

  const shippingAddress = useSelector(
    selectShippingAddress
  );

  const paymentMethod = useSelector(
    selectPaymentMethod
  );

  const { coupon } = useSelector(
    (state) => state.coupon
  );

  const {
    isLoading,
  } = useSelector(
    (state) => state.order
  );


  // =====================================================
  // WALLET BALANCE
  // =====================================================

  const walletBalance = Number(
    user?.balance || 0
  );

  const displayCartAmount = Number(
    cartTotalAmount || 0
  );


  // =====================================================
  // CHECK WALLET BALANCE
  // =====================================================

  const hasEnoughBalance =
    walletBalance >= displayCartAmount;


  // =====================================================
  // PAYMENT
  // =====================================================

  const makePayment = async () => {

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (displayCartAmount <= 0) {
      toast.error("Cart amount is zero");
      return;
    }

    if (!shippingAddress) {
      toast.error(
        "Please provide a shipping address"
      );
      return;
    }

    try {

      const formData = {
        items: cartItems,
        cartItems,
        shippingAddress,
        coupon:
          coupon != null
            ? coupon
            : { name: "nil" },
      };

      console.log(
        "========== WALLET PAYMENT =========="
      );

      console.log(
        "Sending:",
        formData
      );

      const result = await dispatch(
        payWithWallet(formData)
      ).unwrap();

      console.log(
        "========== WALLET PAYMENT SUCCESS =========="
      );

      console.log(result);

      // Clear cart only after
      // successful payment
      dispatch(CLEAR_CART());

      toast.success(
        result?.message ||
        "Payment successful"
      );

      navigate("/checkout-success");

    } catch (error) {

      console.error(
        "========== WALLET PAYMENT ERROR =========="
      );

      console.error(error);

      toast.error(
        error?.message ||
        error ||
        "Wallet payment failed"
      );
    }
  };


  // =====================================================
  // GO TO WALLET
  // =====================================================

  const goToWallet = () => {
    navigate("/wallet");
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      <section>
        <div
          className={`container ${styles.checkout}`}
        >

          <h2>Checkout</h2>

          <form
            onSubmit={(e) =>
              e.preventDefault()
            }
          >

            {/* =========================================
                CHECKOUT SUMMARY
            ========================================= */}

            <div>
              <Card
                cardClass={styles.card}
              >
                <CheckoutSummary />
              </Card>
            </div>


            {/* =========================================
                WALLET PAYMENT
            ========================================= */}

            <div>
              <Card
                cardClass={`${styles.card} ${styles.pay}`}
              >

                <h3>
                  Shopito Wallet Checkout
                </h3>


                {/* WALLET INFO */}

                <div className="wallet-info --card --mr">

                  <span className="--flex-between">

                    <p>
                      Account Balance
                    </p>

                    <img
                      src={mcImg}
                      alt="Wallet"
                      width={50}
                    />

                  </span>

                  <h4>
                    {walletBalance.toFixed(2)} $
                  </h4>

                </div>


                <br />


                {/* =====================================
                    ENOUGH BALANCE
                ===================================== */}

                {hasEnoughBalance ? (

                  <>

                    {isLoading ? (

                      <Spinner />

                    ) : (

                      <button
                        type="button"
                        className={styles.button}
                        onClick={makePayment}
                      >
                        Pay Now
                      </button>

                    )}

                  </>

                ) : (

                  /* ===================================
                     INSUFFICIENT BALANCE
                  =================================== */

                  <div className="--center-all">

                    <h4>
                      Insufficient Balance!!!
                    </h4>

                    <button
                      type="button"
                      className="--btn --btn-danger --btn-block"
                      onClick={goToWallet}
                    >
                      Top Up Wallet
                    </button>

                  </div>

                )}

              </Card>
            </div>

          </form>

        </div>
      </section>
    </>
  );
};

export default CheckoutWallet;