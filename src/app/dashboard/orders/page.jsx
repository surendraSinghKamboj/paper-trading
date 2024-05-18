import { getAllClosedOrders } from "@/actions/order";
import { formatINR } from "@/libs/formateINR";
import React from "react";

const page = async () => {
  const data = await getAllClosedOrders();
  const res = JSON.parse(data);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="font-mono">
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Instrument
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              BUY
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              SELL
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Target
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              SL
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Lot Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              P/L
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 pb-16">
          {res.orders &&
            res.orders.map((item) => (
              <tr key={item._id} className={`${item.orderStatus==="OPEN"?"bg-blue-300":"bg-red-200"}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.instrument}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.buy}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sell}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.tg}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.sl}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lotSize}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${(item.sell - item.buy) * item.lotSize * item.quantity - 50>=0?"text-green-600":"text-red-600"}`}>
                  {formatINR((item.sell - item.buy) * item.lotSize * item.quantity - 50)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
