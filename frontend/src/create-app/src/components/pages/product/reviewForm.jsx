import { useState } from "react";
import { textField, selectField, textAreaField, rating} from "../common";
import { productReview } from "../../../productReview";

export const reviewForm = ({onReviewAdded}) => {

    const [options] = useState([  
    { value: 1, label: '1 star' },
    { value: 2, label: '2 stars' },
    { value: 3, label: '3 stars' },
    { value: 4, label: '4 stars' },
    { value: 5, label: '5 stars' }]);

    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');


    return <>
            <div className="card">
                <div className="card-header bg-secondary">
                        <h5> <span className="text-white"> Add Review</span></h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">         
                            <TextField 
                                label="Your name"
                                value={name}
                                setValue={setName} />
                        </div>
                        <div className="d-flex justify-content-around col-6">
                            <SelectField 
                                label="Rating"
                                value={rating}
                                setValue={setRating}
                                options={options} />
                            <Rating value={rating} />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-12 w-100">
                            <TextAreaField 
                                label="Comment"
                                value={comment}
                                setValue={setComment} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 pt-2">
                            {(name == '' || comment == '' || rating == '') && <button type="button" className="btn btn-primary" disabled>
                                Submit
                                </button>}
                            {(name != '' && comment != '' && rating != '') && <button type="button" className="btn btn-success bg-primary" enabled
                                onClick={() => {
                                    onReviewAdded(new ProductReview(name, rating, comment, new Date()));
                                    setName('');
                                    setComment('');
                                    setRating('');
                                }
                            }>
                                Submit
                            </button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
}