const mongoose = require("mongoose");

/* Creación de un nuevo esquema para la colección Incidencias. */
const incidenciaSchema = new mongoose.Schema({
  fechaHora: { type: Date, required: true },
  turno: String,
  apellidos: String,
  nombres: String,
  clasificacion: String,
  operador: String,
  camara: String,
  tipoOcurrencia: String,
  zona: String,
  comisaria: String,
  ubicacion: String,
  latitud: Number,
  longitud: Number,
  sectorMapa: String,
  vehiculoApoyo: String,
  observaciones: String,
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},
{ timestamps: true }
);

// Define el método de eliminación de una incidencia del modelo
/* incidenciaSchema.methods.delete = async function() {
  this.isDeleted = true
  await this.save()
}
 */
/* Esta línea de código está creando un modelo de mangosta llamado "Incidencia" basado en Incidenciaschema
esquema.El modelo se utilizará para interactuar con la colección "Incidencia" en la base de datos MongoDB. */
const Incidencia = mongoose.model("incidencias", incidenciaSchema);

module.exports = Incidencia;
