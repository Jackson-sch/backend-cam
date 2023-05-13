const express =  require('express')
const router = express.Router()
const incidenciaController = require('../controllers/incidencia')

/* Una ruta que está escuchando una solicitud posterior. */
router.post('/', incidenciaController.createIncidencia)

router.get('/', incidenciaController.getIncidencias)

router.get('/deleted-incidencias', incidenciaController.findDeletedIncidencias)

router.delete('/:id', incidenciaController.deleteIncidencia)

router.patch('/:id', incidenciaController.restoreIncidencia)

router.put('/:id', incidenciaController.updateIncidencia)

module.exports = router