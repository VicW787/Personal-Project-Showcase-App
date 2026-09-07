import { Link } from "react-router-dom";
 


function CoffeeCard({ coffee }) {
  return (
    <Link to={`/shop/${coffee.id}`} className="card">
      <h3>{coffee.name}</h3>
      <p className="card-description">{coffee.description}</p>
      <p className="card-meta">{coffee.origin}</p>

      <p className="card-price">${Number(coffee.price).toFixed(2)}</p>
    </Link>
  );
}
 
export default CoffeeCard;