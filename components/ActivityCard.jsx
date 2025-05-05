//hhhhh

export default function ActivityCard({ activity }) {
  return (
    <div
      className="activityCard"
      style={{ backgroundImage: `url(${activity.imageUrl})` }}
    >
      <div className="cardContent">
        <h2 className="cardTitle">{activity.title}</h2>
        <p className="cardCountry">{activity.country}</p>
        <div className="cardTags">
          {activity.categories.map((category) => (
            <span key={category._id} className="tag">
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
