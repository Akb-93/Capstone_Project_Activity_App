//back end del GET para usar categorias en el formulario
import dbConnect from "@/db/connect";
import Category from "@/db/models/Categories";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET")
  {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ status: "Method not allowed" });
  }

    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

 

