# Clase 6 — Consigna de práctica

Seguimos en `biblioteca-api-express/` de la clase 5. Hoy:

1. Metemos un **error handler central** y sacamos todos los `res.status(4xx)...` de los controllers.
2. Agregamos **validación con Zod** vía un middleware reutilizable.

El formato de error de la respuesta no cambia (`{ error: { code, message } }`) — cambia **quién lo arma**: ahora un solo lugar.

---

## Ejercicio 1 — `AppError`

Crear `errors/AppError.js`: una clase que extienda `Error` y guarde `code`, `statusCode` (default `400`) y `details` (opcional).

```js
class AppError extends Error {
  constructor(code, message, statusCode = 400, details = undefined) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
export default AppError;
```

---

## Ejercicio 2 — `middlewares/errorHandler.js`

Un middleware de **4 parámetros** `(err, req, res, next)` que:

- Si `err instanceof AppError` → responde `err.statusCode` + `{ error: { code, message, details? } }` (incluir `details` solo si existe).
- Si es cualquier otro error → `console.error(err)` completo y responde `500` + `{ error: { code: "ERROR_INTERNO", message: "Ocurrió un error inesperado" } }`.

---

## Ejercicio 3 — Refactorizar los controllers

En `librosController.js`:

- Borrar el helper `error(...)` de la clase 5.
- Donde antes hacías `return error(res, 404, ...)`, ahora `return next(new AppError("LIBRO_NO_ENCONTRADO", "No existe un libro con id X", 404))`.
- Las funciones ahora reciben `(req, res, next)` (agregar el `next`).
- Sacar la validación a mano del `crear` (el `if (!titulo || !autor)`) — eso pasa a Zod (ejercicio 4).

`notFound.js` puede quedar como está, o también tirar un `AppError` — a elección.

---

## Ejercicio 4 — Validación con Zod

1. Instalar: `npm install zod`.
2. Crear `schemas/libroSchema.js` con dos schemas:
   - **`crearLibroSchema`**: `titulo` (string, min 1, obligatorio), `autor` (string, min 1, obligatorio), `isbn` (string, opcional), `stock` (número entero, no negativo, default `0`). Poner mensajes propios en español.
   - **`actualizarLibroSchema`**: los mismos campos pero **todos opcionales** (es un update, puede venir solo `stock`), y `stock` **sin** el `.default(0)` — si el update no trae `stock`, no queremos pisarlo con 0.
   - Pista: definí cada campo una vez en un objeto y reusá esas piezas en los dos schemas (`campos.titulo`, `campos.titulo.optional()`, etc.). Evitá `crearLibroSchema.partial()` acá, porque el `.default(0)` de `stock` se aplicaría igual en el update.
3. Crear `middlewares/validate.js`: una **factory** `validate(schema)` que devuelve un middleware. Hace `schema.safeParse(req.body)`; si falla, arma un array `details` con `{ campo, mensaje }` por cada `issue` y llama a `next(new AppError("VALIDACION", "Datos inválidos", 400, details))`; si pasa, hace `req.body = resultado.data` y `next()`.
4. En `routes/librosRoutes.js`, enchufar la validación antes del controller:
   ```js
   router.post("/", validate(crearLibroSchema), controller.crear);
   router.put("/:id", validate(actualizarLibroSchema), controller.actualizar);
   ```

---

## Ejercicio 5 — Conectar el error handler

En `index.js`, `app.use(errorHandler)` va **al final de todo**, después de `notFound`.

Verificar que `index.js` sigue sin lógica de negocio: solo `app.use(...)` y `app.listen(...)`.

---

## Ejercicio 6 — Probar

En `pruebas.http`:

1. `POST /libros` con `{ "autor": "" }` → `400` con `details` listando `titulo` y `autor`.
2. `POST /libros` con `{ "titulo": "X", "autor": "Y", "stock": -3 }` → `400`, `details` sobre `stock`.
3. `POST /libros` con `{ "titulo": "X", "autor": "Y", "stock": "cinco" }` → `400` (tipo incorrecto).
4. `POST /libros` válido → `201`, y verificar que `stock` quedó en `0` cuando no se manda (default de Zod).
5. `GET /libros/999` → `404` con el formato de siempre, pero ahora armado por el `errorHandler`.
6. `PUT /libros/1` con solo `{ "stock": 5 }` → `200`, y el `titulo` original intacto (todos los campos son opcionales en `actualizarLibroSchema`).
7. Provocar un error inesperado a propósito (ej: en un controller, una línea `JSON.parse("{")` temporal) y ver que responde `500` genérico y loguea el stack completo en consola. Después sacar esa línea.

---

## Entregable

```
biblioteca-api-express/
├── index.js
├── package.json          # ahora con "zod" en dependencies
├── data/libros.js
├── errors/AppError.js
├── schemas/libroSchema.js
├── routes/librosRoutes.js
├── controllers/librosController.js
├── middlewares/
│   ├── logger.js
│   ├── validate.js
│   ├── notFound.js
│   └── errorHandler.js
└── pruebas.http
```

Las 5 rutas andando, validación de Zod en `POST`/`PUT`, y **cero** `res.status(4xx)` o `res.status(500)` fuera de `errorHandler.js`.

---

## Desafío opcional

- Crear `paginacionSchema` con `z.coerce.number()` para `page` y `limit`, y un `validate` que valide `req.query` (ojo: en Express 5 `req.query` es de solo lectura — guardá el resultado en `req.paginacion` y leelo desde el controller).
- Agregar a `crearLibroSchema` una regla de `isbn`: si viene, tiene que tener exactamente 13 dígitos (`z.string().regex(/^\d{13}$/, "El ISBN debe tener 13 dígitos")`).
- Hacer que un `isbn` repetido al crear devuelva `409 Conflict` con `code: "ISBN_DUPLICADO"` (esto es lógica de negocio, va en el controller como `throw new AppError(...)`).
