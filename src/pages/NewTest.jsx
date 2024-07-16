import React, { Component, useState } from "react";
import TestForm from "../components/TestForm";

import "../styles/NewTest.css";

function NewTest() {

  return (
    <div className="createTest">
     <TestForm/>
    </div>
  );
}

export default NewTest;
