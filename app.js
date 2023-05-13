require("dotenv").config();
const express = require("express");
const dbConnect = require("./db");
const cors = require("cors");

// Rutas
const productoRouter = require("./routes/producto");
const incidenciaRouter = require("./routes/incidencia")


const app = express();

dbConnect(app);

/* Usar CORS */
app.use(cors({ origin: true }));

/* Un middleware que analiza el cuerpo de la solicitud y lo pone a disposición en la propiedad Req.Body. */
app.use(express.json());

/* Dije de que la aplicación use el producto router para todas las solicitudes que comienzan con/API/V1/Productos.*/
app.use("/api/v1/productos", productoRouter);
app.use("/api/v1/incidencias", incidenciaRouter)
