import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../../redux/features/users/userSlice";
import Loader from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import './User.scss'
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";


const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const { isLoading, users } = useSelector((state) => state.user);

  useEffect(() => {
     console.log("Fetching users...");
    dispatch(getUsers());
  }, [dispatch]);

  console.log("USERS :", users);

  const editUser = (user) => {
     navigate(`/admin/edit-user/${user._id}`);
  };

  const confirmDelete = (id) => {

      confirmAlert({

        title: "Delete User",

        message: "Are you sure you want to delete this user?",

        buttons: [

          {
            label: "Delete",
            onClick: () => dispatch(deleteUser(id))
          },

          {
            label: "Cancel"
          }

        ]

      });

    };
  
  
  
  
  return (
    <>
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>All Users</h3>

        <div className="table">
          {users.length === 0 ? (
            <p>No Users Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={user.photo}
                        alt={user.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>
                    <td>
                      {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US")
                      : "-"}
                    </td>
                    <td>
                    <FaEdit
                      size={20}
                      color="green"
                      style={{
                        cursor: "pointer",
                        marginRight: "12px",
                      }}
                       onClick={() => editUser(user)}
                    />

                    <FaTrashAlt
                      size={20}
                      color="red"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => confirmDelete(user._id)}
                    />
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;