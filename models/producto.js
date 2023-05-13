const mongoose = require("mongoose");

/* Creación de un nuevo esquema para la colección Productos. */
const productosSchema = new mongoose.Schema({
  Descripcion: {
    type: String,
    required: true
  },
  Cantidad: Number,
  },
  { timestamps: true }
  );
  
const Producto = mongoose.model('Producto', productosSchema)

module.exports = Producto