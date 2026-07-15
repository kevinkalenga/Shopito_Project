import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  deleteBrand,
} from "../../../redux/features/categoryAndbrand/categoryAndbrandSlice";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BrandList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, brands } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  console.log("BRANDS :", brands);
  const editBrand = (brand) => {
    navigate(`/admin/brand/edit/${brand._id}`);
  };

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => dispatch(deleteBrand(slug)),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="--mb2">
        <h3>All Brands</h3>

        <div className="table">
          {brands.length === 0 ? (
            <p>No Brand Found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {brands.map((brand, index) => (
                  <tr key={brand._id}>
                    <td>{index + 1}</td>

                    <td>{brand.name}</td>

                    <td>{brand.category || "-"}</td>

                    <td>
                      <FaEdit
                        size={20}
                        color="green"
                        style={{ cursor: "pointer", marginRight: "12px" }}
                        onClick={() => editBrand(brand)}
                      />

                      <FaTrashAlt
                        size={20}
                        color="red"
                        style={{ cursor: "pointer" }}
                        onClick={() => confirmDelete(brand.slug)}
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

export default BrandList;