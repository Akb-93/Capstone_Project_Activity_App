import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";
import activityImage from "public/images/placeholder.jpg";
import { StyledButton, StyledLink } from "@/components/StyledComponents";
import ConfirmModal from "@/components/ConfirmationModal";
import { useState } from "react";
import FavoriteButton from "@/components/FavoriteButton";

export default function ActivityDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { id, from } = router.query;

  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(id ? `/api/activities/${id}` : null);

  if (error) return <p>Failed to load activity.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!activity) return <p>No activity found.</p>;

  async function handleDelete() {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }
    setShowModal(false);
    router.push("/activities");
  }

  function handleBack() {
    if (from) {
      router.push(from);
    } else {
      router.push("/activities");
    }
  }

  return (
    <>
      <Wrapper>
        <StyledImage
          src={activity.imageUrl ? activity.imageUrl : activityImage}
          alt="Activity background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </Wrapper>
      <BackButton onClick={handleBack}>← Back</BackButton>

      <TitleRow>
        <StyledTitle>{activity.title}</StyledTitle>
        <FavoriteButton activityId={activity._id} />
      </TitleRow>

      <StyledDescription>{activity.description}</StyledDescription>

      <CategoriesRow>
        <Label>Categories:</Label>
        {activity.categories?.length ? (
          activity.categories.map((cat) => (
            <CategoryTag key={cat._id}>{cat.name}</CategoryTag>
          ))
        ) : (
          <NoCategories>No categories</NoCategories>
        )}
      </CategoriesRow>

      <LocationInfo>
        <InfoItem>
          <Image
            src="/img/location.svg"
            alt="Area icon"
            width={20}
            height={20}
          />
          <span>
            <Label>Area:</Label> {activity.area || "N/A"}
          </span>
        </InfoItem>
        <InfoItem>
          <Image
            src="/img/globe.svg"
            alt="Country icon"
            width={20}
            height={20}
          />
          <span>
            <Label>Country:</Label> {activity.country || "N/A"}
          </span>
        </InfoItem>
      </LocationInfo>

      <ButtonsRow>
        <EditLinkButton
          href={{
            pathname: `/activities/${id}/edit`,
            query: from ? { from } : {},
          }}
        >
          Edit
        </EditLinkButton>

        <StyledButton $variant="destructive" onClick={() => setShowModal(true)}>
          Delete
        </StyledButton>
      </ButtonsRow>

      {showModal && (
        <ConfirmModal
          title="Confirm Delete"
          message="Do you want to delete the activity?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

// Styled Components

const Wrapper = styled.header`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  color: var(--c-neutral-000);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    z-index: 1;
    pointer-events: none;
  }
`;

const StyledImage = styled(Image)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  z-index: 0;
`;

const BackButton = styled.button`
  font-size: var(--text-16);
  color: var(--c-dark-600);
  background: none;
  border: none;
  margin: 1rem;
  cursor: pointer;
  text-align: left;
  display: block;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
`;

const StyledTitle = styled.h1`
  font-size: var(--text-24);
  font-weight: 600;
  color: var(--c-dark-700);
  margin: 0;
`;

const StyledDescription = styled.article`
  font-size: var(--text-16);
  color: var(--c-dark-600);
  margin-bottom: 1rem;
  padding: 0 1rem;
  max-width: 100%;
`;

const CategoriesRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: var(--space-2);
  margin-bottom: 0;
`;

const Label = styled.span`
  font-size: var(--text-16);
  font-weight: 600;
  color: var(--c-dark-700);
  padding: var(--space-1);
`;

const CategoryTag = styled.span`
  background-color: var(--c-neutral-050);
  color: var(--c-dark-600);
  padding: var(--space-1);
  border-radius: var(--radius-pill);
  font-size: 10px;
  line-height: 16px;
  white-space: nowrap;
`;

const NoCategories = styled.p`
  font-size: var(--text-14);
  color: var(--c-dark-600);
  margin: 0;
`;

const LocationInfo = styled.section`
  font-size: var(--text-14);
  padding: var(--space-1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--space-1);
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0 1rem 2rem;
  align-items: center;

  & > * {
    margin: 0;
  }
`;

const EditLinkButton = styled(StyledLink)`
  background-color: var(--c-neutral-000);
  color: var(--c-dark-600);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-pill);
  border: 1px solid var(--c-dark-600);
  font-size: var(--text-20);
  font-weight: var(--text-bold);
  font-family: var(--font-family);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 110px;

  &:hover {
    opacity: 0.9;
    background-color: var(--c-dark-600);
  }
  &:active {
    transform: scale(0.98);
  }
`;
