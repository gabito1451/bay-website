import React, { useState } from "react";
import { foodItems } from "./foodItems/foodItem";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [selectedItem, setSelectedItem] = useState(null); // State for selected food item

  const filteredFoodItems = foodItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  const openModal = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="max-w-6xl m-auto w-full px-4 bg-gray-100">
      <div className="flex justify-between items-center pt-5">
        <img
          src="./Assets/baylogo.png"
          className="w-18 h-14 rounded-full"
          alt="Logo"
        />
        <div className="relative">
          <img
            src="/Assets/shopping-cart-svgrepo-com.svg"
            alt="Cart"
            className="w-8 h-8 relative"
          />
          <p className="absolute bottom-6 left-6 text-white text-xs w-3 h-fit rounded-full text-center bg-red-500 border border-solid border-red-600">
            0
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-5">
        Choose <br />
        Your favourite <span className="text-red-500">Food</span>
      </h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[url('/Assets/search-svgrepo-com.svg')] bg-[length:20px_20px] bg-[position:10px_center] bg-no-repeat py-5 px-8 mt-8 h-6 rounded-full border-none"
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
            onClick={() => openModal(item)} // Open modal on click
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
            onClick={() => openModal(item)}
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

      {/* Modal Component */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
              <button onClick={closeModal} className="text-xl font-bold">
                &times;
              </button>
            </div>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="w-full h-64 object-cover my-4"
            />

            <p className="flex justify-between">
              <p className="text-gray-500">{selectedItem.category}</p>
              <p className="text-lg font-bold text-red-600">
                Rs. {selectedItem.price}
              </p>
            </p>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button className="text-red-600 border border-red-600 rounded-lg px-2 h-9">
                  -
                </button>
                <span className="mx-4">1</span>
                <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                  +
                </button>
              </div>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-4 h-9">
                Add to Cart
              </button>
            </div>
            <p className="mt-4 text-gray-500">
              {selectedItem.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
