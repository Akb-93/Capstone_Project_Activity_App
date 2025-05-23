import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";

export default function ActivityCard({
  activity,
  onFavoriteToggle,
  isFavorite
}) {
  const router = useRouter();
  const { pathname: from } = router;

  if (!activity) {
    return null;
  }

  return (
    <Card>
      <StyledFavoriteButton
        activityId={activity._id}
        isFavorite={isFavorite}
        onToggle={onFavoriteToggle}
      />

      <ImageWrapper>
        <Image
          src={activity.imageUrl || `/images/placeholder.jpg`}
          alt={activity.title}
          width={500}
          height={500}
        />
      </ImageWrapper>
      <CardContent>
        <Link href={{pathname: `/activities/${activity._id}`, query: {from: from}}}>
          <Title>{activity.title || "Untitled Activity"}</Title>
        </Link>
        <Country>{activity.country || "No country specified"}</Country>
        <TagList>
          {activity.categories && activity.categories.length > 0 ? (
            activity.categories.map((category) => (
              <Tag key={category._id || category.name}>{category.name}</Tag>
            ))
          ) : (
            <Tag>No categories</Tag>
          )}
        </TagList>
      </CardContent>
    </Card>
  );
}

//Styled Components

const StyledFavoriteButton = styled(FavoriteButton)`
  position: absolute;
  top: 20;
  right: 20;
  z-index: 1000;
`;
const Card = styled.article`
  position: relative;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
  border: 2px solid #ddd;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardContent = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: var(--space-5) var(--space-3);

  color: white;
  background: rgba(0, 0, 0, 0.75);
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
  font-weight: 600;
`;

const Country = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const TagList = styled.ul`
  margin-top: 0.5rem;
  padding: 0;
  list-style: none;
`;

const Tag = styled.li`
  display: inline-block;
  background-color: rgb(174, 208, 248, 0.8);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const ImageWrapper = styled.figure`
  width: 100%;
  height: 200px;
  background-color: #eee;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
  margin: 0;
  margin-bottom: 1em;
  z-index: -1;
`;
