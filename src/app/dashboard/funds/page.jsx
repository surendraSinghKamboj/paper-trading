import { getFunds } from "@/actions/funds";
import { formatINR } from "@/libs/formateINR";
import React from "react";

const page = async () => {
  const res = await getFunds();
  const { fund } = JSON.parse(res);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Fund Details
        </h2>
        <div className="border-t border-gray-200 mt-4">
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-700">
              User Information
            </h3>
            <p className="text-gray-600">Name: {fund.userId.fullName}</p>
            <p className="text-gray-600">Email: {fund.userId.email}</p>
          </div>
          <div className="py-4">
            <h3 className="text-lg font-medium text-gray-700">
              Fund Information
            </h3>
            <p className="font-mono font-extrabold text-green-600">
              Current Fund:  {formatINR(fund.currentFund)}
            </p>
            <p className="text-red-600 font-mono font-extrabold">
              Invested Fund:  {formatINR(fund.investedFund)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
