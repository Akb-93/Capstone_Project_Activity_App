import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ActivityCard from '../components/ActivityCard';

export default function Favorites() {
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.length === 0) {
      setLoading(false);
      setFavoriteActivities([]);
      return;
    }

    try {
      const activities = await Promise.all(
        favorites.map(id => 
          fetch(`/api/activities/${id}`).then(res => res.json())
        )
      );
      setFavoriteActivities(activities);
    } catch (error) {
      console.error('Error loading favorite activities:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleFavoriteToggle = (activityId, isNowFavorite) => {
    if (!isNowFavorite) {
      // If the activity was unfavorited, remove it from the list immediately
      setFavoriteActivities(prevActivities => 
        prevActivities.filter(activity => activity._id !== activityId)
      );
    }
  };

  if (loading) {
    return <LoadingMessage>Loading favorites...</LoadingMessage>;
  }

  if (favoriteActivities.length === 0) {
    return (
      <EmptyState>
        <h1>No Favorites Yet</h1>
        <p>You haven&apos;t bookmarked any activities yet. Start exploring and add some favorites!</p>
      </EmptyState>
    );
  }

  return (
    <Container>
      <h1>My Favorite Activities</h1>
      <ActivityGrid>
        {favoriteActivities.map(activity => (
          <ActivityCard 
            key={activity._id} 
            activity={activity}
            onFavoriteToggle={(isFavorite) => handleFavoriteToggle(activity._id, isFavorite)}
          />
        ))}
      </ActivityGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 2rem;
    color: #333;
  }
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
  font-size: 1.2rem;
`; 