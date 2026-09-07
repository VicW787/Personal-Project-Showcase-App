import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { API_URL } from "../api.js";
import TextField from "../components/TextField.jsx";
 

function CoffeeDetail() {
  
  const { id } = useParams();
  const navigate = useNavigate();
 
  const { data: coffee, setData: setCoffee, loading, error } =
    useFetch(`${API_URL}/coffee/${id}`);
 
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
 
  if (loading) return <p className="message">Loading…</p>;
  if (error) return <p className="message">We couldn't find that coffee.</p>;
 
  
  const priceValue = price === "" ? String(coffee.price) : price;
  const descriptionValue = description === "" ? coffee.description : description;
 
  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
 
    
    fetch(`${API_URL}/coffee/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: Number(priceValue),
        description: descriptionValue,
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setCoffee(updated);   // show the server's version, not our guess
        setPrice("");
        setDescription("");
        setSaved(true);
      })
      .finally(() => setSaving(false));
  }
 
  function handleDelete() {
    fetch(`${API_URL}/coffee/${id}`, { method: "DELETE" })
      .then(() => navigate("/shop"));   // send the admin back to the grid
  }
 
  return (
    <main className="detail">
      <Link to="/shop" className="back-link">Back to the shop</Link>
 
      <h1>{coffee.name}</h1>
      <p className="detail-meta">
        {coffee.origin} · ${Number(coffee.price).toFixed(2)}
      </p>
      <p className="detail-description">{coffee.description}</p>
 
      <form className="panel" onSubmit={handleSave}>
        <h2>Edit this coffee</h2>
 
        <TextField
          label="Price"
          name="price"
          type="number"
          value={priceValue}
          onChange={(e) => { setPrice(e.target.value); setSaved(false); }}
          hint="In dollars, e.g. 12.50"
        />
 
        <TextField
          label="Description"
          name="description"
          value={descriptionValue}
          onChange={(e) => { setDescription(e.target.value); setSaved(false); }}
        />
 
        <button type="submit" className="button" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
 
        {saved && <p className="success-text">Saved.</p>}
      </form>
 
      <button type="button" className="button button-quiet" onClick={handleDelete}>
        Remove from the shop
      </button>
    </main>
  );
}
 
export default CoffeeDetail;