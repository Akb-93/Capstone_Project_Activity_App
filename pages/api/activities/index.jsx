//create a GET API route that fetches activities from your Activity model and populates the categories field with the actual category names

import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const activities = await Activity.find().populate("categories");
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ error: "Failed to fetch activities" });
    }
  }

  if (req.method === "POST") {
    try {
      const newActivityData = req.body;

      if (!newActivityData.title || !newActivityData.categories) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newActivity = await Activity.create(newActivityData);
      return res.status(201).json(newActivity);
    } catch (error) {
      console.error("Error creating activity:", error);
      return res.status(500).json({ error: "Failed to create activity" });
    }
  }

  // Si no es ni GET ni POST
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
