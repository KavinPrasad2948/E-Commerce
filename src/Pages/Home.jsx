import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { saveAllProducts } from "../Redux/Reducers/Products";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../Redux/Reducers/Cart"; // Import removeItemFromCart action
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { productItems = [] } = useSelector((store) => store.Products);
  const { items = [] } = useSelector((store) => store.Cart);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => {
        dispatch(saveAllProducts(result));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function isAddedToCart(id = 0) {
    return items.some((item) => item.id === id);
  }

  function addToCart(data) {
    dispatch(addItemToCart(data));
    
  }

  // Delete function
  function deleteFromCart(id) {
    dispatch(removeItemFromCart(id));
    console.log(id);
  }

  return (
    <div className="container">
      <p>
        <Link to="/cart"><button className="btn btn-dark">Cart</button></Link>
      </p>
      <div className="row">
        {productItems.map((item, index) => (
          <ProductCard
            key={`${item.title}-${item.id}-${index}`}
            data={item}
            addToCart={addToCart}
            isAddedToCart={isAddedToCart(item.id)}
            deleteFromCart={deleteFromCart} // Pass delete function as prop
          />
        ))}
      </div>
    </div>
  );
}
