import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';
import xmljs = require('xml-js')

const a = [
  {
    "n_nit": "10117685",
    "Ced_Vendedor": "4514347",
    "ss_codigo": "!11127",
    "NombreSucursal": "W.H. DISTRIBUCIONES",
    "ss_direccion": "CL 14 05 05",
    "Cod_Dpto": "66",
    "Cod_Ciudad": "66001",
    "ss_telefono": "3348413"
  },
  {
    "n_nit": "10542042",
    "Ced_Vendedor": "94370341",
    "ss_codigo": "!10641",
    "NombreSucursal": "LECHES Y PAÑALES MELISSA",
    "ss_direccion": "CR 17 07 A 06",
    "Cod_Dpto": "19",
    "Cod_Ciudad": "19001",
    "ss_telefono": "8365402"
  }
]

const format: MapFormat = {
  to: 'partnerLocations',
  type: 'assign',
  addChildren: [ {
    to: 'query',
    // tslint:disable-next-line:max-line-length
    defaultVal: 'mutation ($partnerLocations: [upsertPartnerLocationsArgs]) { upsertPartnerLocations(partnerLocations: $partnerLocations) { c_bpartner_id c_bpartner_location_id phone name } }'
  }],
  children: {
    'partnerLocations': {
      to: 'variables.partnerLocations',
      type: 'array',
      childrenArray: {
        type: 'map',
        isPick: true,
        children: {
          n_nit: { to: 'partner.value' },
          Ced_Vendedor: { to: 'seller.value' },
          Cod_Dpto: { to: 'department.code' },
          Cod_Ciudad: { to: 'city.code' },
          ss_codigo: { to: 'code' },
          NombreSucursal: { to: 'name' },
          ss_direccion: { to: 'address' },
          ss_telefono: { to: 'phone' },
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
