import  AppError from "../errors/AppError.js";

function errorHandler(err, req, res, next) {
     console.log(`🚀 ~ errorHandler ~ err:`, err.message)
     if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message, code: err.code });
     } else {
       res.status(500).json({ error: "Error interno del servidor"});
     }
}


export default errorHandler;