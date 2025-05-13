import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";

export default function ActivityDetailPage() {
  const router = useRouter();
  const { id } = router.query; // to access [id] from the route

  // SWR fetch activity data from API route
  const {
    data: activity,
    error,
    isLoading,
  } = useSWR(id ? `/api/activities/${id}` : null);

  if (error) return <p>Failed to load activity.</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!activity) return <p>No activity found.</p>;

  return (
    <>
      <Header>
        <Title>{activity.title}</Title> {/* Centered */}
      </Header>
      <BackButton onClick={() => router.back()}>←Back</BackButton>{" "}
      <ImageWrapper
        src={activity.imageUrl || `/images/placeholder.jpg`}
        alt={activity.title}
        width={500}
        height={500}
      />
      <Description>{activity.description}</Description>
      <Categories>
        <strong>Categories:</strong>
        {activity.categories?.length ? (
          activity.categories.map((cat) => (
            <CategoryTag key={cat._id}>{cat.name}</CategoryTag>
          ))
        ) : (
          <p>No categories</p>
        )}
      </Categories>
      <LocationInfo>
        <p>
          <strong>Area:</strong>
          {activity.area || "N/A"}
        </p>
        <p>
          <strong>Country:</strong>
          {activity.country || "N/A"}
        </p>
      </LocationInfo>
    </>
  );
}

// Styled components

const Header = styled.header`
  background-color: #f5f5dc;
  border: 2px solid rgb(9, 9, 8);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  text-align: center;
`;

const BackButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
  background: none;
  border: none;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #4a3f35;
  margin: 0;
`;
const ImageWrapper = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;
const Description = styled.article`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const Categories = styled.ul`
  font-size: 1rem;
  margin-bottom: 1rem;
  list-style: none;
  padding: 0 1rem;
`;

const CategoryTag = styled.li`
  background-color: #4a90e2;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  width: auto;
`;

const LocationInfo = styled.section`
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 100px;
`;
