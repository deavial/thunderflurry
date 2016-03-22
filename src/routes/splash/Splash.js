/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Splash.scss';

function Splash({title}) {
	return (
		<div className={s.root}>
			<div className={s.container}>
				<h1>{title}</h1>
				<p>...</p>
			</div>
		</div>
	);
}

Splash.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Splash, s);
