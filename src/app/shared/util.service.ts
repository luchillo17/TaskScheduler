import { Injectable } from '@angular/core';
import { map, mapValues, mapKeys, pick, set, get } from 'lodash'

export class UtilService {

  public static templateStringSingleLine(str: string) {
    return str
      .trim()
      .split(/(?:\r\n|\n|\r)/)
      .map(s => s.trim())
      .join(' ');
  }

  public static getError(response, formatObj: ErrorFormat) {
    if (!formatObj || !response) {
      return false
    }
    let error;
    switch (formatObj.type) {
      case 'hasProperty':
        error = get(response, formatObj.to) ? response : undefined
        return formatObj.returnValue || error

      case 'hasValue':
        error = get(response, formatObj.to) === formatObj.value ? response : undefined
        return error === undefined ? error : formatObj.returnValue

      case 'array':
        for (const item of formatObj.children) {
          error = this.getError(response, item)
          if (error !== undefined) return error
        }
      default:
        return;
    }
  }

  public static formatJson(objArg: any, formatObj: MapFormat) {
    let obj
    switch (formatObj.type) {
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
            set(obj, child.to, newValue)
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
        obj = map(objArg, (item) => {
          return this.formatJson(item, formatObj.childrenArray)
        })
        return obj

      default:
        return objArg
    }
  }
}
