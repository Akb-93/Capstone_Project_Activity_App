//activities list where we put all the components
import useSWR from "swr";
import HeroCard from "@/components/HeroCard";
import ActivityCard from "@/components/ActivityCard";
import styled from "styled-components";
import AddButton from "@/components/AddButton";
import ActivityFilter from "@/components/ActivityFilter";
import { useState } from "react";

export default function ActivitiesPage() {
  // Added category state
  const [category, setCategory] = useState("");

  //Updated SWR key to depend on category
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR(
    category ? `/api/activities?category=${category}` : "/api/activities"
  );

  if (error) return <p>Failed to load activities.</p>;
  if (isLoading) return <p>Loading activities...</p>;
  if (!activities || activities.length === 0)
    return <p>No activities available.</p>;

  return (
    <>
      <HeroCard title="Activities List">
        <p>Choose your fun</p>
      </HeroCard>
      <ActivityFilter onChange={setCategory} /> {/* Added filter component */}
      <StyledActivityGrid>
        {activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} />
        ))}
      </StyledActivityGrid>
      <AddButton />
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
