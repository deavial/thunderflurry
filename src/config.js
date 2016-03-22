/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

/* eslint-disable max-len */
/* jscs:disable maximumLineLength */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const analytics = {

  // https://analytics.google.com/
  google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-75301203-1' },

};

