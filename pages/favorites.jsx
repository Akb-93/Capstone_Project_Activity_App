import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";
import ActivityCard from "../components/ActivityCard";
import styled from "styled-components";



export default function Favorites() {
  // list of favorite ids from local storage
  const [favoriteIds] = useLocalStorageState("favorites", {
    defaultValue: []
  });

  // filter out any null or invalid id
  const validIds = favoriteIds.filter(id => id && typeof id === "string");

  // fetch the favorite activities
  const { data: activities, error, isLoading } = useSWR(
    // only fetch if valid IDs
    validIds.length > 0 ? validIds.map(id => `/api/activities/${id}`) : null,
    async (urls) => {
      try {
        // all activities
        const responses = await Promise.all(
          urls.map(url => fetch(url))
        );

        // convert to json and filter out failed
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

  // favorites?
  if (favoriteIds.length === 0) {
    return (
      <Main>
        <Title>No Favorites Yet</Title>
        <p>You haven&apos;t added any activities to your favorites yet.</p>
      </Main>
    );
  }

  // loading state
  if (isLoading) {
    return <p>Loading your favorite activities...</p>;
  }

  // error state
  if (error) {
    return (
      <Main>
        <Title>Oops! Something went wrong</Title>
        <p>We could not load your favorite activities. Please try again later.</p>
      </Main>
    );
  }

  // no activities found
  if (!activities || activities.length === 0) {
    return (
      <Main>
        <Title>No Activities Found</Title>
        <p>We could not find any of your favorited activities.</p>
      </Main>
    );
  }

  // activities
  return (
    <Main>
        <Title>My Favorite Activities</Title>
        <Section role="list" aria-label="Favorite activities">
          {activities.map(activity => (
            <ActivityCard 
              key={activity._id} 
              activity={activity}
            />
          ))}
        </Section>
      </Main>
    
  );
} 


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Main = styled.main`
  padding: 1rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;
