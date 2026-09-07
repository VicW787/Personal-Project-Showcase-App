import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
 

function Home() {
  const store = useStore();
 
  if (!store) {
    return <p className="message">Loading the shop…</p>;
  }
 
  return (
    <main className="hero">
      <h1>{store.name}</h1>
      <p className="tagline">{store.description}</p>
      <p className="phone">Call us on {store.phone_number}</p>
 
      <div className="hero-links">
        <Link to="/shop" className="button">Browse the coffee</Link>
        <Link to="/admin" className="button button-quiet">Add a coffee</Link>
      </div>
    </main>
  );
}

export default Home;