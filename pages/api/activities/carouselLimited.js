import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === "GET") {
    try {
      const { limit } = req.query;
      const activityLimit = parseInt(limit) || 10;

      const activities = await Activity.find()
        .populate("categories")
        .sort({ createdAt: -1 }) //por MUTATE
        .limit(activityLimit);

      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ error: "Failed to fetch activities" });
    }
  }
}
