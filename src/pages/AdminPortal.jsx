import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api.js";
import TextField from "../components/TextField.jsx";
 



function AdminPortal() {
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    name: "",
    description: "",
    origin: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const firstInputRef = useRef(null);
 
  useEffect(() => {
    firstInputRef.current.focus();
  }, []); 
 

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }
 
  
  function validate() {
    const found = {};
 
    if (!form.name.trim()) found.name = "Give the coffee a name.";
    if (!form.description.trim()) found.description = "Add a short description.";
    if (!form.origin.trim()) found.origin = "Tell us where this coffee comes from.";
 
    if (!form.price.trim()) {
      found.price = "Add a price.";
    } else if (Number.isNaN(Number(form.price)) || Number(form.price) <= 0) {
      found.price = "Price has to be a number above zero.";
    }
 
    return found;
  }
 
  function handleSubmit(e) {
    e.preventDefault(); // stop the browser doing a full page reload
 
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
 
    setSubmitting(true);
 

    fetch(`${API_URL}/coffee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim(),
        description: form.description.trim(),
        origin: form.origin.trim(),
        price: Number(form.price),
      }),
    })
      .then((res) => res.json())
      .then((saved) => navigate(`/shop/${saved.id}`)) // go look at what we made
      .catch(() => setErrors({ form: "We couldn't save that. Is the server running?" }))
      .finally(() => setSubmitting(false));
  }
 
  return (
    <main className="admin">
      <form className="panel" onSubmit={handleSubmit} noValidate>
        <h1>Add a coffee</h1>
 
        <TextField
          label="Coffee Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          inputRef={firstInputRef}
        />
 
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
          hint="Roast and flavour, e.g. Dark roast, rich flavor"
        />
 
        <TextField
          label="Origin"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          error={errors.origin}
          hint="The country it was grown in"
        />
 
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          error={errors.price}
          hint="In dollars, e.g. 12.50"
        />
 
        {errors.form && <p className="error-text" role="alert">{errors.form}</p>}
 
        <button type="submit" className="button" disabled={submitting}>
          {submitting ? "Adding…" : "Add coffee"}
        </button>
      </form>
    </main>
  );
}
 
export default AdminPortal;