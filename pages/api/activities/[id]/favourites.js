import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method !== "POST") {
      response.setHeader("Allow", ["POST"]);
      return response.status(405).json({ status: "Method not allowed" });
    }

    const { ids } = request.body;

    // Validate array of IDs
    if (!Array.isArray(ids)) {
      return response.status(400).json({ 
        status: "Bad Request", 
        message: "Please provide an array of activity IDs" 
      });
    }

    // Filter out null 
    const validIds = ids.filter(id => id !== null);

    if (validIds.length === 0) {
      return response.status(200).json([]);
    }

    const activities = await Activity.find({ _id: { $in: validIds } })
      .populate("categories")
      .sort({ createdAt: -1 });

    return response.status(200).json(activities);
  } catch (error) {
    console.error("Error in /api/activities/favourites:", error);
    return response.status(500).json({ 
      status: "Server error", 
      message: error.message 
    });
  }
} 