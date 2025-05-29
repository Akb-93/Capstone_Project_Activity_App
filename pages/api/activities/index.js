import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === "POST") {
    try {
      const newActivityData = req.body;

      if (!newActivityData.title || !newActivityData.categories) {
        return res.status(400).json({ status: "Missing required fields" });
      }
      await Activity.create(newActivityData);
      return res.status(201).json({ status: "Activity created successfully" });
    } catch (error) {
      console.error("Error creating activity:", error);
      return res.status(500).json({ status: "Failed to create activity" });
    }
  }

  if (req.method === "GET") {
    try {
      const { category } = req.query;
      const query = category ? { categories: category } : {};
      const activities = await Activity.find(query)
        .populate("categories")
        .sort({ createdAt: -1 });
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ error: "Failed to fetch activities" });
    }
  }
}
