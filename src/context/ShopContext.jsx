import  { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase/firebaseConfig'; // Adjust the import path as needed
import { onAuthStateChanged } from "firebase/auth";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 250;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [currentUser, setCurrentUser] = useState(null); // Add state for current user
  const navigate = useNavigate();

  useEffect(() => {
    // Set up an observer on Auth to track the user state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);


  
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setCartItems((prevCartItems) => {
      let newCartData = { ...prevCartItems };

      if (newCartData[itemId]) {
        if (newCartData[itemId][size]) {
          newCartData[itemId][size] += 1;
        } else {
          newCartData[itemId][size] = 1;
        }
      } else {
        newCartData[itemId] = { [size]: 1 };
      }

      return newCartData;
    });
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          totalCount += cartItems[itemId][size];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let CartData = structuredClone(cartItems);
    CartData[itemId][size] = quantity;
    setCartItems(CartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            totalAmount += itemInfo.price * quantity;
          }
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    currentUser // Provide the currentUser in context
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
    
  );
};

export default ShopContextProvider;
