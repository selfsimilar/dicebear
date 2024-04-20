import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/fun-emoji.json" with {
    type: "json"
};

type FunEmojiOptions = {
        eyes?: Array<'closed' | 'closed2' | 'crying' | 'cute' | 'glasses' | 'love' | 'pissed' | 'plain' | 'sad' | 'shades' | 'sleepClose' | 'stars' | 'tearDrop' | 'wink' | 'wink2'>;
        mouth?: Array<'cute' | 'drip' | 'faceMask' | 'kissHeart' | 'lilSmile' | 'pissed' | 'plain' | 'sad' | 'shout' | 'shy' | 'sick' | 'smileLol' | 'smileTeeth' | 'tongueOut' | 'wideSmile'>;
    };

const funEmoji = createStyle<FunEmojiOptions>(definition as Definition);

export { funEmoji };
