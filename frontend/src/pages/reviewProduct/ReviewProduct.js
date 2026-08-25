import React, { useEffect, useState } from "react";
import "./ReviewProducts.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import StarRating from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReview,
  getProduct,
  reviewProduct,
  updateReview,
} from "../../redux/features/product/productSlice";
import { Spinner } from "../../components/loader/Loader";

const ReviewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [userReview, setUserReview] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { isLoading, product } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  // console.log(product)

  const changeStar = (newRating, name) => {
    setRate(newRating);
    console.table(newRating, name);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    if (rate === 0 || review === "") {
      return toast.error("Please enter rating and review");
    }

    const formData = {
      star: rate,
      review,
      reviewDate: date,
    };
    // console.log(formData)
    dispatch(reviewProduct({ id, formData }));
    navigate(-1);
  };

    // useEffect(() => {
    //   const reviewed = product?.ratings?.filter(
    //     (rev) => rev.user === user?._id
    //   );

    //   setUserReview(reviewed || []);
    // }, [product, user]);

    useEffect(() => {
      if (product?.ratings && user?._id) {
        setUserReview(product.ratings);
      } else {
        setUserReview([]);
      }
    }, [product, user]);

  const delReview = async () => {
    const formData = {
      userID: user?._id
    }
    dispatch(deleteReview({id, formData}))
    navigate(-1)
    
  };
  const startEdit = async () => {
    setIsEditing(true)
    setRate(userReview[0].star)
    setReview(userReview[0].review)
  };

  const editReview = async (e) => {
    e.preventDefault();
    
    const today = new Date();
    const date = today.toDateString();

    if (rate === 0 || review === "") {
      return toast.error("Please enter rating and review");
    }

    const formData = {
      star: rate,
      review,
      reviewDate: date,
      userID: userReview[0].user
    };
    // console.log(formData)
    dispatch(updateReview({ id, formData }));
    navigate(-1);
  };

  return (
    <section>
      <div className="container review">
        <h2>Review Products</h2>
        {isLoading && product === null ? (
          <Spinner />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product?.name}
            </p>
            <img
              src={product?.image[0]}
              alt="product"
              style={{ width: "100px" }}
            />
          </>
        )}
        {userReview?.length > 0 && !isEditing ? (
          <card cardClass={"card"}>
            <h3>Product Reviews</h3>
            <div>
              {userReview?.map((item, index) => {
                const { star, review, reviewDate, name } = item;

                return (
                  <div key={index} className="review --flex-between --p">
                    <div>
                      <StarRating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#F6B01E"
                        // starHoverColor="#F6B01E"
                        rating={star}
                        changeRating={changeStar}
                        editing={false}
                        isSelectable={true}
                      />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>By: {name}</b>
                      </span>
                    </div>
                    <div>
                    <FaEdit
                        color="green"
                        size={25}
                        onClick={() => startEdit()}
                      />
                      <BsTrash color="red" size={25} onClick={delReview} />
                    </div>
                  </div>
                );
              })}
            </div>
          </card>
        ) : (
          <card cardClass={"card --width-500px --p"}>
            <form style={{ width: "500px" }}>
              <label>Star Rating</label>
              <StarRating
                starDimension="20px"
                starSpacing="2px"
                starRatedColor="#F6B01E"
                starHoverColor="#F6B01E"
                rating={rate}
                changeRating={changeStar}
                editing={true}
                isSelectable={true}
              />
              <label>Review</label>
              <textarea
                value={review}
                required
                onChange={(e) => setReview(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              {!isEditing ? (
                <button
                  onClick={(e) => submitReview(e)}
                  className="--btn --btn-primary"
                >
                  Submit Review
                </button>
              ) : (
                <div className="--flex-start">
                  <button
                    onClick={(e) => editReview(e)}
                    className="--btn --btn-primary"
                  >
                    Update Review
                  </button>

                  <button onClick={() => setIsEditing(false)} className="--btn">
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </card>
        )}
      </div>
    </section>
  );
};

export default ReviewProduct;
