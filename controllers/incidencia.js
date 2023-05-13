const Incidencia = require("../models/incidencia");

/**
 * Obtiene todas las incidencias de la base de datos y los devuelve en una respuesta JSON.
 * @param req - el objeto de solicitud.
 * @param res - el objeto de respuesta.
 */
const getIncidencias = async (req, res) => {
  const incidencias = await Incidencia.find({ isDeleted: { $ne: true } }).sort({
    _id: -1,
  });
  res.status(200).json({ ok: true, data: incidencias });
};

const findDeletedIncidencias = async (req, res) => {
  const incidencias = await Incidencia.find({ isDeleted: true }).sort({
    _id: -1,
  });
  res.status(200).json({ ok: true, data: incidencias });
};

/**
 * Si el cuerpo de la solicitud no tiene una fechaHora, envíe una respuesta 400 con un mensaje.De lo contrario,
 * Cree una nueva incidencia con el cuerpo de solicitud, guárdelo y envíe una respuesta 201.
 * @param req - solicitud
 * @param res - el objeto de respuesta
 */
const createIncidencia = (req, res) => {
  if (!req.body.fechaHora) {
    res.status(400).json({
      ok: false,
      message: "El campo de fecha y hora de incidencias es obligatorio",
    });
    return;
  }

  const newIncidencia = new Incidencia(req.body);
  newIncidencia
    .save()
    .then((result) => {
      res.status(201).json({ ok: true });
    })
    .catch((err) => console.log(err));
};

/**
 * Esta función elimina una incidencia estableciendo su propiedad ISDELETED en verdadero y actualizando su
 * Propiedad deletedat con la fecha actual.
 * @param req: el objeto de solicitud representa la solicitud http que el cliente envió al cliente
 * servidor.Contiene información sobre la solicitud, como el método HTTP, los encabezados, la URL y cualquier
 * Datos que se enviaron en el cuerpo de solicitud.
 * @param res - `res` es el objeto de respuesta que se enviará al cliente con el resultado de
 * La llamada API.Contiene métodos para establecer el código de estado HTTP, los encabezados y el cuerpo de respuesta.
 * @returns Si la operación es exitosa, un objeto JSON con la propiedad "OK" establecido en True es
 * devuelto con un código de estado de 200. Si la operación falla, un objeto JSON con la propiedad "Error"
 * se devuelve con un mensaje de error apropiado y código de estado.
 */
const deleteIncidencia = async (req, res) => {
  const { id } = req.params;

  try {
    const incidencia = await Incidencia.updateOne(
      { _id: id, deletedAt: { $eq: null } },
      { $set: { isDeleted: true, deletedAt: new Date() } }
    );

    if (!incidencia || incidencia.nModified === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró la incidencia o ya fue eliminada." });
    }
    
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// funcion para restuaurar la incidencia cuyo campo isDeleted sea establecido en false

const restoreIncidencia = async (req, res) => {
  const { id } = req.params;

  try {
    const incidencia = await Incidencia.updateOne(
      { _id: id, isDeleted: true },
      { $set: { isDeleted: false, deletedAt: null } }
    );

    if (!incidencia || incidencia.nModified === 0) {
      return res
        .status(404)
        .json({ error: "No se encontré la incidencia o ya fue restaurada." });
    }
    
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateIncidencia = async (req, res) => {
  const { id } = req.params;
  try {
    const incidencia = await Incidencia.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!incidencia) throw Error("No se encontró la incidencia.");
    res.status(200).json({ ok: true, data: incidencia });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getIncidencias,
  createIncidencia,
  deleteIncidencia,
  updateIncidencia,
  findDeletedIncidencias,
  restoreIncidencia,
};
