import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      return response.data.data; 
    },
  });

  if (isError) {
    return <h3 className="text-red-600">Error: {error.message}</h3>;
  }

  if (isLoading) {
    return <h3 className="text-emerald-600 text-center">Loading categories...</h3>;
  }

  return (
    <div className="container mx-auto p-5">

      
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-5">
        {data?.map((category) => (
          <div key={category._id} className="p-2 ">
            <div  className="border-2 border-gray-200 hover:shadow-md hover:shadow-emerald-400   rounded-md overflow-hidden">
              
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover"
              />
              
              <h3 className="py-4 text-emerald-600 text-2xl capitalize font-semibold text-center">
                  {category?.name}
                </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}