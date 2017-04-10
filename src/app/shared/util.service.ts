
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  templateStringSingleLine(str: string) {
    return str
      .trim()
      .split(/(?:\r\n|\n|\r)/)
      .map(str => str.trim())
      .join(' ');
  }
}
