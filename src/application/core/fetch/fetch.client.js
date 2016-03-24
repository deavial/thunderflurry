/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import 'whatwg-fetch';

export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
