import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { login, RESET_AUTH } from "../../redux/features/auth/authSlice";
import { login} from "../../redux/features/auth/authSlice";
import { getCartDB } from "../../redux/features/cart/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = { email, password };

    dispatch(login(userData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartDB())
      navigate("/");
     
    }
    //  dispatch(RESET_AUTH());
  }, [isLoggedIn, navigate, dispatch]);

  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400" />
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Login</h2>

          <form onSubmit={loginUser} noValidate>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* 🔥 FORGOT PASSWORD LINK */}
          <div style={{ marginTop: "10px" }}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;