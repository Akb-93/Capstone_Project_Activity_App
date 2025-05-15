import { StyledLinkButton, ImageContainer, ThumbnailImage } from "./Style";

export default function Thumbnail({ activity }) {
  return (
    <StyledLinkButton href={`/activities/${activity._id}`}>
      <ImageContainer>
        <ThumbnailImage
          src={activity.imageUrl || "/images/placeholder.jpg"}
          alt={activity.title}
          width={150}
          height={100}
        />
      </ImageContainer>
      <p>{activity.title}</p>
    </StyledLinkButton>
  );
}
