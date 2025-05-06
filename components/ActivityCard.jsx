//hhhhh

export default function ActivityCard({ activity }) {
  return (
    <article
      className="activityCard"
      data-bg={activity.imageUrl || "/placeholder.jpg"}
    >
      <section className="cardContent">
        <h2 className="cardTitle">{activity.title}</h2>
        <p className="cardCountry">{activity.country}</p>
        <ul className="cardTags">
          {activity.categories.map((category) => (
            <li key={category._id} className="tag">
              {category.name}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
