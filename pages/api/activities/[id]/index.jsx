//BACKEND : PUT + DELETE put necesita id igual que delete and get , y se usa para editar
//create a GET API route that fetches activities from your Activity model and populates the categories field with the actual category names

import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

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

    if (request.method === "DELETE") {
      const activity = await Activity.findById(id);
      if (!activity) {
        return response.status(404).json({ status: "Activity not found" });
      }

      await Activity.findByIdAndDelete(id);
      return response.status(200).json({ message: "Activity deleted successfully." });
    }

    response.setHeader("Allow", ["GET", "DELETE"]);
    return response.status(405).json({ error: `Method ${request.method} not allowed` });
  } catch (error) {
    console.error(error); // log the error for debugging
    return response.status(500).json({ error: "Internal server error" });
  }
}