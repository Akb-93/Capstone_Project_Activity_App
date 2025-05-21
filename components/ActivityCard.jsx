import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function ActivityCard({ activity }) {
  return (
    <Card>
      <ImageWrapper
        src={activity.imageUrl || `/images/placeholder.jpg`}
        alt={activity.title}
        width={500}
        height={500}
      />
      <CardContent>
        <Link href={`/activities/${activity._id}`}>
          <Title>{activity.title}</Title>
        </Link>
        <Country>{activity.country}</Country>
        <TagList>
          {activity.categories.map((category) => (
            <Tag key={category._id}>{category.name}</Tag>
          ))}
        </TagList>
      </CardContent>
    </Card>
  );
}

//Styled Components
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
  padding: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 600;
`;

const Country = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const TagList = styled.ul`
  margin-top: 0.5rem;
`;

const Tag = styled.li`
  display: inline-block;
  background-color: var(--c-red-400);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  margin-right: 0.5rem;
  font-size: 0.875rem;
`;

const ImageWrapper = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;
