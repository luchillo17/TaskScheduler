import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';
import xmljs = require('xml-js')

const a = [
  {
    "s_estado": "OK",
    "s_fuente": null,
    "s_identificador": "1002",
    "s_mensaje": "El pedido no pudo ser aprobado x cartera.Los días de mora exceden el máximo permitido para el cliente!!! DOCUMENTO CREADO CORRECTAMENTE",
    "s_num_documento": null
  },
  {
    "s_estado": "OK",
    "s_fuente": null,
    "s_identificador": "1004",
    "s_mensaje": "El pedido no pudo ser aprobado x cartera.Los días de mora exceden el máximo permitido para el cliente!!! DOCUMENTO CREADO CORRECTAMENTE",
    "s_num_documento": null
  }
]

const format: MapFormat = {
  to: 'orders',
  type: 'assign',
  addChildren: [{
    to: 'query',
    defaultVal: 'mutation($orders: [UpdateOrdersArgs]) { updateOrders(orders: $orders) { updatedRows, rows { c_order_id docstatus }}}'
  }],
  children: {
    'orders': {
      to: 'variables.orders',
      type: 'array',
      childrenArray: {
        type: 'map',
        isPick: true,
        addChildren: [
          { to: 'docstatus', defaultVal: 'CO' },
        ],
        children: {
          s_identificador: { to: 'c_order_id' },
        }
      }
    }
  }
}

const result = UtilService.formatJson(a, format)
JSON.stringify(result, null, 2)/*?*/
// const xml = xmljs.js2xml(result, {
//   compact: true,
// })
// console.log(xml)
