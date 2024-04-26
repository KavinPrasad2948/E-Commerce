import { Button } from "reactstrap";
import Accordian from "./Accordian";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { removeItemFromCart } from "../Redux/Reducers/Cart";

export default function CartCard({
  data = {},
  dispatcher = () => {},
  quantityChange = () => {}, // Remove dispatcher prop
}) {
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleDelete = () => {
    dispatch(removeItemFromCart(data.id)); // Dispatch removeItemFromCart action with data.id
  };

  return (
    <div className="cart-item mb-3">
      <div className="row">
        <div className="col-md-3">
          <img className="product_image" src={data.image} alt="book" />
        </div>
        <div className="col-md-9">
          <h4>{data.title}</h4>
          <Accordian
            options={[
              {
                title: "Details & Care",
                description: data.description,
              },
            ]}
          />
          <div className="row">
            <div className="col-md-6">
              <select
                defaultValue={data.quantity}
                className="quantity_changer form-control"
                onChange={(e) =>
                  dispatcher(
                    quantityChange({ id: data.id, value: e.target.value })
                  )
                }
              >
                <option value={0}>Select Quantity</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="col-md-6">
              <h5>${data.price}</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-right">
              <Button type="button" color="danger" onClick={handleDelete}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CartCard.propTypes = {
  data: PropTypes.object,
  dispatcher: PropTypes.func,
  quantityChange: PropTypes.func,
};
