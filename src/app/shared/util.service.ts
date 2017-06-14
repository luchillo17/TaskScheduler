import { Injectable } from '@angular/core';
import { map, mapValues, mapKeys, pick, set } from 'lodash'

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
          obj[key] = this.formatJson(obj[key], value)
        }
        obj
        for (const [key, value] of Object.entries(obj)) {
          const child = formatObj.children[key]
          if (child && child.to) {
            set(obj, child.to, value)
            delete obj[key]
          }
        }
        if (formatObj.addChild) {
          set(obj, formatObj.addChild, '')
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
