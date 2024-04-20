import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/icons.json" with {
    type: "json"
};

type IconsOptions = {
        icon?: Array<'alarm' | 'archive' | 'award' | 'bag' | 'bandaid' | 'bank' | 'basket' | 'basket2' | 'basket3' | 'bell' | 'bicycle' | 'binoculars' | 'book' | 'bookshelf' | 'boombox' | 'box' | 'boxes' | 'boxSeam' | 'bricks' | 'briefcase' | 'brightnessHigh' | 'brush' | 'bucket' | 'bug' | 'building' | 'calculator' | 'camera' | 'cameraReels' | 'cart2' | 'cashCoin' | 'clock' | 'cloud' | 'cloudDrizzle' | 'cloudMoon' | 'clouds' | 'cloudSnow' | 'coin' | 'compass' | 'controller' | 'cup' | 'cupStraw' | 'dice5' | 'disc' | 'display' | 'doorClosed' | 'doorOpen' | 'dpad' | 'droplet' | 'easel' | 'egg' | 'eggFried' | 'emojiHeartEyes' | 'emojiLaughing' | 'emojiSmile' | 'emojiSmileUpsideDown' | 'emojiSunglasses' | 'emojiWink' | 'envelope' | 'eyeglasses' | 'flag' | 'flower1' | 'flower2' | 'flower3' | 'gem' | 'gift' | 'globe' | 'globe2' | 'handbag' | 'handThumbsUp' | 'hdd' | 'heart' | 'hourglass' | 'hourglassSplit' | 'house' | 'houseDoor' | 'inbox' | 'inboxes' | 'key' | 'keyboard' | 'ladder' | 'lamp' | 'laptop' | 'lightbulb' | 'lightning' | 'lightningCharge' | 'lock' | 'magic' | 'mailbox' | 'map' | 'megaphone' | 'minecart' | 'minecartLoaded' | 'moon' | 'moonStars' | 'mortarboard' | 'mouse' | 'mouse2' | 'newspaper' | 'paintBucket' | 'palette' | 'palette2' | 'paperclip' | 'pen' | 'pencil' | 'phone' | 'piggyBank' | 'pinAngle' | 'plug' | 'printer' | 'projector' | 'puzzle' | 'router' | 'scissors' | 'sdCard' | 'search' | 'send' | 'shop' | 'shopWindow' | 'signpost' | 'signpost2' | 'signpostSplit' | 'smartwatch' | 'snow' | 'snow2' | 'snow3' | 'speaker' | 'star' | 'stoplights' | 'stopwatch' | 'sun' | 'tablet' | 'thermometer' | 'ticketPerforated' | 'tornado' | 'trash' | 'trash2' | 'tree' | 'trophy' | 'truck' | 'truckFlatbed' | 'tsunami' | 'umbrella' | 'wallet' | 'wallet2' | 'watch' | 'webcam'>;
    };

const icons = createStyle<IconsOptions>(definition as Definition);

export { icons };
