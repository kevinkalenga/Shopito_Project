import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register, RESET_AUTH } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, cPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isLoggedIn, isLoading } = useSelector(
    (state) => state.auth
  );

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cPassword) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (password !== cPassword) {
      return toast.error("Passwords don't match");
    }

    const userData = {
      name,
      email,
      password,
    };

    dispatch(register(userData));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }

    dispatch(RESET_AUTH());
  }, [isSuccess, isLoggedIn, dispatch, navigate]);

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={registerUser} noValidate>
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                onChange={handleInputChange}
              />

              <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={handleInputChange}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="cPassword"
                required
                value={cPassword}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="--btn --btn-primary --btn-block"
              >
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={loginImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;