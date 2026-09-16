export function notFound( req, res, next) {
  res
    .status(404)
    .send({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
}
