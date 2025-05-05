//el backend del POST  para crear, + el GET (alissa esta trabajando)
import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activities";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const newActivityData = req.body;
    await Activity.create(newActivityData);

    res.status(201).json({ status: "New activity added succefully." });
    return;
  }

  res.status(405).json({ status: "Method not allowed" });
}
