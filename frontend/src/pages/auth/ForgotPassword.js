import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    dispatch(forgotPassword(email)) .unwrap()
    .then(() => {
      setEmail(""); 
     
    })
    .catch((err) => {
      toast.error(err);
    });;
  };



  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Forgot Password</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block">
                Send Reset Link
              </button>
            </form>

            {isSuccess && (
              <p style={{ marginTop: "10px", color: "green" }}>
                Reset link sent! Check email.
              </p>
            )}
          </div>
        </Card>
      </section>
    </>
  );
};

export default ForgotPassword;