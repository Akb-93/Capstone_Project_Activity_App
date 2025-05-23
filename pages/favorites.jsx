import useLocalStorageState from "use-local-storage-state";
import ActivityCard from "../components/ActivityCard";
import styled from "styled-components";
import useSWR from "swr";
import { useEffect, useState } from "react";
import HeroCard from "@/components/HeroCard";

export default function Favorites() {
  const [favoriteIds, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const [localActivities, setLocalActivities] = useState([]);
  const { data: activities, error } = useSWR(
    favoriteIds.length > 0 ? ["/api/activities/favourites", favoriteIds] : null,
    async ([url, ids]) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorite activities");
      }
      return response.json();
    }
  );
  useEffect(() => {
    if (activities) {
      setLocalActivities(activities);
    }
  }, [activities]);
  const handleFavoriteToggle = (activityId) => {
    const newFavorites = favoriteIds.filter((id) => id !== activityId);
    setFavorites(newFavorites);

    setLocalActivities((prev) =>
      prev.filter((activity) => activity._id !== activityId)
    );
  };

  if (error) {
    return <Title>Error</Title>;
  }

  return (
    <StyledFavoritesWrapper>
      {favoriteIds.length === 0 ? (
        <>
          <Title>No Favorites Yet</Title>
          <EmptyStateText>Please add activities.</EmptyStateText>
        </>
      ) : (
        <>
          <HeroCard title="Your favorites" subtitle="Revisit the hikes you loved, the cafes you raved about, and all
              your favorite adventures." bgImage="/images/fiji-sailing.jpg"/>
          <StyledFavorites>
            {localActivities.map((activity) => (
              <ActivityCard
                key={activity._id}
                activity={activity}
                onFavoriteToggle={() => handleFavoriteToggle(activity._id)}
                isFavorite={true}
                from="/favorites"
              />
            ))}
          </StyledFavorites>
        </>
      )}
    </StyledFavoritesWrapper>
  );
}

const Title = styled.h1`
  margin-top: var(--space-4);
  font-size: var(--text-16);
  text-align: center;
`;

const StyledFavoritesWrapper = styled.section``;

const StyledFavorites = styled.article`
  padding: 1rem;
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;
const EmptyStateText = styled.p`
  font-size: var(--text-14);
  text-align: center;
`;
