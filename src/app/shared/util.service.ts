import { Injectable } from '@angular/core';
import { map, mapValues, mapKeys, pick, set, get } from 'lodash'

@Injectable()
export class UtilService {

  public templateStringSingleLine(str: string) {
    return str
      .trim()
      .split(/(?:\r\n|\n|\r)/)
      .map(s => s.trim())
      .join(' ');
  }

  public formatJson(obj: any, formatObj: MapFormat) {

    switch (formatObj.type) {
      case 'map':
        if (formatObj.isPick) {
          obj = pick(obj, Object.keys(formatObj.children))
        }
        for (const [key, value] of Object.entries(formatObj.children)) {
          const objValue = get(obj, key)
          obj[key] = this.formatJson(objValue, value)
        }
        for (const key of Object.keys(obj)) {
          const value = get(obj, key)
          const child = formatObj.children[key]/*?*/
          if (child && child.to) {
            const defaultVal = child.defaultVal === 0 ? 0 : ''
            const newValue = !value && value !== 0 ? defaultVal : value
            set(obj, child.to, newValue)
            delete obj[key]
          }
        }
        if (formatObj.addChildren) {
          for (const child of formatObj.addChildren) {
            set(obj, child.to, child.defaultVal)
          }
        }
        if (formatObj.removeChild) {
          if (typeof formatObj.removeChild === 'string') {
            delete obj[formatObj.removeChild]
          } else {
            for (const child of formatObj.removeChild) {
              delete obj[child];
            }
          }
        }

        return obj

      case 'array':
        obj = map(obj, (item) => {
          return this.formatJson(item, formatObj.childrenArray)
        })
        return obj

      default:
        return obj
    }
  }
}
