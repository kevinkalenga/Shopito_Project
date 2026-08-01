import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/features/users/userSlice";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";

const EditUser = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading } = useSelector(
    (state) => state.user
  );


  const [user, setUser] = useState(null);


  // Récupérer le user depuis Redux
  useEffect(() => {

    const currentUser = users.find(
      (user) => user._id === id
    );

    if (currentUser) {
      setUser(currentUser);
    }

  }, [id, users]);



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });

  };



  const saveUser = async (e) => {

    e.preventDefault();

    if (!user) return;


    const userData = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      photo: user.photo,
      address: user.address,
    };


    const result = await dispatch(
      updateUser({
        id,
        userData
      })
    );


    if (updateUser.fulfilled.match(result)) {

      toast.success("User updated successfully");

      navigate("/admin/user");

    }

  };



  return (

    <section>
      <div className="container">

        {isLoading && <Loader />}


        <h3 className="--mt">
          Edit User
        </h3>


        {user && (

          <form
            onSubmit={saveUser}
            className="card"
          >


            <label>Name</label>

            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleInputChange}
            />



            <label>Email</label>

            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleInputChange}
            />



            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleInputChange}
            />



            <label>Photo URL</label>

            <input
              type="text"
              name="photo"
              value={user.photo || ""}
              onChange={handleInputChange}
            />



            <label>Role</label>

            <select
              name="role"
              value={user.role}
              onChange={handleInputChange}
            >

              <option value="customer">
                Customer
              </option>

              <option value="admin">
                Admin
              </option>

            </select>



            <button
              type="submit"
              className="--btn --btn-primary"
            >
              Update User
            </button>


          </form>

        )}

      </div>
    </section>

  );
};


export default EditUser;