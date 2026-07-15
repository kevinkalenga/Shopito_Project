import React, { useState, useEffect } from "react";
import Card from "../../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../loader/Loader";

import {
  getBrands,
  updateBrand,
  getCategories,
} from "../../../redux/features/categoryAndbrand/categoryAndbrandSlice";

const EditBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
     dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const brand = brands.find((b) => b._id === id);

    if (brand) {
      setName(brand.name);
      setCategory(brand.category);
    }
  }, [brands, id]);

  const saveBrand = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      return toast.error("Brand must be at least 3 characters");
    }

    if (!category) {
      return toast.error("Please select a parent category");
    }

    const formData = {
      name,
      category,
    };

    dispatch(updateBrand({ id, formData }));
    navigate("/admin/brand");
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>Edit Brand</h3>
        <p>
          Use the form to <b>Update Brand.</b>
        </p>

        <Card cardClass={"card"}>
          <br />

          <form onSubmit={saveBrand}>
            <label>Brand Name:</label>

            <input
              type="text"
              placeholder="Brand name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Parent Category:</label>

            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="--my">
              <button className="--btn --btn-primary" type="submit">
                Update Brand
              </button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditBrand;