//el backend del POST  para crear, + el GET (alissa esta trabajando)
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const newActivityData = req.body;

    if (!newActivityData.title || !newActivityData.category) {
      return res.status(400).json({ status: "Missing required fields" });
    }

    //para convertir la activity en un objeto
    if (!mongoose.Types.ObjectId.isValid(newActivityData.category)) {
      return res.status(400).json({ status: "Invalid category ID" });
    }

    // Crear nueva actividad
    const newActivity = await Activity.create(newActivityData);

    return res.status(201).json(newActivity); // Devuelve la nueva actividad creada
  }

  if (req.method === "GET") {
    const activities = await Activity.find(); // Obtener todas las actividades
    return res.status(200).json(activities);
  }

  res.status(405).json({ status: "Method not allowed" });
}
