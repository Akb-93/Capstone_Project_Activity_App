//create a GET API route that fetches activities from your Activity model and populates the categories field with the actual category names

import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    //connect mongoDB
    await dbConnect();

    //fetch activities(all) with categories
    const activities = await Activity.find().populate("categories");

    //return activities as JSON
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
}
