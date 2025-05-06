import ActivityForm from "@/components/ActivityForm";

export default function HomePage() {
  const handleFormSubmit = (data) => {
    // Aquí puedes manejar el envío del formulario
    console.log(data);
  };
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <ActivityForm onSubmit={handleFormSubmit} />
    </div>
  );
}
