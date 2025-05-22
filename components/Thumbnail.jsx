import styled from "styled-components";
import Link from "next/link";

export default function Thumbnail({ activity }) {
  return (
    <ThumbnailWrapper href={`/activities/${activity._id}`}>
      <ThumbnailImage
        src={activity.imageUrl || "/images/placeholder.jpg"}
        alt={activity.title}
        width={150}
        height={100}
      />
      <ThumbnailTitle>{activity.title}</ThumbnailTitle>
    </ThumbnailWrapper>
  );
}

const ThumbnailWrapper = styled(Link)`
  display: flex;
  width: 120px;
  height: 140px;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0.8rem 1rem;
  border-radius: 16px; /* borde redondeado 16px */
  border: 1px solid black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  flex: 0 0 auto;

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 769px) {
    width: 140px;
    min-width: 140px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 90px;
  border-radius: 16px; /* borde redondeado 16px */
  object-fit: cover;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 769px) {
    height: 80px;
  }
`;

const ThumbnailTitle = styled.p`
  margin: 0;
  padding: 0;
`;
