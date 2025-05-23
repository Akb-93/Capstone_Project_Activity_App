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
  if (activitiesError)
    return <StyledEmptyState>Failed to load activities.</StyledEmptyState>;
  if (!activities)
    return <StyledEmptyState>Loading activities...</StyledEmptyState>;
  if (activities.length === 0)
    return (
      <>
        <HeroCard title="Ready to unplug?" subtitle="Get started now and turn free time into lifetime stories." bgImage="/images/interlaken-paragliding.jpg">
        </HeroCard>
        <ActivityFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
        <StyledEmptyState>
          No activities available. Click on the + button to add one.
        </StyledEmptyState>
        <AddButton />
      </>
    );

  return (
    <>
      <HeroCard title="Ready to unplug?" subtitle="Get started now and turn free time into lifetime stories." bgImage="/images/interlaken-paragliding.jpg">
      </HeroCard>
      <StyledFilterWrapper>
        <ActivityFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </StyledFilterWrapper>
      {!activities || activities.length === 0 ? (
        <>
          <StyledEmptyState>
            No activities found for this filter.
          </StyledEmptyState>
          <AddButton />
        </>
      ) : (
        <>
          <StyledActivityGrid>
            {activities.map((activity) => (
              <ActivityCard key={activity._id} activity={activity} from="activities"/>
            ))}
          </StyledActivityGrid>
          <AddButton />
        </>
      )}
    </>
  );
}

//Styled Components
const StyledActivityGrid = styled.main`
  display: grid;
  gap: var(--space-2);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin-left: var(--space-3);
  margin-right: var(--space-3);
  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

const StyledEmptyState = styled.p`
  text-align: center;
  margin-top: var(--space-4);
  font-size: var(--text-16);
`;

const StyledFilterWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-3);
  margin-top: 1rem;
  margin-bottom: var(--space-2);
  @media (max-width: 600px) {
    flex-direction: row;
    align-items: stretch;
    width: 100%;
  }

  @media (max-width: 400px) {
    padding: var(--space-2);
  }
`;
