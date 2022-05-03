import{Rating} from '../../common/rating';

export const ReviewList = ({ reviews }) => {
  return <>
    { reviews?.length == 0 && <h5 className="ms-3 mb-3"> Be the first to add a review! </h5> }
    { reviews?.length > 0 && reviews.map((review, index) =><>
      <nav className="mb-0 ps-2 bg-opacity-10 navbar navbar-expand-lg bg-secondary rounded-top border">
        <Rating value={review.rating}/>
      </nav>
      <div className="ps-2 pe-2 border rounded-bottom mb-2">
        <div className="row mt-3">
          <div className="col">
            <h5 className="text-black text-opacity-25"> { review.userName } </h5>
          </div>
          <div className="col">
            <h5 className="d-flex text-black text-opacity-25 justify-content-end"> { new Date(review.date).toDateString() } </h5>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5> <q>{ review.comment }</q> </h5>
          </div>
        </div>
      </div>
    </>)}
  </>;
}
