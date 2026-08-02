import React, { useEffect, useState } from "react";
import Card from "../../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCategories,
  updateCategory,
} from "../../../redux/features/categoryAndbrand/categoryAndbrandSlice";
import Loader from "../../loader/Loader";
import './Category.scss'

const EditCategory = () => {
  const [name, setName] = useState("");

  const { id } = useParams();

  const { isLoading, categories } = useSelector(
    (state) => state.category
  );

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const category = categories.find((cat) => cat._id === id);

    if (category) {
      setName(category.name);
    }
  }, [categories, id]);

  const saveCategory = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Category name must be at least 3 characters");
    }

    const formData = {
      name,
    };

      dispatch(updateCategory({ id, formData }))
      .unwrap()
      .then(() => {
        navigate("/admin/category");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>Edit Category</h3>

        <p>
          Use the form to <b>Edit Category.</b>
        </p>

        <Card cardClass={"card"}>
          <br />

          <form onSubmit={saveCategory}>
            <label>Category Name:</label>

            <input
              type="text"
              placeholder="Category name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="--my">
              <button
                type="submit"
                className="--btn --btn-primary"
              >
                Update Category
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditCategory;