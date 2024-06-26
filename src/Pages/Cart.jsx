import { useEffect, useState } from "react";
import CartCard from "../Components/CartCard";
import "../assets/style.css";
import {
  quantityChange,
  updateSubTotal,
  updateTotal,
} from "../Redux/Reducers/Cart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Cart() {
  const dispatcher = useDispatch();
  const {
    items = [],
    subTotal = 0,
    total = 0,
  } = useSelector((store) => store.Cart);
  const [shipping] = useState(20);

  useEffect(() => {
    if (items.length > 0) {
      let subTotal = 0;
      items.forEach((element) => {
        subTotal += element.price * element.quantity;
        dispatcher(updateSubTotal(subTotal));
      });
      if (shipping > 0) {
        subTotal += shipping;
      }
      dispatcher(updateTotal(subTotal));
    }
  }, [items]);

  return (
    <div className="container">
      <Link to="/">
<button className="btn btn-dark" >back</button>
      </Link>
      <div className="cart-items-container py-5 divider">
        {items.map((item, index) => (
          <CartCard
            key={`${item.title}-${index}`}
            data={item}
            dispatcher={dispatcher}
            quantityChange={quantityChange}
          />
        ))}
      </div>
      <div className="py-5 divider">
        <div className="row mb-3">
          <div className="col-6">SUBTOTAL</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${subTotal}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">SHIPPING</div>
          <div className="col-6  d-flex justify-content-end">
            <b>{shipping > 0 ? `$${shipping}` : "FREE"}</b>
          </div>
        </div>
      </div>
      <div className="py-5 divider">
        <div className="row mb-3">
          <div className="col-6">TOTAL:</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${total}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
