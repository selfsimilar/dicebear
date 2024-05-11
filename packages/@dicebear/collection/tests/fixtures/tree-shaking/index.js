import { createAvatar } from '@dicebear/core';
import { Identicon } from '../../../lib/index.js';

document.body.innerHTML = createAvatar(Identicon, { seed: 'John Doe' });
