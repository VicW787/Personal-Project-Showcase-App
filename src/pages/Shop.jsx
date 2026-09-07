import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { API_URL } from "../api.js";
import SearchBar from "../components/SearchBar.jsx";
import OriginFilter from "../components/OriginFilter.jsx";
import CoffeeCard from "../components/CoffeeCard.jsx";
 
function Shop() {
  
  const { data: coffees, loading, error } = useFetch(`${API_URL}/coffee`);
 
  
  const [search, setSearch] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState([]);
 
  function toggleOrigin(origin) {
    setSelectedOrigins((current) =>
      current.includes(origin)
        ? current.filter((o) => o !== origin)   
        : [...current, origin]                  
    );
  }
 
  if (loading) return <p className="message">Loading coffee…</p>;
  if (error) return <p className="message">{error} Is json-server running?</p>;
 

  const origins = [...new Set(coffees.map((c) => c.origin))].sort();
 
  const visible = coffees.filter((coffee) => {
    const term = search.toLowerCase();
    const matchesSearch =
      coffee.name.toLowerCase().includes(term) ||
      coffee.description.toLowerCase().includes(term);
 
    const matchesOrigin =
      selectedOrigins.length === 0 || selectedOrigins.includes(coffee.origin);
 
    return matchesSearch && matchesOrigin;
  });
 
  return (
    <main className="shop">
      <aside className="sidebar">
        <SearchBar value={search} onChange={setSearch} />
        <OriginFilter
          origins={origins}
          selected={selectedOrigins}
          onToggle={toggleOrigin}
        />
      </aside>
 
      <section className="grid">
        {visible.length === 0 ? (
          <p className="message">No coffee matches that. Try a different search.</p>
        ) : (
          visible.map((coffee) => <CoffeeCard key={coffee.id} coffee={coffee} />)
        )}
      </section>
    </main>
  );
}
 
export default Shop;