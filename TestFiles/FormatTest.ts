import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';
import xmljs = require('xml-js')

const a = {
  data: {
  'orders': [
    {
      'c_order_id': 1261,
      'created': '2017-06-10T18:55:33.489Z',
      'documentno': 'ICP1001',
      'description': '',
      'number_key': 1001,
      'document_uuid': 1497117299621,
      'user': {
        'nameuser': 'african84'
      },
      'customer': {
        'value': '21516489'
      },
      'seller': {
        'value': '12022708'
      },
      'location': {
        'address': '12345',
        'city': {
          'name': 'MEDELLÍN'
        }
      },
      'orderLines': [
        {
          'product': {
            'value': '7702007034455'
          },
          'tax': null,
          'quantity': 4,
          'price': 2000,
          'discount': 0,
          'order': {
            'fechaentrega': '2017-06-12',
            'warehouse': {
              'value': null
            }
          }
        },
        {
          'product': {
            'value': '10316'
          },
          'tax': null,
          'quantity': 4,
          'price': 8000,
          'discount': 0,
          'order': {
            'fechaentrega': '2017-06-12',
            'warehouse': {
              'value': null
            }
          }
        }
      ]
    }
  ]
}
}

const format: MapFormat = {
  type: 'map',
  removeChildren: [
    'data',
  ],
  children: {
    'data.orders': {
      to: 'Movimientos.movimiento',
      type: 'array',
      childrenArray: {
        type: 'map',
        isPick: true,
        removeChildren: [
          'seller',
          'customer',
          'user',
          'location',
        ],
        addChildren: [
          { to: '_attributes.fuente', defaultVal: 'PA' },
          { to: '_attributes.moneda', defaultVal: 'PESOS' },
          { to: '_attributes.trm', defaultVal: 0 },
        ],
        children: {
          c_order_id: { to: '_attributes.movimientoId' },
          created: { to: '_attributes.fecha' },
          documentno: { to: '_attributes.pedido' },
          'seller.value': { to: '_attributes.vendedor' },
          'customer.value': { to: '_attributes.nit' },
          'user.nameuser': { to: '_attributes.usuario' },
          'location.address': { to: '_attributes.direccionEntrega' },
          'location.city.name': { to: '_attributes.ciudadEntrega' },
          orderLines: {
            to: 'movimientoDetalle',
            type: 'array',
            childrenArray: {
              type: 'map',
              isPick: true,
              removeChildren: [
                'order',
                'product',
              ],
              children: {
                'product.value': { to: '_attributes.codigoArticulo' },
                'order.fechaentrega': { to: '_attributes.fechaentrega' },
                'order.warehouse.value': { to: '_attributes.bodega' },
                'quantity': { to: '_attributes.cantidad' },
                'price': { to: '_attributes.valorUnitario' },
                'discount': { to: '_attributes.descuento' },
                'tax.percentage': { to: '_attributes.iva', defaultVal: 0 },
              }
            }
          }
        }
      }
    }
  }
}

const result = UtilService.formatJson(a, format)
JSON.stringify(result, null, 2)/*?*/
const xml = xmljs.js2xml(result, {
  compact: true,
})
console.log(xml)
