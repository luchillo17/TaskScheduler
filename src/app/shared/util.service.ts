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
            set(obj, child.to, value)
            delete obj[key]
          }
        }
        if (formatObj.addChild) {
          set(obj, formatObj.addChild, '')
        }
        if (formatObj.removeChild) {
          delete obj[formatObj.removeChild]
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
