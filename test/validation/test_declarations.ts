import {
  JSONData,
  ObjectErrorJSON,
  ArrayErrorJSON,
  ValidationErrorJSON,
  HighLevelSpec,
  LowLevelSpec,
} from '../../src/validation/declarations';

export interface UTest {
  parser: ParserTest;
  specs: SpecTest[];
  types: TypesTest[];
  strict: StrictTest[];
}

/////// Parser

export interface ParserTest {
  failure: ParserTestFail[];
  success: ParserTestSuccess;
}

export interface ParserTestSuccess {
  'high-level': HighLevelSpec;
  'low-level': LowLevelSpec;
  strict: boolean;
}

export interface ParserTestFail {
  case: string;
  spec: HighLevelSpec;
  strict: boolean;
}

/////// Spec

export interface SpecTest {
  failure: SpecFailure[];
  spec: HighLevelSpec;
  success: JSONData[];
}

/////// Strict

export interface StrictTest {
  failure: SpecFailure[];
  spec: HighLevelSpec;
  success: JSONData[];
}

export interface SpecFailure {
  data: JSONData;
  failing: ObjectErrorJSON | ArrayErrorJSON | ValidationErrorJSON;
}

/////// Types

export interface TypesTest {
  [key: string]: TypeSuccessFail;
}

export interface TypeSuccessFail {
  failure: JSONData[];
  success: JSONData[];
}
