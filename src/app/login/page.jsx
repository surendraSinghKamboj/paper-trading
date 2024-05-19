import { authToken } from "@/actions/user";
import React from "react";

const page = async ({ searchParams: { code } }) => {
  if (!code) {
    return (
      <div className="flex min-h-screen w-full justify-center items-center">
        This path is not Valid
      </div>
    );
  }
  const res = await authToken(code);
  const data = JSON.parse(res);
  if (!data.status) {
    return (
      <div className="flex min-h-screen w-full justify-center items-center">
        Authentication Token not Received.
      </div>
    );
  }
  return (
    <div className="flex min-h-screen w-full justify-center items-center">
      Redirecting...
    </div>
  );
};

export default page;
