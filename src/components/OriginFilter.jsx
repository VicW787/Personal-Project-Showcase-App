function OriginFilter({ origins, selected, onToggle }) {
  return (
    <fieldset className="origin-filter">
      <legend>Origin</legend>
 
      {origins.map((origin) => (
        <label key={origin}>
          <input
            type="checkbox"
            checked={selected.includes(origin)}
            onChange={() => onToggle(origin)}
          />
          {origin}
        </label>
      ))}
    </fieldset>
  );
}
 
export default OriginFilter;