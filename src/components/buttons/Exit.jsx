"use client";
import { exitOrder } from "@/actions/order";
import React, { useEffect, useState } from "react";

const Exit = ({ order }) => {
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ status: false, message: "" });
  const [value, setValue] = useState(0);

  const handleSubmit = async () => {
    try {
      const data = await exitOrder({
        orderId: order._id,
        orderType: order.orderType,
        exitPrice: value, // Use value instead of exitPrice
      });
      const res = JSON.parse(data);

      if (res.status) {
        setShow(false);
        setShowMessage(true);
        setMessage(res);
      }
    } catch (error) {
      console.log(error);
      setShowMessage(true);
      setMessage({
        status: false,
        message: "Please Check your internet Connection.",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 3000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Exit
      </button>
      {show && (
        <div className="fixed z-50 overflow-visible -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-wrap p-10 right-full min-w-80 bg-white shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <h1 className="font-mono font-bold">{order.instrument}</h1>
          <label htmlFor="exitPrice" className="block text-gray-400">
            Exit Price
          </label>
          <input
            type="text"
            name="exitPrice"
            id="exitPrice"
            autoFocus={true}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="w-full px-4 py-2 mt-2 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300 mt-2"
          >
            Exit
          </button>
          <button
            onClick={() => setShow(false)}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-300 mt-2"
          >
            Cancel
          </button>
        </div>
      )}
      {showMessage && (
        <div
          className={`absolute top-5 right-4 min-w-80 shadow-lg shadow-slate-400 min-h-14 flex justify-center items-center rounded-2xl ${
            message.status ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <p>{message.message}</p>
        </div>
      )}
    </>
  );
};

export default Exit;
