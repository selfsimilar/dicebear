import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/identicon.json" with {
    type: "json"
};

type IdenticonOptions = {
        row1?: Array<'ooxoo' | 'oxoxo' | 'oxxxo' | 'xooox' | 'xoxox' | 'xxoxx' | 'xxxxx'>;
        row2?: Array<'ooxoo' | 'oxoxo' | 'oxxxo' | 'xooox' | 'xoxox' | 'xxoxx' | 'xxxxx'>;
        row3?: Array<'ooxoo' | 'oxoxo' | 'oxxxo' | 'xooox' | 'xoxox' | 'xxoxx' | 'xxxxx'>;
        row4?: Array<'ooxoo' | 'oxoxo' | 'oxxxo' | 'xooox' | 'xoxox' | 'xxoxx' | 'xxxxx'>;
        row5?: Array<'ooxoo' | 'oxoxo' | 'oxxxo' | 'xooox' | 'xoxox' | 'xxoxx' | 'xxxxx'>;
        rowColor: string[];
    };

const identicon = createStyle<IdenticonOptions>(definition as Definition);

export { identicon };
