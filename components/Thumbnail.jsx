import { StyledLinkButton } from "./Style";
import styled from "styled-components";

export default function Thumbnail({ activity }) {
  return (
    <StyledLinkButton href={`/activities/${activity._id}`}>
      <ThumbnailWrapper>
        <ThumbnailImage
          src={activity.imageUrl || "/images/placeholder.jpg"}
          alt={activity.title}
          width={150}
          height={100}
        />

        <ThumbnailTitle>{activity.title}</ThumbnailTitle>
      </ThumbnailWrapper>
    </StyledLinkButton>
  );
}

//thumbnail:

const ThumbnailWrapper = styled.div`
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
