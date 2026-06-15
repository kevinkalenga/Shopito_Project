import styles from "./auth.module.scss";
import Card from "../../components/card/Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { isLoading, isResetSuccess } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(resetPassword({ token, newPassword }));

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
            </form>

            {isResetSuccess && (
              <p style={{ marginTop: "10px", color: "green" }}>
                Password reset successful! Redirecting...
              </p>
            )}
          </div>
        </Card>
      </section>
    </>
  );
};

export default ResetPassword;