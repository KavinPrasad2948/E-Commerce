import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { saveAllProducts } from "../Redux/Reducers/Products";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Redux/Reducers/Cart";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch(); // Corrected variable name
  const { productItems = [] } = useSelector((store) => store.Products);
  const { items = [] } = useSelector((store) => store.Cart);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((result) => {
        dispatch(saveAllProducts(result)); // Corrected passing of result
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function isAddedToCart(id = 0) {
    const matchingElement = items.find((item) => item.id === id); // Removed unnecessary null check
    return !!matchingElement; // Simplified condition
  }

  function addToCart(data) {
    if (data.id) {
      dispatch(addItemToCart(data));
    }
  }

  return (
    <div className="container">
      <h1>Fiction</h1>
      <p>Filter</p>
      <p>
        <Link to="/cart">Cart</Link>
      </p>
      <div className="row">
        {productItems.map((item, index) => (
          <ProductCard
            key={`${item.title}-${item.id}-${index}`}
            data={item}
            addToCart={addToCart}
            isAddedToCart={isAddedToCart(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
