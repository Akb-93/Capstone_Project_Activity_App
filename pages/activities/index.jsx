import { useState } from "react";
import useSWR from "swr";
import HeroCard from "@/components/HeroCard";
import ActivityCard from "@/components/ActivityCard";
import styled from "styled-components";
import AddButton from "@/components/AddButton";
import ActivityFilter from "@/components/ActivityFilter";

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const activitiesUrl = selectedCategory
    ? `/api/activities?category=${selectedCategory}`
    : "/api/activities";
  const { data: activities, error: activitiesError } = useSWR(activitiesUrl);
  if (activitiesError) return <p>Failed to load activities.</p>;
  if (!activities) return <p>Loading activities...</p>;
  if (activities.length === 0)
    return (
      <>
        <HeroCard title="Activities List">
          <p>Choose your fun</p>
        </HeroCard>
        <p>No activities available. Click on the + button to add one.</p>
        <AddButton />
      </>
    );

  return (
    <>
      <HeroCard title="Activities List">
        <p>Choose your fun</p>
      </HeroCard>
      <StyledFilterWrapper>
        <ActivityFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </StyledFilterWrapper>
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

const StyledFilterWrapper = styled.section`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
