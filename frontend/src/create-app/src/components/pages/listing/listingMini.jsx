import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import farm1 from "../../../images/1.jpg";
import farm2 from "../../../images/2.jpg";
import farm3 from "../../../images/3.jpg";
import farm4 from "../../../images/4.jpg";
import farm5 from "../../../images/5.jpg";

export const ListingMini = ({listing}) => {

var farms = {'farm1':farm1, 'farm2':farm2, 'farm3':farm3, 'farm4':farm4, 'farm5':farm5};

  return <>
   <div className="card text-center m-1" style={{ width: '18rem' }}>
          <div className="col">
            <img src={farms[listing.image]} alt="Logo" style={{width:'16rem'}} className="pt-2"/>
            <div className="card-body">
              <h5 className="card-title">{listing.owner}</h5>
              <p className="card-text">{listing.description}</p>
              <Link to={`/listing/${listing}`}  state={{from: {listing}}} className="btn btn-primary">View</Link>
            </div>
          </div>
        </div>
  </>;
};
