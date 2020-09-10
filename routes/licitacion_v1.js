var express = require('express');
var json2xml = require("json2xml");
const e = require('express');
var router = express.Router();

const licitacion = require('../data/data');
router.get('/', function(request, response) {
    var data = {
        items: licitacion
    };
    var xml_licitacion = json2xml(data);
    response.setHeader('Content-Type', 'application/xml');
    response.send(xml_licitacion);
});

router.get('/licitante/:ruc_id', function(request, response) {
    const licitante_id = request.params.ruc_id;
    var detalles = licitacion.find(item => item.ruc == licitante_id);
    if (detalles.obras_no_concluidas == 'si' && detalles.familiares_en_municipales == 'si' &&
        detalles.familiares_congresistas == 'si' && detalles.resgistro_proveedor_del_estado == 'no' &&
        detalles.rubro_diferente_de_solicitud == 'si') {
        var data2 = {
            items: detalles,
            apto: 'No apto como solicitante'
        };
        response.json(data2)
    } else {
        var data3 = {
            items: detalles,
            apto: 'Apto como solicitante'
        };
        response.json(data3);
    }
});

module.exports = router;