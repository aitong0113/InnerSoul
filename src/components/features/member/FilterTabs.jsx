import "./FilterTabs.scss";

function FilterTabs({ options, activeFilter, onChange }) {
  return (
    <div className="filter-tabs">
      {options.map((option) => (
        <button
          key={option}
          className={`filter-tab ${activeFilter === option ? "active" : ""}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
