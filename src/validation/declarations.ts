/**
 * High level specs
 */

export enum TypeNames {
  ARRAY = 'array',
  BASE58 = 'base58',
  BASE64 = 'base64',
  BASE64_ENCODED_FILE = 'base64_encoded_file',
  BOOLEAN = 'boolean',
  EMAIL = 'email',
  FLOAT = 'float',
  INTEGER = 'integer',
  ISO_8601_DATE = 'ISO_8601_date',
  OBJECT = 'object',
  PHONE = 'phone',
  SEQUENCE = 'sequence',
  STRING = 'string',
  URL = 'url',
  UUID = 'uuid',
}

export enum RuleNames {
  ALPHA = 'alpha',
  ALPHA_DASH = 'alphadash',
  ALPHA_NUM = 'alphanum',
  BETWEEN = 'between',
  BETWEEN_LENGTH = 'betweenlen',
  DECIMAL = 'decimal',
  EQUALS = 'equals',
  EQUALS_TO = 'equals_to',
  FILE_FORMAT = 'file_format',
  FILE_TYPE = 'file_type',
  HEX = 'hex',
  IS_IN = 'in',
  LEN = 'len',
  MAX = 'max',
  MAX_LENGTH = 'maxlen',
  MAX_SIZE = 'max_size',
  MIN = 'min',
  MIN_LENGTH = 'minlen',
  MIN_SIZE = 'min_size',
  MUST_BE_TRUE = 'must_be_true',
  NULLABLE_IF = 'nullable_if',
  PHONE_TYPE = 'phone_type',
  REGEX = 'regex',
  REQUIRED = 'required',
  STRICT = 'strict',
}

export interface HighLevelSpecPrimitive {
  type: TypeNames;
  rules: string | string[];
}

export interface HighLevelSpecObject extends HighLevelSpecPrimitive {
  type: TypeNames.OBJECT;
  schema: {
    [key: string]: HighLevelSpec;
  };
}

export interface HighLevelSpecArray extends HighLevelSpecPrimitive {
  type: TypeNames.ARRAY;
  elements: HighLevelSpec;
}

export type HighLevelSpec =
  | HighLevelSpecObject
  | HighLevelSpecPrimitive
  | HighLevelSpecArray;

// User-defined typed guards

export function isHiObject(obj: HighLevelSpec): obj is HighLevelSpecObject {
  return (obj as HighLevelSpecObject).schema !== undefined;
}

export function isHiArray(arr: HighLevelSpec): arr is HighLevelSpecArray {
  return (arr as HighLevelSpecArray).elements !== undefined;
}

/**
 * Low level specs
 */

export interface LowLevelRule {
  name: RuleNames;
  params: string[];
  alias?: string;
}

interface LowLevelSpecPrimitive {
  type: TypeNames;
  rules: LowLevelRule[];
  nullable?: boolean;
}

export interface LowLevelSpecObject extends LowLevelSpecPrimitive {
  type: TypeNames.OBJECT;
  schema: {
    [key: string]: LowLevelSpec;
  };
}

export interface LowLevelSpecArray extends LowLevelSpecPrimitive {
  type: TypeNames.ARRAY;
  elements: LowLevelSpec;
}

export type LowLevelSpec =
  | LowLevelSpecPrimitive
  | LowLevelSpecArray
  | LowLevelSpecObject;

/**
 * JSON data
 */

type JSONDataPrimitive = string | number | boolean | null;

export interface JSONDataArray extends Array<JSONData> {}

export interface JSONDataObject {
  [key: string]: JSONData;
}

export type JSONData =
  | JSONDataPrimitive
  | JSONDataObject
  | JSONDataArray
  | undefined;

/**
 * JSON data error
 */

export interface ValidationErrorJSON {
  errors: BaseErrorJSON[];
}

export interface ArrayErrorJSON extends ValidationErrorJSON {
  elementsErrors: ValidationErrorJSON[];
}

export interface ObjectSchemaErrorsJSON {
  [key: string]: ValidationErrorJSON;
}

export interface ObjectErrorJSON extends ValidationErrorJSON {
  schemaErrors: ObjectSchemaErrorsJSON;
}

export interface BaseErrorJSON {
  name: string;
  value: JSONData;
}

export interface TypeErrorJSON extends BaseErrorJSON {
  name: 'type';
  params: string[];
}

export interface RuleErrorJSON extends BaseErrorJSON {
  params?: string[];
}

export interface NullableErrorJSON extends BaseErrorJSON {
  name: 'nullable';
  params: [];
}
