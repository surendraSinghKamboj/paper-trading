import { createOrder } from "@/actions/order";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ImSpinner10 } from "react-icons/im";

const OrderForm = ({ hide }) => {
  const [message, setMessage] = useState({ status: false, message: "" });
  const [showMessage, setShowMessage] = useState(false);
  const [enable, setEnable] = useState(false);
  const [formData, setFormData] = useState({
    instrument: "",
    orderType: "BUY",
    buy: "",
    sell: "",
    sl: "",
    tg: "",
    quantity: "",
    lotSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setEnable(true);
    e.preventDefault();
    try {
      const res = await createOrder(formData);
      const data = JSON.parse(res);
      setEnable(false);
      setMessage(data);
      if (data.status) {
        hide(false);
      }
      setShowMessage(true);
    } catch (error) {
      setEnable(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!message.status) {
        setShowMessage(false);
      } else {
        setShowMessage(false);
      }
    }, 3000);
  }, [showMessage]);

  return (
    <>
      <form
        autocomplete="off"
        onSubmit={handleSubmit}
        className="w-4/5 sm:w-1/2 mx-auto shadow-lg shadow-black p-4 pt-10 relative"
      >
        <IoMdClose
          onClick={() => hide(false)}
          className="absolute right-2 top-2 text-2xl text-red-700 hover:rotate-180 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:text-white rounded-full"
        />
        <div className="mb-4">
          <label htmlFor="orderType" className="text-gray-700">
            Order Type
          </label>
          <div
            className={`relative w-16 p-1 h-8 cursor-pointer transition-all shadow-inner shadow-black duration-700 ${
              formData.orderType === "BUY" ? "bg-blue-300" : "bg-red-300"
            } rounded-full`}
            onClick={() => {
              if (formData.orderType === "BUY") {
                setFormData({ ...formData, orderType: "SELL" });
              } else {
                setFormData({ ...formData, orderType: "BUY" });
              }
            }}
          >
            <div
              className={`w-6 h-6 absolute rounded-full transition-all shadow-inner shadow-black top-1 duration-700 ease-in ${
                formData.orderType === "BUY"
                  ? "left-0 bg-blue-500"
                  : "left-10 bg-red-500"
              }`}
            ></div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="buy" className="block text-gray-700">
            Instrument
          </label>
          <input
            type="text"
            id="instrument"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formData.orderType === "BUY"
                ? "focus:ring-blue-500"
                : "focus:ring-red-500"
            }`}
            required
          />
        </div>
        {formData.orderType === "BUY" ? (
          <div className="mb-4">
            <label htmlFor="buy" className="block text-gray-700">
              Buy Price
            </label>
            <input
              type="number"
              id="buy"
              name="buy"
              value={formData.buy}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formData.orderType === "BUY"
                  ? "focus:ring-blue-500"
                  : "focus:ring-red-500"
              }`}
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label htmlFor="sell" className="block text-gray-700">
              Sell Price
            </label>
            <input
              type="number"
              id="sell"
              name="sell"
              value={formData.sell}
              onChange={handleChange}
              className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
                formData.orderType === "BUY"
                  ? "focus:ring-blue-500"
                  : "focus:ring-red-500"
              }`}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="sl" className="block text-gray-700">
            Stop Loss (SL)
          </label>
          <input
            type="number"
            id="sl"
            name="sl"
            value={formData.sl}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formData.orderType === "BUY"
                ? "focus:ring-blue-500"
                : "focus:ring-red-500"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tg" className="block text-gray-700">
            Target (TG)
          </label>
          <input
            type="number"
            id="tg"
            name="tg"
            value={formData.tg}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formData.orderType === "BUY"
                ? "focus:ring-blue-500"
                : "focus:ring-red-500"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tg" className="block text-gray-700">
            Lot Size
          </label>
          <input
            type="number"
            id="lotSize"
            name="lotSize"
            value={formData.lotSize}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formData.orderType === "BUY"
                ? "focus:ring-blue-500"
                : "focus:ring-red-500"
            }`}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tg" className="block text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className={`w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formData.orderType === "BUY"
                ? "focus:ring-blue-500"
                : "focus:ring-red-500"
            }`}
          />
        </div>
        <button
          disabled={enable ? true : false}
          type="submit"
          className={`w-full ${
            formData.orderType === "BUY"
              ? "bg-blue-500  hover:bg-blue-600"
              : "bg-red-500  hover:bg-red-600"
          } text-white py-2 rounded-lg transition duration-300`}
        >
          {enable ? (
            <ImSpinner10 className="mx-auto animate-spin" />
          ) : (
            "Place Order"
          )}
        </button>
      </form>

      {/* -------------------------------------------------------------- */}
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

export default OrderForm;
