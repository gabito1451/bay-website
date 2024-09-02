/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const endpoint = "https://whitebay.org/api";
  const mediaEndpoint = "https://whitebay.org/staff/Uploads/";
  const [stockItems, setStockItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [address, setAddress] = useState("");
  const [openSection, setOpenSection] = useState(null);
  const [file, setFile] = useState(null);
  const [fileBlob, setFileBlob] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  const handleFileUpload = (event) => {
    setFileBlob(event.target.files[0]);
    setFile(URL.createObjectURL(event.target.files[0]));
  };
  const [phone, setPhone] = useState("");
  const [btcPrice, setBtcPrice] = useState({});
  const [admin, setAdmin] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState({
    state: false,
    itemObject: {},
  }); // Modal visibility state
  const [selectedItem, setSelectedItem] = useState(null); // State for selected food item

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openCardModal = () => setIsCardModalOpen(true);
  const closeCardModal = () => setIsCardModalOpen(false);

  const [count, setCount] = useState(1);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    fetch(`${endpoint}/menu.php`)
      .then((res) => res.json())
      .then((res) => {
        setStockItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(`${endpoint}/admin.php`)
      .then((res) => res.json())
      .then((res) => {
        setAdmin(res);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
    )
      .then((res) => res.json())
      .then((res) => {
        setBtcPrice(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredStockItems = stockItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.Department === selectedCategory;
    const matchesSearchQuery = item.Item.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    return matchesCategory && matchesSearchQuery;
  });

  const openModal = (item) => {
    setSelectedItem(item); // Set the selected item
    setIsModalOpen({ state: true, item }); // Open the modal
  };

  const closeModal = () => {
    setCount(1);
    setIsModalOpen({ ...isModalOpen, state: false }); // Close the modal
  };

  const addToCart = () => {
    if (phone == "" && phone.length < 5) {
      toast("Use a valid phone number!", {
        position: "top-right",
        autoClose: 5000,
        type: "error",
        theme: "light",
      });
      return;
    } else {
      try {
        setCart([
          ...cart,
          {
            ...selectedItem,
            total: Number(selectedItem.PPrice) * count,
            quantity: count,
            phone,
          },
        ]);
        toast("Added to cart", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          theme: "light",
        });
      } catch (error) {
        console.log(error);
      }
    }
    closeModal();
  };

  return (
    <div className="max-w-6xl relative m-auto w-full overflow-y-auto hide-scrollbar h-[100vh] px-4 bg-gray-100">
      <div className="flex justify-between items-center pt-5">
        <img
          src="./Assets/baylogo.png"
          className="w-18 h-14 rounded-full"
          alt="Logo"
        />
        <div className="relative">
          <img
            src="./Assets/shopping-cart-svgrepo-com.svg"
            alt="Cart"
            className="w-8 h-8 relative"
            onClick={openCardModal}
          />
          <p className="absolute bottom-6 left-2 text-white text-xs w-fit h-fit rounded-full text-center bg-red-500 border border-solid flex justify-center items-center px-1 border-red-600">
            {cart.length}
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-5">
        Our <span className="text-red-500">Menu</span>
      </h1>
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-[url('./Assets/search-svgrepo-com.svg')] bg-[length:20px_20px] bg-[position:10px_center] bg-no-repeat py-5 px-8 mt-8 h-6 rounded-full border-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-8 flex justify-left">
        <div className="hide-scrollbar flex justify-around gap-4 overflow-y-auto">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full min-w-24 ${
              selectedCategory === "All"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            All
          </button>
          {[...new Set(stockItems.map((item) => item.Department))].map(
            (category) => (
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
            )
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-3 mb-1">
        <h2 className="text-lg font-bold">Categories</h2>
      </div>
      <div className="flex gap-4 h-fit flex-wrap py-10 overflow-y-auto hide-scrollbar">
        {filteredStockItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl p-4 shadow-md bg-white min-w-48 max-w-48"
            onClick={() => openModal(item)} // Open modal on click
          >
            <img
              src={`${mediaEndpoint}${item.Image}`}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg w-56 text-ellipsis font-semibold">
              {item.Item}
            </h3>
            <p className="text-gray-500">{item.Department}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">
                ₦{Number(item.PPrice).toLocaleString()}
              </span>
              <button className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9">
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      {isModalOpen.state && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedItem.Name}</h2>
              <button onClick={closeModal} className="text-xl font-bold">
                &times;
              </button>
            </div>
            <img
              src={`${mediaEndpoint}${selectedItem.Image}`}
              alt={selectedItem.Name}
              className="w-full h-64 object-cover my-4"
            />

            <div className="flex justify-between">
              <p className="text-gray-500">{selectedItem.Department}</p>
              <p className="text-lg font-bold text-red-600">
                {`₦${selectedItem.PPrice * count}`}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  onClick={decrement}
                  className="text-red-600 border border-red-600 rounded-lg px-2 h-9"
                >
                  -
                </button>
                <span className="mx-4">{count}</span>
                <button
                  onClick={increment}
                  className="text-white bg-red-600 border border-red-600 rounded-lg px-2 h-9"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="text-white bg-red-600 border border-red-600 rounded-lg px-4 h-9"
              >
                Add to Cart
              </button>
            </div>
            <div>
              <p className=" my-2 font-bold">Phone Number:</p>
              <input
                type="tel"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                placeholder="Input your Number"
                className="border border-solid border-red-600 outline-none w-full rounded-full px-4 py-2 text-md"
              />
            </div>
          </div>
        </div>
      )}

      {/* card modal */}

      {isCardModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto hide-scrollbar py-10 items-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-sm w-full relative">
            <button
              className="absolute text-xl top-1 right-4 text-white rounded-full p-1"
              onClick={closeCardModal}
            >
              ×
            </button>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex mt-3">
                  <img
                    src={`${mediaEndpoint}${item.Image}`}
                    alt={item.Item}
                    className="w-12 h-12 mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.Item}</h2>
                    <p>
                      {item.quantity} × ₦{Number(item.PPrice).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span
                  className="cursor-pointer text-red-600"
                  onClick={() => {
                    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
                  }}
                >
                  Clear
                </span>
              </div>
            ))}
            <div className="mt-6">
              <p className="text-sm">TOTAL:</p>
              <p className="text-2xl font-bold text-yellow-500">
                ₦
                {cart
                  .reduce((accumulator, currentItem) => {
                    return accumulator + currentItem.total;
                  }, 0)
                  .toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => {
                setIsCardModalOpen(false);
                setIsPaymentModalOpen(true);
              }}
              className="mt-6 w-full bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg hover:bg-yellow-400"
            >
              Make Payment
            </button>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto hide-scrollbar py-10 items-center">
          <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 relative text-white rounded-lg shadow-lg">
            <button
              className="absolute text-xl top-1 right-4 text-white rounded-full p-1"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              ×
            </button>
            <h1 className="text-3xl mb-6">
              Total: ₦
              {cart
                .reduce((accumulator, currentItem) => {
                  return accumulator + currentItem.total;
                }, 0)
                .toLocaleString()}
            </h1>

            <div className="mb-4">
              <button
                onClick={() => toggleSection("bank")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded-md focus:outline-none"
              >
                BANK TRANSFER
              </button>
              {openSection === "bank" && (
                <div className="mt-2 p-4 bg-gray-700 rounded-md transition-all duration-300">
                  <p className="flex w-full justify-center gap-2 flex-col break-words">
                    <span className="text-center ">
                      ₦
                      {cart
                        .reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0)
                        .toLocaleString()}{" "}
                      ≈ $
                      {(
                        cart.reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0) / Number(admin[0].ExchangeRate)
                      ).toFixed(5)}
                    </span>
                    <code className="text-center">
                      Account Number: {admin[0].BaccountNumber}
                    </code>
                    <code className="text-center">
                      Account Name: {admin[0].BaccountName}
                    </code>
                    <code className="text-center">
                      Account Bank: {admin[0].BBank}
                    </code>
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <button
                onClick={() => toggleSection("btc")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded-md focus:outline-none"
              >
                PAY WITH BITCOIN
              </button>
              {openSection === "btc" && (
                <div className="mt-2 p-4 bg-gray-700 rounded-md transition-all duration-300">
                  <p className="flex w-full justify-center gap-2 flex-col break-words">
                    <img
                      src={`https://quickchart.io/chart?cht=qr&chs=250x250&chl=${admin.MainBTCwallet}`}
                    />
                    <span className="text-center ">
                      ₦
                      {cart
                        .reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0)
                        .toLocaleString()}{" "}
                      ≈ $
                      {(
                        cart.reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0) / Number(admin[0].ExchangeRate)
                      ).toFixed(5)}
                    </span>
                    <code className="text-center text-sm">
                      {admin[0].MainBTCwallet}
                    </code>
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <button
                onClick={() => toggleSection("usdt")}
                className="w-full text-left py-2 px-4 bg-gray-700 rounded-md focus:outline-none"
              >
                PAY WITH USDT
              </button>
              {openSection === "usdt" && (
                <div className="mt-2 p-4 bg-gray-700 rounded-md transition-all duration-300">
                  <p className="flex w-full justify-center gap-2 flex-col break-words">
                    <img
                      src={`https://quickchart.io/chart?cht=qr&chs=250x250&chl=${admin.USDTWalletAddr}`}
                    />
                    <span className="text-center ">
                      ₦
                      {cart
                        .reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0)
                        .toLocaleString()}{" "}
                      ≈ $
                      {(
                        cart.reduce((accumulator, currentItem) => {
                          return accumulator + currentItem.total;
                        }, 0) / Number(admin[0].ExchangeRate)
                      ).toFixed(5)}
                    </span>
                    <code className="text-center text-sm">
                      {admin[0].USDTWalletAddr}
                    </code>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="block mb-2 text-sm font-medium">
                Delivery Address
              </label>
              <input
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                value={address}
                placeholder="Enter your delivery address"
                className="w-full p-2 bg-gray-700 rounded-md focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">
                Upload Proof:
              </label>
              <input
                type="file"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-white hover:file:bg-gray-500"
              />
              {file && (
                <img
                  src={file}
                  alt="Proof of Payment"
                  className="mt-4 w-48 h-auto rounded-md"
                />
              )}
              <button
                onClick={() => {
                  const formData = new FormData();
                  if (fileBlob) {
                    formData.append("txtphoton", fileBlob);
                    const orders = cart.map((item) => ({
                      Item: item.Item,
                      Phone: item.phone,
                      Quantity: Number(item.quantity),
                      Price: Number(item.PPrice),
                      Image: item.Image,
                      Department: item.Department,
                      ItemId: item.id,
                      userAddress: address,
                    }));

                    formData.append("orders", JSON.stringify(orders));

                    var id = toast.loading("Submitting order...", {
                      autoClose: 5000,
                    });

                    fetch(`${endpoint}/order.php`, {
                      method: "POST",
                      body: formData,
                    })
                      .then((response) => response.text())
                      .then((result) => {
                        toast.update(id, {
                          render: "Order submitted",
                          type: "success",
                          autoClose: 3000,
                          isLoading: false,
                        });
                        setIsPaymentModalOpen(false);
                        setCart([]);
                      })
                      .catch((error) => {
                        toast.update(id, {
                          render: "Something went wrong",
                          type: "error",
                          autoClose: 3000,
                          isLoading: false,
                        });
                      });
                  } else {
                    toast.info(id, {
                      render: "Upload proof of payment",
                      isLoading: false,
                      autoClose: 3000,
                    });
                  }
                }}
                className="mt-6 w-full bg-yellow-500 text-gray-800 font-semibold py-2 rounded-lg hover:bg-yellow-400"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LandingPage;
