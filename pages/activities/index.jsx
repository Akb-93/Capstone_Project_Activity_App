//activities list where we put all the components
import useSWR from "swr";
import HeroCard from "@/components/HeroCard";
import ActivityCard from "@/components/ActivityCard";
import styled from "styled-components";
import AddButton from "@/components/AddButton";

export default function ActivitiesPage() {
  const { data: activities, error, isLoading } = useSWR("/api/activities");

  if (error) return <p>Failed to load activities.</p>;
  if (isLoading) return <p>Loading activities...</p>;
  if (!activities || activities.length === 0)
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

      <StyledActivityGrid>
        {activities.map((activity) => (
          <ActivityCard key={activity._id} activity={activity} from="/activities"/>
        ))}
      </StyledActivityGrid>
      <AddButton />
    </>
  );
}

//Styled Components
const StyledActivityGrid = styled.main`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
