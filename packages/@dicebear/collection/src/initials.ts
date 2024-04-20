import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/initials.json" with {
    type: "json"
};

type InitialsOptions = {
        textColor: string[];
    };

const initials = createStyle<InitialsOptions>(definition as Definition);

export { initials };
