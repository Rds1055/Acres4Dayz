import { useEffect, useState } from "react";
import { TextField } from "../common/textField.jsx";
import { TextAreaField } from "../common/textAreaField.jsx";
import farm1 from "../../images/1.jpg";
import farm2 from "../../images/2.jpg";
import farm3 from "../../images/3.jpg";
import farm4 from "../../images/4.jpg";
import farm5 from "../../images/5.jpg";

export const CreatePost = (props) => {
  const {setScreen} = props;

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ acres, setAcres ] = useState(0);
  const [ suitability, setSuitability ] = useState('');
  const [ image, setImage ] = useState('farm1');
  const [ zip, setZip ] = useState(0);

  return <>
    <div className="container rounded-bottom border">
      <div className="row pt-2">
        <div className="col">
          <TextField label="Title" value={title} setValue={setTitle}/>
        </div>
        <div className="col">
          <TextField label="Acres" value={acres} setValue={setAcres} />
        </div>
        <div className="col">
          <TextField label="Suitability" value={acres} setValue={setAcres} />
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          <img src={farm1} alt="Logo" style={{width:'10rem'}} className="me-4"/>
          <button type="button" className="btn btn-secondary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm1');
          }}>1</button>
        </div>
        <div className="col text-center">
          <img src={farm2} alt="Logo" style={{width:'10rem'}} className="me-4"/>
          <button type="button" className="btn btn-secondary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm2');
          }}>2</button>
        </div>
        <div className="col text-center">
          <img src={farm3} alt="Logo" style={{width:'10rem'}} className="me-4"/>
          <button type="button" className="btn btn-secondary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm3');
          }}>3</button>
        </div>
        <div className="col text-center">
          <img src={farm4} alt="Logo" style={{width:'10rem'}} className="me-4"/>
          <button type="button" className="btn btn-secondary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm4');
          }}>4</button>
        </div>
        <div className="col text-center">
          <img src={farm5} alt="Logo" style={{width:'10rem'}} className="me-4"/>
          <button type="button" className="btn btn-secondary me-4" style={{width:'10rem'}} onClick={() => {
            setImage('farm5');
          }}>5</button>
        </div>
      </div>
      <div className="row pb-2">
        <div className="col">
          <TextAreaField label="Comment" value={description} setValue={setDescription} />
        </div>
      </div>
      <div className="row pb-2">
        <div className="col">
          {(title == '' || description == '') && <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
          {title != '' && description != '' && <btn className="btn btn-primary" onClick={() => {
            setScreen(1);
          }}>Submit</btn>}
        </div>
      </div>
    </div>
  </>;
}
