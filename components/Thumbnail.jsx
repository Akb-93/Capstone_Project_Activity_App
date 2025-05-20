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

//thumbnail:
const ThumbnailWrapper = styled(Link)`
  display: flex;
  width: 70%;
  max-width: 130px;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  border: 1px solid black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  flex: 0 0 auto; /* evita que se encoja o crezca */

  &:hover {
    transform: scale(1.1);
  }

  @media (min-width: 769px) {
    width: 9%; /* para desktop, entran aprox 10 thumbnails */
  }
`;

const ThumbnailImage = styled.img`
  width: 80%;
  height: 60px;
  max-height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    max-height: 80px;
  }
`;

const ThumbnailTitle = styled.p`
  margin: 0;
  padding: 0;
`;
