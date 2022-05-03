import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReviewList } from "./reviewList.jsx";
import { getReviews, addReview } from "../../../api/accountApi.js";
import { ListingForm } from "./listingForm";
import farm1 from "../../../images/1.jpg";
import farm2 from "../../../images/2.jpg";
import farm3 from "../../../images/3.jpg";
import farm4 from "../../../images/4.jpg";
import farm5 from "../../../images/5.jpg";

export const ListingView = (account) => {
  var farms = {'farm1':farm1, 'farm2':farm2, 'farm3':farm3, 'farm4':farm4, 'farm5':farm5};
    const location = useLocation();
    const [listing, setListing] = useState(location.state.from.listing);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews(listing.ID).then(x =>
        {
          setReviews(x[0]);
        }
        );
      }, []);

    // const onReviewAdded = (review) => {
    //   console.log(review);
    //   // let _reviews = {...reviews};
    //   // _reviews.push(review);
    //   // setReviews(_reviews);
    //   // addReview(review);
    // }

    const newReview = ( review ) => {
      console.log(review);
    // var tempProduct = {...product};
    // tempProduct.reviews.push(review);
    // addReview(tempProduct.id, review);
    // setProduct(tempProduct);
  };

    if(!listing){
            return <>Loading...</>;
        }
    return <>
            <div className="listing-details container">
                <nav className="navbar navbar-light bg-light justify-content-start">
                    <span className="navbar-text px-2">{listing.owner}</span>
                </nav>
                <div className="p-5 mt-3 mb-4 bg-light rounded-3">
                    <div className="container-fluid row py-5">
                        <div className="col-4">
                            <img width="400" src={farms[listing.image]} style={{ width: '15rem' }} alt='' />
                        </div>
                        <div className="col-8">
                            <h2>{listing.name}</h2>
                            <h3 className="btn btn-primary">${listing.starting_bid}</h3>
                            <p>{listing.description}</p>
                        </div>
                    </div>
                </div>
            </div>
    </>;
}
