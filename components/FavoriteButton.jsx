import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
export default function FavoriteButton({ activityId }) {
  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  const isFavorite = favorites.includes(activityId);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((id) => id !== activityId));
    } else {
      setFavorites([...favorites, activityId]);
    }
  };

  return (
    <Button
      onClick={toggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <HeartIcon viewBox="0 0 24 24">
        <HeartPath
          $isFavorite={isFavorite}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </HeartIcon>
    </Button>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const HeartIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke-width: 2;
`;

const HeartPath = styled.path`
  fill: ${(props) => (props.$isFavorite ? "#ff4d4d" : "none")};
  stroke: ${(props) => (props.$isFavorite ? "#ff4d4d" : "#666")};
  transition: fill 0.2s, stroke 0.2s;
`;
