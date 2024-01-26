import React, { useState } from "react";
// import Editor from "./Editor";
import SunTextEditor from "../../components/text-editor";

const Report = () => {


  const [divRef, setDivRef] = useState(null);

  const handleRemoveDiv = () => {
    if (divRef) {
      divRef.remove();
    }
  };

  return (
    <>
      <div
        className="container-fluid w-100 border border-secondary"
        ref={setDivRef}
      >
        <div className="row card d-flex flex-row">
          <div className="col-md-1">
            <p>Tasks</p>
          </div>
          <div className="col-md-8">
            <SunTextEditor />
          </div>
          <div className="col-md-3 d-flex justify-content-end h-25">
            <button onClick={handleRemoveDiv}>X</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
