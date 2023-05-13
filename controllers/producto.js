const Producto = require('../models/producto')

/**
* Obtiene todos los productos de la base de datos y los devuelve en una respuesta JSON.
 * @param req - el objeto de solicitud.
 * @param res - el objeto de respuesta.
 */
const getProductos = async (req, res) => {
  const productos = await Producto.find()

  res.status(200).json({ ok: true, data: productos })
}

/**
 * Si el cuerpo de la solicitud no tiene una descripción, envíe una respuesta 400 con un mensaje.De lo contrario,
 * Cree un nuevo producto con el cuerpo de solicitud, guárdelo y envíe una respuesta 201.
 * @param req - solicitud
 * @param res - el objeto de respuesta
 */
const createProducto = (req, res) => {
  if(!req.body.Descripcion) {
    res.status(400).json({ok: false, message: "El campo del nombre de producto es obligatorio"})
  }


  /* Creación de una nueva instancia del modelo Producto y pasar en el cuerpo de solicitud. */
  const newProducto = new Producto(req.body)
  newProducto
    .save()
    .then((result) => {
    res.status(201).json({ ok: true })
  })
    .catch((err) => console.log(err))
}

module.exports = {
  getProductos, 
  createProducto
}