import { StyledLinkButton } from "./Style";
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
  display: inline-block;
  background-color: black;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  border: 1px solid black;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: all 0.2s ease;

  width: 150px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 768px) {
    width: 110px;
  }
`;
const ThumbnailImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    width: 110px;
    height: 80px;
  }
`;
const ThumbnailTitle = styled.p`
  text-align: center;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;
