export function logger(req, res, next) {
  console.log(`🚀 ~ req:`, req.method);
  console.log(`🚀 ~ req:`, req.url);
  req.objPrueba = {
    mensaje: "Hola desde el middleware",
  };
  next();
}