import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";
import Category from "@/db/models/Categories";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id } = request.query;

    if (request.method === "GET") {
      const activity = await Activity.findById(id).populate("categories");

      if (!activity) {
        response.status(404).json({ status: "Activity not found" });
        return;
      }

      response.status(200).json(activity);
      return;
    }

    if (request.method === "PUT") {
      const activityData = request.body;

      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        activityData,
        {
          new: true,
        }
      ).populate("categories");

      if (!updatedActivity) {
        response.status(404).json({ status: "Activity not found" });
        return;
      }

      response.status(200).json(updatedActivity);
      return;
    }

    response.status(405).json({ status: "Method not allowed" });
  } catch (error) {
    console.error("Error in /api/activities/[id]:", error);
    response
      .status(500)
      .json({ status: "Server error", message: error.message });
  }
}
