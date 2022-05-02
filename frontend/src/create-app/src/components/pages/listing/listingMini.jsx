import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

export const ListingMini = ({listing}) => {

  return <>
   <div className="card text-center m-1" style={{ width: '18rem' }}>
          <div className="col">
            <img src={listing.imageUrl} alt="Logo" style={{width:'16rem'}} className="pt-2"/>
            <div className="card-body">
              <h5 className="card-title">Cow 4 sale</h5>
              <p className="card-text">MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
              <Link to={`/listing/${listing.id}`}  state={{from: {listing}}} className="btn btn-primary">View</Link>
            </div>
          </div>
        </div>
  </>;
};
