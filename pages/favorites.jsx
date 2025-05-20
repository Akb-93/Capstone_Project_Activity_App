import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";
import ActivityCard from "../components/ActivityCard";
import styled from "styled-components";




export default function Favorites() {
  // favorite ids from local storage
  const [favoriteIds] = useLocalStorageState("favorites", {
    defaultValue: []
  });

  // filter out any null or invalid ids
  const validIds = favoriteIds.filter(id => id && typeof id === "string");

  // fetch the favorite activities
  const { data: activities, error, isLoading, mutate } = useSWR(
    // valid ids?
    validIds.length > 0 ? validIds.map(id => `/api/activities/${id}`) : null,
    async (urls) => {
      try {
        // fetch all activities 
        const responses = await Promise.all(
          urls.map(url => fetch(url))
        );

        // convert responses to json and filter out 
        const activities = await Promise.all(
          responses.map(async (res) => {
            if (!res.ok) return null;
            return res.json();
          })
        );

        // remove null values
        return activities.filter(activity => activity !== null);
      } catch (error) {
        console.error("Error fetching activities:", error);
        return [];
      }
    }
  );

  // check for favorites
  if (favoriteIds.length === 0) {
    return (
      <Messege>
          <Title>No Favorites Yet</Title>
          <StatusMessage role="status">
            <p>You haven&apos;t added any activities to your favorites yet.</p>
          </StatusMessage>
        </Messege>
    );
  }

  // loading state
  if (isLoading) {
    return (
      <Messege>
          <StatusMessage role="status" aria-live="polite">
            Loading your favorite activities...
          </StatusMessage>
      </Messege>
    );
  }

  // show error state
  if (error) {
    return (
      <Messege>
          <Title>Oops! Something went wrong</Title>
          <StatusMessage role="alert">
            <p>We couldn&apos;t load your favorite activities. Please try again later.</p>
          </StatusMessage>
      </Messege>
    );
  }

  // no activities were found
  if (!activities || activities.length === 0) {
    return (
      <Messege>
          <Title>No Activities Found</Title>
          <StatusMessage role="status">
            <p>We couldn&apos;t find any of your favorited activities.</p>
          </StatusMessage>
      </Messege>
    );
  }

  //activities
  return (
    <Messege>
      <Title>My Favorite Activities</Title>
      <Section role="list" aria-label="Favorite activities">
        {activities.map(activity => (
          <ActivityCard 
            key={activity._id} 
            activity={activity}
          />
        ))}
      </Section>
    </Messege>
  );
} 

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Messege = styled.main`
  padding: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  margin: 1rem 0;
`;