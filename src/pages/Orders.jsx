import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency, cartItems } = useContext(ShopContext);

  // To get the correct product details
  const getProductDetails = (itemId) => {
    return products.find(product => product._id === itemId);
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {Object.keys(cartItems).map((itemId, index) => {
          const product = getProductDetails(itemId);
          if (!product) return null;

          const sizes = cartItems[itemId];
          const sizeList = Object.keys(sizes).map(size => `${size}: ${sizes[size]}`).join(", ");

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={product.image[0]} alt={product.name} />
                <div>
                  <p className="sm:text-base font-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {product.price}
                    </p>
                    <p>Quantity: {sizes[Object.keys(sizes)[0]]}</p>
                    <p>Size: {sizeList}</p>
                  </div>
                  <p className="mt-2">
                    Date : <span className="text-gray-400">We Will Notify</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">Ready To Ship</p>
                </div>
               
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
