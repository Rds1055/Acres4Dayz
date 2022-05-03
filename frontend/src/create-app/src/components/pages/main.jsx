import { useEffect, useState } from "react";
import { ListingMini } from "./listing/listingMini";
import { Listing } from "../../models/Listing";
import { getProducts } from "../../api/accountApi.js"


export const Main = ({setProduct}) => {
  const [listings, setListings] = useState(undefined);

  useEffect(() => {
      getProducts().then(x =>
      {
        setListings(x);
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
        <ListingMini listing={listing}/>
      </>)}
    </div>
  </div>
  </>;
}
