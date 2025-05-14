import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ActivityCard from '../components/ActivityCard';

export default function Favorites() {
  const [favoriteActivities, setFavoriteActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (!Array.isArray(favorites)) {
        setError('Invalid favorites data');
        setLoading(false);
        return;
      }

      if (favorites.length === 0) {
        setLoading(false);
        setFavoriteActivities([]);
        return;
      }

      const activities = await Promise.all(
        favorites.map(async (id) => {
          try {
            const response = await fetch(`/api/activities/${id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch activity ${id}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error(`Error fetching activity ${id}:`, error);
            return null;
          }
        })
      );

      const validActivities = activities.filter(activity => activity !== null);
      setFavoriteActivities(validActivities);
    } catch (error) {
      console.error('Error loading favorite activities:', error);
      setError('Failed to load favorite activities');
    } finally {
      setLoading(false);
    }
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

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={loadFavorites}>Try Again</button>
      </div>
    );
  }

  if (favoriteActivities.length === 0) {
    return (
      <div>
        <h1>No Favorites Yet</h1>
        <p>You haven&apos;t bookmarked any activities yet.</p>
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