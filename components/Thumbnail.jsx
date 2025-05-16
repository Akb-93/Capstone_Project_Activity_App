import {
  StyledLinkButton,
  ThumbnailWrapper,
  ThumbnailImage,
  ThumbnailTitle,
} from "./Style";

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
