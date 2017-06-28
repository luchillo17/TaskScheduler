const format = {
  "type": "map",
  "addChildren": [
    {
      "to": "a_s_tipo",
      "defaultVal": 3
    }
  ],
  "children": {
    "data": {
      "to": "a_s_xml",
      "type": "map",
      "children": {
        "orders": {
          "to": "Movimientos.movimiento",
          "type": "array",
          "childrenArray": {
            "type": "map",
            "isPick": true,
            "removeChildren": [
              "seller",
              "customer",
              "user",
              "location"
            ],
            "addChildren": [
              {
                "to": "_attributes.fuente",
                "defaultVal": "PA"
              },
              {
                "to": "_attributes.moneda",
                "defaultVal": "PESOS"
              },
              {
                "to": "_attributes.trm",
                "defaultVal": 0
              }
            ],
            "children": {
              "c_order_id": {
                "to": "_attributes.movimientoId"
              },
              "created": {
                "to": "_attributes.fecha"
              },
              "documentno": {
                "to": "_attributes.pedido"
              },
              "seller.value": {
                "to": "_attributes.vendedor"
              },
              "customer.value": {
                "to": "_attributes.nit"
              },
              "user.nameuser": {
                "to": "_attributes.usuario"
              },
              "location.address": {
                "to": "_attributes.direccionEntrega"
              },
              "location.city.name": {
                "to": "_attributes.ciudadEntrega"
              },
              "orderLines": {
                "to": "movimientoDetalle",
                "type": "array",
                "childrenArray": {
                  "type": "map",
                  "isPick": true,
                  "removeChildren": [
                    "order",
                    "product"
                  ],
                  "children": {
                    "product.value": {
                      "to": "_attributes.codigoArticulo"
                    },
                    "order.fechaentrega": {
                      "to": "_attributes.fechaentrega"
                    },
                    "order.warehouse.value": {
                      "to": "_attributes.bodega"
                    },
                    "quantity": {
                      "to": "_attributes.cantidad"
                    },
                    "price": {
                      "to": "_attributes.valorUnitario"
                    },
                    "discount": {
                      "to": "_attributes.descuento"
                    },
                    "tax.percentage": {
                      "to": "_attributes.iva",
                      "defaultVal": 0
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
