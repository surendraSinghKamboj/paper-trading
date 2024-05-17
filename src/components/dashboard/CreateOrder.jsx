"use client";
import React, { useState } from "react";
import OrderForm from "./OrderForm";

const CreateOrder = () => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="container mx-auto">
      <button onClick={() => setShowDialog((prev) => !prev)}>
        Creat Order
      </button>
      {showDialog && <OrderForm hide={setShowDialog} />}
    </div>
  );
};

export default CreateOrder;
