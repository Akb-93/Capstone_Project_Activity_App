import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import ActivityCard from "../components/ActivityCard";
import styled from "styled-components";



export default function Favorites() {
  const [favoriteIds, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: []
  });
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavoriteActivities() {
      if (favoriteIds.length === 0) {
        setActivities([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/activities/favourites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: favoriteIds }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch favorite activities");
        }

        const data = await response.json();
        const foundIds = data.map(activity => activity._id);
        if (foundIds.length !== favoriteIds.length) {
          setFavorites(foundIds);
        }

        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavoriteActivities();
  }, [favoriteIds, setFavorites]);

  if (favoriteIds.length === 0) {
    return (
      <StyledFavListWrapper>
        <Title>No Favorites Yet</Title>
        <StatusMessage>
          <p>You haven&apos;t added any activities to your favorites yet.</p>
        </StatusMessage>
      </StyledFavListWrapper>
    );
  }

  if (isLoading) {
    return (
      <StyledFavListWrapper>
        <StatusMessage>
          Loading your favorite activities...
        </StatusMessage>
      </StyledFavListWrapper>
    );
  }

  if (error) {
    return (
      <StyledFavListWrapper>
        <Title>Oops! Something went wrong</Title>
        <StatusMessage>
          <p>{error}</p>
        </StatusMessage>
      </StyledFavListWrapper>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <StyledFavListWrapper>
        <Title>No Activities Found</Title>
        <StatusMessage>
          <p>We couldn&apos;t find any of your favorited activities.</p>
        </StatusMessage>
      </StyledFavListWrapper>
    );
  }

  return (
    <StyledFavListWrapper>
      <Title>My Favorite Activities</Title>
      <StyledFavList>
        {activities.map(activity => (
          <ActivityCard 
            key={activity._id} 
            activity={activity}
          />
        ))}
      </StyledFavList>
    </StyledFavListWrapper>
  );
} 

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StyledFavListWrapper = styled.section`
  padding: 1rem;
`;

const StatusMessage = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  margin: 1rem 0;
`;

const StyledFavList = styled.article`
   display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
