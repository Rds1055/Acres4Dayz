import { useEffect, useState } from "react";
import farm1 from "../../images/1.jpg";
import farm2 from "../../images/2.jpg";
import farm3 from "../../images/3.jpg";
import farm4 from "../../images/4.jpg";
import farm5 from "../../images/5.jpg";

var tests = [farm1, farm2, farm3, farm4, farm5, farm1, farm2, farm3, farm4, farm5];

export const Main = (props) => {
  const {setScreen} = props;
  const {setProduct} = props;

  return <>
    <div className="container mb-5 pb-5">
    <div className="row">
      {tests.map((test, index) =><>
        <div className="card text-center m-1" style={{ width: '18rem' }}>
          <div class="col">
            <img src={test} alt="Logo" style={{width:'16rem'}} className="pt-2"/>
            <div className="card-body">
              <h5 className="card-title">Cow 4 sale</h5>
              <p className="card-text">MOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
              <btn className="btn btn-primary" onClick={() => {
                setProduct({image:test, name:"", description:""});
                setScreen(3);
              }}>View</btn>
            </div>
          </div>
        </div>
      </>)}
    </div>
  </div>
  </>;
}
