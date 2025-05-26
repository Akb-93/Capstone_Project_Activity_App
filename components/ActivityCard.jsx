import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";

export default function ActivityCard({
  activity,
  onFavoriteToggle,
  isFavorite,
}) {
  const router = useRouter();
  const { pathname: from } = router;

  if (!activity) {
    return null;
  }

  return (
    <Card>
      <ButtonContainer>
        <FavoriteButton
          activityId={activity._id}
          isFavorite={isFavorite}
          onToggle={onFavoriteToggle}
        />
      </ButtonContainer>
      <ImageWrapper>
        <StyledImage
          src={activity.imageUrl || `/images/placeholder.jpg`}
          alt={activity.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </ImageWrapper>
      <CardContent>
        <StyledTitleLink
          href={{ pathname: `/activities/${activity._id}`, query: { from } }}
        >
          {activity.title || "Untitled Activity"}
        </StyledTitleLink>
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

// Styled Components

const Card = styled.article`
  position: relative;
  width: 100%;
  height: 250px;
  border: 2px solid var(--c-neutral-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const ButtonContainer = styled.aside`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 3;
`;

const ImageWrapper = styled.figure`
  position: absolute;
  inset: 0;
  margin: 0;
  z-index: 0;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const CardContent = styled.section`
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: var(--space-2);
  padding-top: var(--space-1);
  color: var(--c-neutral-000);
  background: var(--c-dark-600);
  width: 100%;
  height: 40%;
  z-index: 2;
`;

const StyledTitleLink = styled(Link)`
  display: block;
  font-size: var(--text-20);
  font-weight: 500;
  color: var(--c-neutral-000);
  text-decoration: none;
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
  }
`;

const Country = styled.p`
  font-size: var(--text-14);
  margin: 0 0 4px 0;
  font-weight: 300;
  padding-top: 4px;
  padding-bottom: 6px;
`;

const TagList = styled.ul`
  margin-top: var(--space-1);
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
`;

const Tag = styled.li`
  background-color: var(--c-neutral-050);
  color: var(--c-dark-600);
  padding: 2px 6px;
  border-radius: var(--radius-md);
  font-size: 10px;
  line-height: 16px;
  white-space: nowrap;
  max-width: max-content;
`;
