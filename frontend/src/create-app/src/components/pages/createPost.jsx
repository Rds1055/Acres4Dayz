import { useEffect, useState } from "react";
import { TextField } from "../common/textField.jsx";
import { TextAreaField } from "../common/textAreaField.jsx";
import farm1 from "../../images/1.jpg";
import farm2 from "../../images/2.jpg";
import farm3 from "../../images/3.jpg";
import farm4 from "../../images/4.jpg";
import farm5 from "../../images/5.jpg";
import { useNavigate } from 'react-router-dom';
import { addProduct } from "../../api/accountApi"

export const CreatePost = ({account}) => {
  const navigate = useNavigate();

  const [ description, setDescription ] = useState('');
  const [ acres, setAcres ] = useState();
  const [ suitability, setSuitability ] = useState('');
  const [ image, setImage ] = useState('farm1');
  const [ zip, setZip ] = useState();
  const [ bid, setBid ] = useState();

  return <>
    <div className="container rounded-bottom border">
      <div className="row pt-2">
        <div className="col">
          <TextField label="Acres" value={acres} setValue={setAcres} />
        </div>
        <div className="col">
          <TextField label="Suitability" value={suitability} setValue={setSuitability} />
        </div>
        <div className="col">
          <TextField label="Zip Code" value={zip} setValue={setZip} />
        </div>
        <div className="col">
          <TextField label="Starting Bid" value={bid} setValue={setBid} />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <img src={farm1} alt="Logo" style={{width:'10rem'}} className="me-4"/>

          {image == 'farm1' && <button type="button" className="btn btn-success me-4" style={{width:'10rem'}} disabled>1</button>}
          {image != 'farm1' && <button type="button" className="btn btn-primary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm1');
          }}>1</button>}

        </div>
        <div className="col text-center">
          <img src={farm2} alt="Logo" style={{width:'10rem'}} className="me-4"/>

          {image == 'farm2' && <button type="button" className="btn btn-success me-4" style={{width:'10rem'}} disabled>2</button>}
          {image != 'farm2' && <button type="button" className="btn btn-primary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm2');
          }}>2</button>}

        </div>
        <div className="col text-center">
          <img src={farm3} alt="Logo" style={{width:'10rem'}} className="me-4"/>


          {image == 'farm3' && <button type="button" className="btn btn-success me-4" style={{width:'10rem'}} disabled>3</button>}
          {image != 'farm3' && <button type="button" className="btn btn-primary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm3');
          }}>3</button>}
        </div>
        <div className="col text-center">
          <img src={farm4} alt="Logo" style={{width:'10rem'}} className="me-4"/>

          {image == 'farm4' && <button type="button" className="btn btn-success me-4" style={{width:'10rem'}} disabled>4</button>}
          {image != 'farm4' && <button type="button" className="btn btn-primary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm4');
          }}>4</button>}

        </div>
        <div className="col text-center">
          <img src={farm5} alt="Logo" style={{width:'10rem'}} className="me-4"/>

          {image == 'farm5' && <button type="button" className="btn btn-success me-4" style={{width:'10rem'}} disabled>5</button>}
          {image != 'farm5' && <button type="button" className="btn btn-primary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm5');
          }}>5</button>}

        </div>
      </div>
      <div className="row pb-2">
        <div className="col">
          <TextAreaField label="Comment" value={description} setValue={setDescription} />
        </div>
      </div>
      <div className="row pb-2">
        <div className="col">
          {(description == '' || acres == '' || suitability == '' || zip == '' || bid =='') && <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
          {description != '' && acres != '' && suitability != '' && zip != '' && bid != '' && <btn className="btn btn-primary" onClick={() => {
            console.log(account);
            addProduct({acres:acres, owner:account.username, description:description, zip_code:zip, suitable_for:suitability, image:image, starting_bid:bid});
            navigate('/');
          }}>Submit</btn>}
        </div>
      </div>
    </div>
  </>;
}
