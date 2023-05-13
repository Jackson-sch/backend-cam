const express = require('express')
const router = express.Router()
const productoController = require('../controllers/producto')

/* Una ruta que está escuchando una solicitud posterior. */
router.post('/', productoController.createProducto);

router.get('/', productoController.getProductos)

module.exports = router