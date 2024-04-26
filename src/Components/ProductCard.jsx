import PropTypes from "prop-types";
import { Button, Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

export default function ProductCard({
  data = {},
  addToCart = () => {},
  isAddedToCart = false,
}) {
  return (
    <Card className="product-card mb-3">
      <CardImg top src={data.image} alt={data.title} style={{ width:"200px",height: "auto", objectFit: "cover" }} />
      <CardBody>
        <CardTitle tag="h5" className="mb-2">{data.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{data.category}</CardSubtitle>
        <p className="mb-2"><i>{data.author}</i></p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>${data.price}</h4>
          <Button
            disabled={isAddedToCart}
            color="primary"
            onClick={() => addToCart({ ...data, quantity: 1 })}
          >
            {isAddedToCart ? "Added" : "Add to Cart"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

ProductCard.propTypes = {
  data: PropTypes.object,
  addToCart: PropTypes.func,
  isAddedToCart: PropTypes.bool,
};
