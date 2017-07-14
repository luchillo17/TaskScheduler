import { Injectable } from '@angular/core';
import { map, mapValues, mapKeys, filter, pick, set, get } from 'lodash'

export class UtilService {

  public static templateStringSingleLine(str: string) {
    return str
      .trim()
      .split(/(?:\r\n|\n|\r)/)
      .map(s => s.trim())
      .join(' ');
  }

  public static getError(response, formatObj: ErrorFormat) {
    if (!formatObj) { return; }
    if (!response) { return false }
    let error;
    switch (formatObj.type) {
      case 'hasProperty':
        error = get(response, formatObj.to) !== undefined ? response : undefined
        return this.getErrorReturnValue(error, formatObj.returnValue)

      case 'hasValue':
        error = get(response, formatObj.to) === formatObj.value ? response : undefined
        return this.getErrorReturnValue(error, formatObj.returnValue)

      case 'lacksValue':
        error = get(response, formatObj.to) !== formatObj.value ? response : undefined
        return this.getErrorReturnValue(error, formatObj.returnValue)

      case 'map':
        for (const [key, format] of Object.entries(formatObj.children)) {
          const objValue = formatObj.mapSelf ? response : get(response, key)
          const errorItem = this.getError(objValue, format)
          if (errorItem !== undefined) {
            return format.returnValue !== undefined ? errorItem : response
          }
        }
        return;

      case 'array':
        const errors = filter(response, (item) => {
          return this.getError(item, formatObj.childrenArray)
        })
        return errors.length !== 0 ? errors : undefined

      default:
        return;
    }
  }

  public static getErrorReturnValue(error, returnValue) {
    return error !== undefined && returnValue !== undefined ? returnValue : error
  }

  public static formatJson(objArg: any, formatObj: MapFormat) {
    let obj
    if (!formatObj) {
      return objArg;
    }
    switch (formatObj.type) {
      case 'parse':
        objArg = JSON.parse(objArg);
        const type = objArg instanceof Array ? 'array' : 'map'
        return this.formatJson(objArg, {...formatObj, type})

      case 'assign':
        obj = {}
        set(obj, formatObj.to, objArg)
        objArg = obj
      case 'map':
        obj = {...objArg}
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
            if (child.to instanceof Array) {
              for (const path of child.to) {
                set(obj, path, newValue)
              }
            } else {
              set(obj, child.to, newValue)
            }
            delete obj[key]
          }
        }
        if (formatObj.addChildren) {
          for (const child of formatObj.addChildren) {
            set(obj, child.to, child.defaultVal)
          }
        }
        if (formatObj.removeChildren) {
          if (typeof formatObj.removeChildren === 'string') {
            delete obj[formatObj.removeChildren]
          } else {
            for (const child of formatObj.removeChildren) {
              delete obj[child];
            }
          }
        }

        return obj

      case 'array':
        if (formatObj.filterBy) {
          objArg = filter(objArg, (item) =>
            get(item, formatObj.filterBy.to) === formatObj.filterBy.value)
        }
        if (!formatObj.childrenArray) {
          return objArg
        }
        obj = map(objArg, (item) => {
          return this.formatJson(item, formatObj.childrenArray)
        })
        return obj

      default:
        return objArg
    }
  }
}
