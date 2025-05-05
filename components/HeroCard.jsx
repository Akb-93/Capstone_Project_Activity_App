//hhh

export default function HeroCard({ title, children }) {
  return (
    <div className="heroCard">
      <h1 className="title">{title}</h1>
      {children}
    </div>
  );
}
