function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      type="search"
      placeholder="Search"
      aria-label="Search coffee"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
 
export default SearchBar;