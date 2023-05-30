import {
  HighLevelSpec,
  HighLevelSpecArray,
  HighLevelSpecObject,
  isHiArray,
  isHiObject,
  LowLevelRule,
  LowLevelSpec,
  LowLevelSpecArray,
  LowLevelSpecObject,
  RuleNames,
} from '../declarations';

interface SpecParserType {
  required: boolean;
  nullable: boolean;
  rules: LowLevelRule[];
}

export class SpecParser {
  static parse(spec: HighLevelSpec, _strict?: boolean): LowLevelSpec {
    const { nullable, rules } = SpecParser.ProcessRules(spec.rules);
    const result: LowLevelSpec = { rules, nullable, type: spec.type };

    SpecParser.ProcessNode(spec, result);

    return result;
  }

  // private methods called by parse method

  private static ProcessRuleArray(items: string[]): SpecParserType {
    let nullable: boolean = false;
    let required: boolean = false;
    const dstRules: LowLevelRule[] = [];

    for (const elem of items) {
      if (elem === 'required') {
        required = true;
      } else if (elem === 'nullable') {
        nullable = true;
      } else {
        const res: Partial<LowLevelRule> = {
          params: [],
        };
        const indexColon: number = elem.indexOf(':');

        if (indexColon === -1) {
          // rule element "name"
          res.name = elem as RuleNames;
          res.params = [];
        } else {
          // rule element "name:value"

          let name: string = elem.slice(0, indexColon);
          let params: string[] = [];

          if (name.startsWith('regex[', 0)) {
            // rule element "regex[alias]:value"
            const endBracket: number = name.indexOf(']');
            res.alias = name.substring(6, endBracket);
            name = RuleNames.REGEX;
          }

          const remainder: string = elem.slice(indexColon + 1);
          if (remainder.indexOf(',') !== -1 && name !== 'regex') {
            // rule element "name:value1,value2"
            params = remainder.split(',');
          } else {
            params = [remainder];
          }

          res.name = name as RuleNames;
          res.params = params;
        }

        if (res.name) {
          dstRules.push(<LowLevelRule>res);
        }
      }
    }

    return { required, nullable, rules: dstRules };
  }

  // If it is not an array, convert to array and call ProcessArrayRules
  private static ProcessRules(rules: string | string[]): SpecParserType {
    let items: string | string[];

    if (typeof rules === 'string') {
      items = rules.split('|');
    } else {
      items = rules;
    }

    return SpecParser.ProcessRuleArray(items);
  }

  private static ProccessSchema(
    hilevel: HighLevelSpecObject,
    result: LowLevelSpecObject
  ) {
    const schema = hilevel.schema;
    const dstSchema = result.schema;

    const requiredArr: string[] = [];
    for (const key in schema) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        const { required, nullable, rules } = SpecParser.ProcessRules(
          schema[key].rules
        );

        dstSchema[key] = {
          rules,
          nullable,
          type: schema[key].type,
        };

        if (required) {
          requiredArr.push(key);
        }

        SpecParser.ProcessNode(schema[key], dstSchema[key]);

        if (requiredArr.length > 0) {
          const rule = { name: RuleNames.REQUIRED, params: requiredArr };
          result.rules = [rule, ...result.rules];
        }
      }
    }
  }

  private static ProcessArray(
    hilevel: HighLevelSpecArray,
    result: LowLevelSpecArray
  ) {
    const elems = hilevel.elements;

    const { required, nullable, rules } = SpecParser.ProcessRules(elems.rules);
    result.elements = {
      nullable,
      rules,
      type: elems.type,
    };

    if (required) {
      result.rules.push({
        name: RuleNames.REQUIRED,
        params: [],
      });
    }

    SpecParser.ProcessNode(hilevel.elements, result.elements);
  }

  private static ProcessNode(hilevel: HighLevelSpec, lolevel: LowLevelSpec) {
    if (isHiObject(hilevel)) {
      const lolevelObj: LowLevelSpecObject = lolevel as LowLevelSpecObject;
      lolevelObj.schema = {};
      SpecParser.ProccessSchema(hilevel, lolevelObj);
    } else if (isHiArray(hilevel)) {
      SpecParser.ProcessArray(hilevel, lolevel as LowLevelSpecArray);
    } // else error
  }
}
