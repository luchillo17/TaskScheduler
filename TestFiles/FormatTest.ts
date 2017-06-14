import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';
import xmljs = require('xml-js')

const util = new UtilService()

const a = {
  'orders': [
    {
      'c_order_id': 1261,
      'c_bpartner_id': 1145,
      'ad_client_id': null,
      'ad_org_id': 1001,
      'isactive': 'Y',
      'created': '2017-06-10T18:55:33.489Z',
      'createdby': null,
      'updated': '2017-06-10T18:55:33.489Z',
      'updatedby': null,
      'documentno': 'ICP1001',
      'description': '',
      'fechaentrega': '2017-06-12T05:00:00.000Z',
      'c_bpartner_vendor_id': 1004,
      'concept_discount': null,
      'discount': null,
      'conditions': null,
      'collectionvalue': null,
      'transport': null,
      'consecutive': null,
      'c_term_paymet_id': null,
      'dispatched': false,
      'authorized': false,
      'postponed': false,
      'canceled': false,
      'number_key': 1001,
      'datedispatched': null,
      'c_bpartner_location_id': 1072,
      'c_bp_process': null,
      'completed': false,
      'type_order': null,
      'm_warehouse_id': 100016,
      'ad_user_id': null,
      'docstatus': 'CO',
      'processed': true,
      'c_type_paymet_id': null,
      'invoiced': true,
      'c_doctype_id': 1001,
      'paid': false,
      'separateplan': false,
      'received': false,
      'referencedocument': '',
      'image': null,
      'lat': null,
      'lng': null,
      'ordered': false,
      'device_info': {
        'device': {
          'name': 'mac',
          'version': -1,
          'fullVersion': '-1',
          'mac': -1
        },
        'os': {
          'name': 'macosx',
          'version': 10.12,
          'fullVersion': '10.12.3',
          'macosx': 10.12
        },
        'engine': {
          'name': 'blink',
          'version': 537.36,
          'fullVersion': '537.36',
          'mode': 537.36,
          'fullMode': '537.36',
          'compatible': false,
          'blink': 537.36
        },
        'browser': {
          'name': 'chrome',
          'version': 58,
          'fullVersion': '58.0.3029.110',
          'mode': 58,
          'fullMode': '58.0.3029.110',
          'compatible': false,
          'chrome': 58
        }
      },
      'document_uuid': 1497117299621,
      'c_order_quotation_id': null,
      'bankaccount': null,
      'workingdays': null,
      'currentnext': 1001,
      'year': 2017,
      'orderLines': [
        {
          'c_orderline_id': 1341,
          'c_order_id': 1261,
          'ad_client_id': null,
          'ad_org_id': null,
          'isactive': 'Y',
          'created': '2017-06-10T18:55:33.548Z',
          'createdby': null,
          'updated': '2017-06-10T18:55:33.548Z',
          'updatedby': null,
          'description': null,
          'c_bpartner_id': null,
          'm_product_id': 101930,
          'qtyentered': 4,
          'price': 2000,
          'c_tax_id': null,
          'percentage': 0,
          'name': null,
          'value': null,
          'discount': 0
        },
        {
          'c_orderline_id': 1342,
          'c_order_id': 1261,
          'ad_client_id': null,
          'ad_org_id': null,
          'isactive': 'Y',
          'created': '2017-06-10T18:55:33.548Z',
          'createdby': null,
          'updated': '2017-06-10T18:55:33.548Z',
          'updatedby': null,
          'description': null,
          'c_bpartner_id': null,
          'm_product_id': 101916,
          'qtyentered': 4,
          'price': 8000,
          'c_tax_id': null,
          'percentage': 0,
          'name': null,
          'value': null,
          'discount': 0
        }
      ]
    }
  ]
}

const format: MapFormat = {
  type: 'map',
  children: {
    orders: {
      to: 'movimientos.movimiento',
      type: 'array',
      childrenArray: {
        type: 'map',
        isPick: true,
        children: {
          c_order_id: { to: '_attributes.movimientoId' },
          created: { to: '_attributes.fecha' },
          orderLines: {
            to: 'movimientoDetalle',
            type: 'array',
            childrenArray: {
              type: 'map',
              isPick: true,
              children: {
                c_orderline_id: { to: '_attributes.orderLineId' }
              }
            }
          }
        }
      }
    }
  }
}

const result = util.formatJson(a, format)
result.movimientos.movimiento = result.movimientos.movimiento.map((mov) => ({
  ...mov,
  _attributes: {
    ...mov._attributes,
    fuente: 'PA',
    moneda: 'PESOS',
    trm: 0,
}}))/*?*/
JSON.stringify(result, null, 2)/*?*/
const xml = xmljs.js2xml(result, {
  compact: true,
})/*?*/
