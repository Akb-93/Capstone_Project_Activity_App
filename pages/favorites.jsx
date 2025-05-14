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
      setFavoriteActivities(prevActivities => 
        prevActivities.filter(activity => activity._id !== activityId)
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (favoriteActivities.length === 0) {
    return (
      <div>
        <h1>No Favorites Yet</h1>
        <p>You haven't bookmarked any activities yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Favorite Activities</h1>
      <div>
        {favoriteActivities.map(activity => (
          <ActivityCard 
            key={activity._id} 
            activity={activity}
            onFavoriteToggle={(isFavorite) => handleFavoriteToggle(activity._id, isFavorite)}
          />
        ))}
      </div>
    </div>
  );
} 