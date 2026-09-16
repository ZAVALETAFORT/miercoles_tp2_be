import { Router } from "express";


const categoryRoutes = Router();

categoryRoutes.get("/", (req, res) => {
  res.send("Category ok");    
});
categoryRoutes.get("/:id", (req, res) => {
  res.send("Category by id ok");
});
categoryRoutes.post("/", (req, res) => {
  res.send("create Category ok");
});
categoryRoutes.put("/:id", (req, res) => {
  res.send("update Category ok");
});
categoryRoutes.delete("/:id", (req, res) => {
  res.send("delete Category ok");
});

export default categoryRoutes;