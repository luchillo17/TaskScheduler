import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';
import xmljs = require('xml-js')

const a = {
  "data": {
    "orders": [{
      "c_order_id": 1002,
      "created": "2017-06-22T20:54:00.780Z",
      "documentno": "1001",
      "description": "PRUEBA PEDIDO ISABELINO #1",
      "number_key": 1001,
      "document_uuid": 1498161158644,
      "user": {
        "nameuser": "jgomez"
      },
      "customer": {
        "value": "900020728"
      },
      "seller": {
        "value": "43923504"
      },
      "location": {
        "address": "CR 50 E 10 SUR 165",
        "city": {
          "name": "MEDELLÍN"
        }
      },
      "orderLines": [{
        "product": {
          "value": "33107686"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 8,
        "price": 7700,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107285"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 15,
        "price": 8850,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107373"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 12,
        "price": 4700,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }]
    }, {
      "c_order_id": 1003,
      "created": "2017-06-22T20:54:51.047Z",
      "documentno": "1002",
      "description": "PRUEBA ISABELINO #2",
      "number_key": 1002,
      "document_uuid": 1498161257104,
      "user": {
        "nameuser": "jgomez"
      },
      "customer": {
        "value": "890208788"
      },
      "seller": {
        "value": "43923504"
      },
      "location": {
        "address": "CR 43 F 19 A 40",
        "city": {
          "name": "MEDELLÍN"
        }
      },
      "orderLines": [{
        "product": {
          "value": "33107373"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 20,
        "price": 4700,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }]
    }, {
      "c_order_id": 1004,
      "created": "2017-06-22T20:56:12.189Z",
      "documentno": "1003",
      "description": "PRUEBA ISABELINO #3",
      "number_key": 1003,
      "document_uuid": 1498161297117,
      "user": {
        "nameuser": "jgomez"
      },
      "customer": {
        "value": "900330656"
      },
      "seller": {
        "value": "43923504"
      },
      "location": {
        "address": "CR 65 32 D 35",
        "city": {
          "name": "MEDELLÍN"
        }
      },
      "orderLines": [{
        "product": {
          "value": "33107701"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 7,
        "price": 6950,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107202"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 6,
        "price": 8850,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107302"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 5,
        "price": 5500,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107102"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 4,
        "price": 3200,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107686"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 3,
        "price": 7700,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107285"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 2,
        "price": 8850,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }, {
        "product": {
          "value": "33107373"
        },
        "tax": {
          "percentage": 19
        },
        "c_tax_id": 1003,
        "quantity": 1,
        "price": 4700,
        "discount": 0,
        "order": {
          "fechaentrega": "2017-06-24",
          "warehouse": {
            "value": "936"
          }
        }
      }]
    }]
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
                'tax',
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
