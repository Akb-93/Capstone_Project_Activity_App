import { useEffect, useState } from "react";

export default function ActivityFilter({ selectedCategory, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value); // passing selected category _id back to parent
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <section>
      <select
        id="category-filter"
        value={selectedCategory}
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
