const mongoose = require("mongoose");

const dbConnect = (app) => {
/* Conectando a la base de datos MongoDB. */
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@desarrollo.vge1rqc.mongodb.net/sistema-web?retryWrites=true&w=majority`
  )
  .then((result) => {
    /* Configuración del puerto a 5000 si no se establece el puerto variable de entorno. */
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`servidor en el puerto ${PORT}`);
    });
    console.log("conexion exitosa a la base de datos mongodb");
  })
  .catch((err) => console.log(err));  
}

module.exports = dbConnect;