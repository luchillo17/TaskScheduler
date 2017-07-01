import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';

const a = `[{"NIT":891100024,"Cod_Sucursal":"!12019","Numero_Fact":116581,"Fecha_Fact":"\/Date(1451538000000)\/","Fecha_venc":"\/Date(1415941200000)\/","Valor_Fact":1741392.00,"Abono":0.00000000000000000000,"k_sc_codigo_fuente":"S3","sc_nombre_fuente":"SALDOS INICIALES C X C","Cedula_Vendedor":79237831},{"NIT":891100024,"Cod_Sucursal":"!12019","Numero_Fact":117076,"Fecha_Fact":"\/Date(1451538000000)\/","Fecha_venc":"\/Date(1420952400000)\/","Valor_Fact":450312.00,"Abono":0.00000000000000000000,"k_sc_codigo_fuente":"S3","sc_nombre_fuente":"SALDOS INICIALES C X C","Cedula_Vendedor":79237831},{"NIT":891100024,"Cod_Sucursal":"!12019","Numero_Fact":117140,"Fecha_Fact":"\/Date(1451538000000)\/","Fecha_venc":"\/Date(1421816400000)\/","Valor_Fact":1273680.00,"Abono":0.00000000000000000000,"k_sc_codigo_fuente":"S3","sc_nombre_fuente":"SALDOS INICIALES C X C","Cedula_Vendedor":79237831}]`

const format: MapFormat = {
  type: 'parse',
  childrenArray: {
    type: 'map',
    isPick: true,
    children: {
      Abono: { to: 'payment' },
      Numero_Fact: { to: 'documentno' },
      Valor_Fact: { to: 'total' },
      Fecha_Fact: { to: 'date_invoice' },
      Fecha_venc: { to: 'due_date' },
      NIT: { to: 'customer.value' },
      Cedula_Vendedor: { to: 'seller.value' },
      Cod_Sucursal: { to: 'location.code' },
    },
  },
}
// JSON.stringify(format)/*?*/
const result = UtilService.formatJson(a, format)
JSON.stringify(result, null, 2)/*?*/
