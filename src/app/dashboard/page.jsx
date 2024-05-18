import { getAllOrders_withOtherData } from "@/actions/order";
import Exit from "@/components/buttons/Exit";
import CreateOrder from "@/components/dashboard/CreateOrder";
import { formatINR } from "@/libs/formateINR";
import React from "react";

const page = async () => {
  const response = await getAllOrders_withOtherData();
  const { user, fund, todayOpenOrders, todayClosedOrders, previousOpenOrders } =
    JSON.parse(response);

  const allOrders = [
    ...todayOpenOrders,
    ...todayClosedOrders,
    ...previousOpenOrders,
  ];
  // console.log(user)

  return (
    <main className="bg-gray-100">
      <div className="flex w-full px-4 justify-between">
        <div>{user.fullName}</div>
        <div>{formatINR(fund.currentFund)}</div>
      </div>
      <CreateOrder />

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instrument
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BUY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SELL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lot Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                P/L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 pb-16">
            {allOrders &&
              allOrders.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.instrument}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.buy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.sell}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.lotSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(item.sell - item.buy) * item.lotSize * item.quantity - 50}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Update
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Exit order={item} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default page;
