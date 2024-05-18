import React from "react";
import { ImSpinner10 } from "react-icons/im";

const loading = () => {
  return <div className="w-full h-screen flex justify-center items-center"><ImSpinner10 className="text-5xl animate-spin text-blue-500" /></div>;
};

export default loading;
