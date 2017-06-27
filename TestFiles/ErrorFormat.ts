import 'reflect-metadata';
import { UtilService } from '../src/app/shared/util.service';

const response = {
  "data": {
    "orders": []
  }
}

const format: ErrorFormat = {
  type: 'array',
  children: [
    {
      type: 'hasProperty',
      to: 'errors',
    },
    {
      type: 'hasValue',
      to: 'data.orders.length',
      value: 0,
      returnValue: false,
    }
  ],
}

UtilService.getError(response, format)/*?*/
