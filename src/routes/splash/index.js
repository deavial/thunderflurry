/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import React from 'react';
import Splash from './Splash';

export const path = '/';
export const action = async (state) => {
	const title = 'ThunderFlurry';
	state.context.onSetTitle(title);
	return <Splash title={title} />;
}
