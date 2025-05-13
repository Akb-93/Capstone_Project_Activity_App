import { useState, useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeartIcon = styled.svg`
  width: 24px;
  height: 24px;
 
  stroke-width: 2;
`;

const HeartPath = styled.path`
 fill: ${props => props.isFavorite ? "#ff4d4d" : "none"};
 stroke: ${props => props.isFavorite ? "#ff4d4d" : "#666"};
`;

export default function FavoriteButton({ activityId, onToggle }) {
    const [isFavorite, setIsFavorite] = useState(false);
  
    useEffect(() => {
      // Load favorite status from localStorage on component mount
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.includes(activityId));
    }, [activityId]);
  
    const toggleFavorite = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      let newFavorites;
  
      if (isFavorite) {
        newFavorites = favorites.filter(id => id !== activityId);
      } else {
        newFavorites = [...favorites, activityId];
      }
  
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      
     
      if (onToggle) {
        onToggle(!isFavorite);
      }
    };

  return (
    <Button onClick={toggleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
     <HeartIcon viewBox="0 0 24 24">
        <HeartPath 
          isFavorite={isFavorite}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
        </HeartIcon>
    </Button>
  );
} 


