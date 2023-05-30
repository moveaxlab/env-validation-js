import { HighLevelSpec, LowLevelSpec } from './declarations';
import { SpecParser } from './parser/SpecParser';
import { Type, TypeFactory } from './types';

export class ValidatorFactory {
  static make(spec: HighLevelSpec, strict: boolean = false): Type {
    const lowlevel: LowLevelSpec = SpecParser.parse(spec, strict);

    return TypeFactory.make(lowlevel);
  }
}
