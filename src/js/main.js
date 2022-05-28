import * as commonFunctions from './modules/common.js';
import {initSwiper} from './modules/init-swiper.js';

import {sendForm} from './modules/send-form.js';
import {initMask} from './modules/mask.js';
import {initModal} from './modules/modal.js';




commonFunctions.checkSupportWebp();
initSwiper();
sendForm();
initMask();
initModal();
//console.log($('img'))
