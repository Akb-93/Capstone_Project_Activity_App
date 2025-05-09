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

  async function handleDelete() {
    const response = await fetch(`/api/activities/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    await response.json();
    setShowModal(false);
    router.push("/");
  }

  return (
    <main>
      <Header>
        <Title>{activity.title}</Title> {/* Centered */}
      </Header>
      <BackButton onClick={() => router.back()}>←Back</BackButton>{" "}
      <ImageWrapper>
        <imgage
          src={activity.imageUrl || "/placeholder.jpg"}
          alt={activity.title}
        />
      </ImageWrapper>
      <Description>{activity.description}</Description>
      <Categories>
        <strong>Categories:</strong>
        {activity.categories?.length ? (
          activity.categories.map((cat) => (
            <CategoryTag key={cat._id}>{cat.name}</CategoryTag>
          ))
        ) : (
          <span>No categories</span>
        )}
      </Categories>
      <LocationInfo>
        <p>Area: {activity.area || "N/A"}</p>
        <p>Country: {activity.country || "N/A"}</p>
      </LocationInfo>
    </main>
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
const ImageWrapper = styled.figure`
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;
const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const Categories = styled.section`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const CategoryTag = styled.span`
  background-color: #4a90e2;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  margin-right: 0.5rem;
`;

const LocationInfo = styled.section`
  font-size: 1rem;
  margin-top: 1rem;
`;
