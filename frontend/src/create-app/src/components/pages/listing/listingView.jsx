import { useLocation } from "react-router-dom";
export const ListingView = () => {
    const location = useLocation();
    const from = location.state;
    const listing = from.from.listing;
    console.log(from.from.listing);
    return <>
        <div className="card text-center m-1" style={{ width: '18rem' }}>
             <div className="col">
                 <img src={listing.imageUrl} alt="Logo" style={{width:'16rem'}} className="pt-2"/>
                 <div className="card-body">
                 <h5 className="card-title">{listing.title}</h5>
                 <p className="card-text">{listing.description}</p>
                 <btn className="btn btn-primary" onClick={() => {
                 }}>View</btn>
                 </div>
             </div>
        </div>
    </>;
}