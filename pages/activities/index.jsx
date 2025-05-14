import { useState } from "react";
import useSWR from "swr";
import HeroCard from "@/components/HeroCard";
import ActivityCard from "@/components/ActivityCard";
import styled from "styled-components";
import AddButton from "@/components/AddButton";
// Generic fetcher for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  // Fetch categories for the dropdown
  const { data: categories, error: categoryError } = useSWR(
    "/api/categories",
    fetcher
  );
  // Fetch activities (filtered if category is selected)
  const activitiesUrl = selectedCategory
    ? `/api/activities?category=${selectedCategory}`
    : "/api/activities";
  const {
    data: activities,
    error: activitiesError,
    isLoading,
  } = useSWR(activitiesUrl, fetcher);
  // Handle filter reset
  const handleReset = () => setSelectedCategory("");
  if (activitiesError || categoryError) return <p>Failed to load data.</p>;
  if (isLoading) return <p>Loading activities...</p>;
  return (
    <>
      <HeroCard title="Activities List">
        <p>Choose your fun</p>
      </HeroCard>
      <FilterBar>
        <label htmlFor="category-select">Filter by category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={handleReset}>Reset</button>
      </FilterBar>
      {!activities || activities.length === 0 ? (
        <>
          <p>No activities found for this filter.</p>
          <AddButton />
        </>
      ) : (
        <>
          <StyledActivityGrid>
            {activities.map((activity) => (
              <ActivityCard key={activity._id} activity={activity} />
            ))}
          </StyledActivityGrid>
          <AddButton />
        </>
      )}
    </>
  );
}
const StyledActivityGrid = styled.main`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
const FilterBar = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 2rem;
  select,
  button {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;
