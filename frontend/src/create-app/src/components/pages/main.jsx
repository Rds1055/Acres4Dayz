import { useEffect, useState } from "react";
import farm1 from "../../images/1.jpg";
import farm2 from "../../images/2.jpg";
import farm3 from "../../images/3.jpg";
import farm4 from "../../images/4.jpg";
import farm5 from "../../images/5.jpg";
import { ListingMini } from "./listing/listingMini";
import { Listing } from "../../models/Listing";


export const Main = ({setProduct}) => {
  const [listings, setListings] = useState(undefined);

  useEffect(() => {
      getProducts().then(x =>
      {
        setProducts(x);
      }
      );
    }, []);

  if(!listings){
    return <>loading...</>;
  }
  return <>
    <div className="container mb-5 pb-5">
    <div className="row">
      {listings.map((listing) =><>
        <ListingMini key={listing.id} listing={listing}/>
      </>)}
    </div>
  </div>
  </>;
}
