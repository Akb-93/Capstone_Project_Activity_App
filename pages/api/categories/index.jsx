//back end del GET para usar categorias en el formulario
import dbConnect from "@/db/connect";
import Category from "@/db/models/Categories";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    const categories = await Category.find();
    res.status(200).json(categories);
    return;
  }

  res.status(405).json({ status: "Method not allowed" });
}
