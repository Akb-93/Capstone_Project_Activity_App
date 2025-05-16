import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import ActivityCard from '../components/ActivityCard';

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Load favorite IDs from localStorage on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Filter out any null or invalid IDs
    const validFavorites = favorites.filter(id => id && typeof id === 'string' && id.length > 0);
    setFavoriteIds(validFavorites);
  }, []);

  // Fetch all favorite activities using SWR with global fetcher
  const { data: activities, error, isLoading } = useSWR(
    favoriteIds.length > 0 ? favoriteIds.map(id => `/api/activities/${id}`) : null,
    async (urls) => {
      try {
        const responses = await Promise.all(
          urls.map(url => fetch(url))
        );
        const data = await Promise.all(
          responses.map(async (res) => {
            if (!res.ok) {
              return null;
            }
            return res.json();
          })
        );
        // Filter out any false fetches
        return data.filter(activity => activity !== null);
      } catch (error) {
        console.error('Error fetching activities:', error);
        return [];
      }
    }
  );

  const handleFavoriteToggle = (activityId, isNowFavorite) => {
    if (!isNowFavorite) {
      setFavoriteIds(prevIds => prevIds.filter(id => id !== activityId));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>Failed to load favorite activities</p>
      </div>
    );
  }

  if (!favoriteIds.length) {
    return (
      <div>
        <h1>No Favorites Yet</h1>
        <p>You have not bookmarked any activities yet.</p>
      </div>
    );
  }

  // If we have no valid activities after filtering
  if (!activities || activities.length === 0) {
    return (
      
        <h1>None of your favorited activities could be loaded.</h1>
       );
  }

  return (
    <Main>
      <Title>My Favorite Activities</Title>
      <StyledActivityGrid>
        {activities.map(activity => (
          <ActivityCard 
            key={activity._id} 
            activity={activity}
            onFavoriteToggle={(isFavorite) => handleFavoriteToggle(activity._id, isFavorite)}
          />
        ))}
      </StyledActivityGrid>
    </Main>
  );
} 

const StyledActivityGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  @media (max-width: 375px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
font-size: 2rem;

`;

const Main = styled.h1`

`;