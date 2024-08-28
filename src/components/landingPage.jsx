import React, { useState } from "react";
import { foodItems } from "./foodItems/foodItem";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFoodItems = foodItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="max-w-6xl m-auto  w-full px-4 bg-gray-100">
      <div className="flex justify-between items-center mt-5">
        <img src="./Assets/baylogo.png" className="w-18 h-14 rounded-full" />
        <div className="relative">
          <img
            src="/Assets/shopping-cart-svgrepo-com.svg "
            alt="Cart"
            className="w-8 h-8 relative"
          />
          <p className="absolute bottom-6 text-red-500">0</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mt-5">
        Choose <br /> Your favourite <span className="text-red-500">Food</span>
      </h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[url('/Assets/search-svgrepo-com.svg')] bg-[length:20px_20px] bg-[position:10px_center] bg-no-repeat p-10  mt-8 h-14 rounded-full border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-8 flex justify-left">
        <div className="hide-scrollbar flex justify-around gap-4 overflow-y-hidden">
          {["All", "Pizza", "Burger", "Sandwich"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full min-w-24 ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 mb-1">
        <h2 className="text-lg font-bold">Popular Food</h2>
        <button className="text-red-600">See All</button>
      </div>
      <div className="flex gap-4 overflow-y-hidden mt-2 hide-scrollbar">
        {filteredFoodItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-md bg-white min-w-48"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.category}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Rs. {item.price}</span>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 mb-1">
        <h2 className="text-lg font-bold">Nearest</h2>
        <button className="text-red-600">See All</button>
      </div>
      <div className="flex gap-4 overflow-y-hidden mt-2 hide-scrollbar">
        {filteredFoodItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-md bg-white min-w-48"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.category}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Rs. {item.price}</span>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;

import React, { useState } from "react";
import { foodItems } from "./foodItems/foodItem";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredFoodItems = foodItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <div className="max-w-6xl m-auto border border-solid border-red-500 w-full px-4 bg-gray-100">
      <div className="flex justify-between items-center mt-5">
        <img src="./Assets/baylogo.png" className="w-18 h-14 rounded-full" />
        <div className="relative">
          <img
            src="/Assets/shopping-cart-svgrepo-com.svg "
            alt="Cart"
            className="w-8 h-8 relative"
          />
          <p className="absolute bottom-6 text-red-500">0</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold mt-5">
        Choose <br /> Your favourite <span className="text-red-500">Food</span>
      </h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[url('/Assets/search-svgrepo-com.svg')] bg-[length:20px_20px] bg-[position:10px_center] bg-no-repeat p-10  mt-8 h-14 rounded-full border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-8 flex justify-left">
        <div className="hide-scrollbar flex justify-around gap-4 overflow-y-hidden">
          {["All", "Pizza", "Burger", "Sandwich"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full min-w-24 ${
                selectedCategory === category
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 mb-1">
        <h2 className="text-lg font-bold">Popular Food</h2>
        <button className="text-red-600">See All</button>
      </div>
      <div className="flex gap-4 overflow-y-hidden mt-2 hide-scrollbar">
        {filteredFoodItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-md bg-white min-w-48"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.category}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Rs. {item.price}</span>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-3 mb-1">
        <h2 className="text-lg font-bold">Nearest</h2>
        <button className="text-red-600">See All</button>
      </div>
      <div className="flex gap-4 overflow-y-hidden mt-2 hide-scrollbar">
        {filteredFoodItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-md bg-white min-w-48"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">{item.category}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">Rs. {item.price}</span>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
