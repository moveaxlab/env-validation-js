import XRegExp from 'xregexp';
import { JSONData, TypeNames } from '../declarations';
import { StringType } from './StringType';

class EmailType extends StringType {
  name(): TypeNames {
    return TypeNames.EMAIL;
  }

  protected validateType(value: JSONData): boolean {
    const regex = XRegExp(
      `
      ^
      (?:
        # letters & symbols with dots between them
        [a-z0-9!#$%&'*+/=?^_\\\`{|}~-]+
        (?:
          \\.
          [a-z0-9!#$%&'*+/=?^_\\\`{|}~-]+
        )*
        |
        # or IDK WTF this is
        "
          (?:
            [\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]
            |
            \\
            [\x01-\x09\x0b\x0c\x0e-\x7f]
          )*
        "
      )
      # then an at
      @
      (?:
        # lowercase letters & numbers words
        # with dashes in the middle and dots between words
        (?:
          [a-z0-9]
          (?:
            [a-z0-9-]*
            [a-z0-9]
          )?
          \\.
        )+
        [a-z0-9]
        (?:
          [a-z0-9-]*
          [a-z0-9]
        )?
        # or square brackets containing an ip (v4 or v6) address I guess
        |
        \\[
        (?:
          (?:
            25[0-5]
            |
            2[0-4][0-9]
            |
            [01]?[0-9][0-9]?
          )
          \\.
        ){3}
        (?:
          25[0-5]
          |
          2[0-4][0-9]
          |
          [01]?[0-9][0-9]?
          |
          [a-z0-9-]*[a-z0-9]
          :
          (?:
            [\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]
            |
            \\
            [\x01-\x09\x0b\x0c\x0e-\x7f]
          )+
        )
        \\]
      )
      $
    `,
      'xi'
    );

    return regex.test(value as string);
  }
}

export { EmailType };
