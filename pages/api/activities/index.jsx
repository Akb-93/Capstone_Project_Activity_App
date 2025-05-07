//el backend del POST  para crear, + el GET (alissa esta trabajando)
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const newActivityData = req.body;

    // Validación simple (puedes expandirla según lo que necesites)
    if (!newActivityData.title || !newActivityData.category) {
      return res.status(400).json({ status: "Missing required fields" });
    }

    // Crear nueva actividad
    const newActivity = await Activity.create(newActivityData);

    return res.status(201).json(newActivity); // Devuelve la nueva actividad creada
  }

  // Método no permitido para otros métodos HTTP (GET, PUT, DELETE)
  if (req.method === "GET") {
    const activities = await Activity.find(); // Obtener todas las actividades
    return res.status(200).json(activities);
  }

  res.status(405).json({ status: "Method not allowed" });
}
