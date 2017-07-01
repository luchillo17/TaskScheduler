import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';

const response = {
  "data": {
    "orders": []
  },
}

const format: ErrorFormat = {
  type: 'map',
  mapSelf: true,
  children: {
    errors: {
      type: 'hasProperty',
      to: 'errors',
    },
    data: {
      type: 'hasValue',
      to: 'data.orders.length',
      value: 0,
      returnValue: false,
    },
  },
};

UtilService.getError(response, format)/*?*/
