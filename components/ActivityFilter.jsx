import { useEffect, useState } from "react";
import styled from "styled-components";

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
    onChange(e.target.value);
  };

  const handleReset = () => {
    onChange("");
  };

  return (
    <FilterWrapper>
      <StyledSelect
        id="category-filter"
        value={selectedCategory}
        onChange={handleChange}
        aria-label="Select category"
      >
        <option value="">Choose a category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </StyledSelect>
      <ResetButton type="button" onClick={handleReset}>
        Reset
      </ResetButton>
    </FilterWrapper>
  );
}

const StyledSelect = styled.select`
  flex: 1 1 auto;
  min-width: 140px;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--c-dark-600);
  border-radius: 6px;
  font-size: var(--text-14);
  color: var(--c-dark-600);
  appearance: none;
  background-color: var(--c-neutral-000);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23262626' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-1) center;
  background-size: 1.2em;
  cursor: pointer;
  height: 40px;
  line-height: 20px;

  &:focus {
    outline: none;
  }
`;

const ResetButton = styled.button`
  padding: var(--space-2) var(--space-4);
  border: 2px solid var(--c-dark-600);
  border-radius: var(--radius-pill);
  font-size: var(--text-16);
  color: var(--c-dark-600);
  background-color: transparent;
  cursor: pointer;
  height: 40px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--c-neutral-050);
  }
`;

const FilterWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
`;
