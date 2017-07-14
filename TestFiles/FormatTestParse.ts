import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';

const a = `[{"sc_tipo_dcto":"NIT","n_nit":10766527,"sc_nombre":"JAIRO ANDRES USME  BUELVAS","ss_nombre1":"JAIRO","ss_nombre2":"ANDRES","ss_apellido1":"USME ","ss_apellido2":"BUELVAS","ka_nl_tipo_cliente":100,"sc_tipo_tercero":"Persona Natural"},{"sc_tipo_dcto":"NIT","n_nit":800004599,"sc_nombre":"COMERCIALIZADORA MARDEN LTDA.","ss_nombre1":null,"ss_nombre2":null,"ss_apellido1":null,"ss_apellido2":null,"ka_nl_tipo_cliente":120,"sc_tipo_tercero":"Regimen Comun"}]`

const format: MapFormat = {
  type: 'parse',
  childrenArray: {
    type: 'map',
    isPick: true,
    children: {
      sc_tipo_dcto: { to: 'document.name' },
      n_nit: { to: ['value', 'where.value'] },
      sc_nombre: { to: 'name' },
      ss_nombre1: { to: 'firstname1' },
      ss_nombre2: { to: 'firstname2' },
      ss_apellido1: { to: 'lastname1' },
      ss_apellido2: { to: 'lastname2' },
      sc_tipo_tercero: { to: 'regimen' },
    },
  },
}

const format2: MapFormat = {
  to: 'customers',
  type: 'assign',
  addChildren: [{
    to: 'query',
    defaultVal: `mutation ($pendingInvoices: [addPendingInvoicesArgs]) {
      addPendingInvoices(pendingInvoices: $pendingInvoices) { c_pending_invoice_id }
    }`,
  }],
  children: {
    customers: {
      to: 'variables.customers'
    }
  }
}
// JSON.stringify(format)/*?*/
// JSON.stringify(format2)/*?*/
const result = UtilService.formatJson(a, format)/*?*/
const result2 = UtilService.formatJson(result, format2)/*?*/
JSON.stringify(result2, null, 2)/*?*/
