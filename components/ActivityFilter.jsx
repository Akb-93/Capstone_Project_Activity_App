import { useEffect, useState } from "react";

export default function ActivityFilter({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value); // pass selected category _id
  };

  const handleReset = () => {
    setSelected("");
    onChange(""); // reset filter
  };

  return (
    <section>
      <label htmlFor="category-filter">Filter by Category</label>
      <select
        id="category-filter"
        value={selected}
        onChange={handleChange}
        aria-label="Select category"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}
