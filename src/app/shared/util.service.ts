
import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  public templateStringSingleLine(str: string) {
    return str
      .trim()
      .split(/(?:\r\n|\n|\r)/)
      .map(s => s.trim())
      .join(' ');
  }
}
