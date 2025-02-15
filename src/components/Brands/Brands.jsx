import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      return response.data.data;
    },
  });

  if (isError) {
    return <h3 className="text-red-600">Error: {error.message}</h3>;
  }

  if (isLoading) {
    return <h3 className="text-emerald-600 text-center">Loading brands...</h3>;
  }

  return (
    <>
      <h2 className="text-emerald-600 text-2xl capitalize text-center">
        All Brands
      </h2>
      <div className="container mx-auto p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] m-auto">
          {data?.map((brand) => (
            <div key={brand._id} className="p-2">
              <div className="border-2 p-6 border-gray-200 hover:shadow-lg hover:shadow-emerald-600  hover:border-0">
                <img src={brand.image} alt={brand.name} className="w-full" />
                <h3>{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
