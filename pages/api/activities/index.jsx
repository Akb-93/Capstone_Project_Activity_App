//create a GET API route that fetches activities from your Activity model and populates the categories field with the actual category names
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";
export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const newActivityData = req.body;
    // Validación simple (puedes expandirla según lo que necesites)
    if (!newActivityData.title || !newActivityData.categories) {
      return res.status(400).json({ status: "Missing required fields" });
    }
    // Crear nueva actividad
    const newActivity = await Activity.create(newActivityData);
    return res.status(201).json(newActivity); // Devuelve la nueva actividad creada
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const activities = await Activity.find()
      .populate("categories")
      .sort({ createdAt: -1 }); //por MUTATE
    return res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return res.status(500).json({ error: "Failed to fetch activities" });
  }
}
