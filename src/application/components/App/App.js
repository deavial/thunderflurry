/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import config from '../../../package.json';

class App extends Component {

	static propTypes = {
		context: PropTypes.shape({
			insertCss: PropTypes.func,
			onSetTitle: PropTypes.func,
			onSetMeta: PropTypes.func,
			onPageNotFound: PropTypes.func
		}),
		children: PropTypes.element.isRequired,
		error: PropTypes.object
	};

	static childContextTypes = {
		insertCss: PropTypes.func.isRequired,
		onSetTitle: PropTypes.func.isRequired,
		onSetMeta: PropTypes.func.isRequired,
		onPageNotFound: PropTypes.func.isRequired
	};

	getChildContext() {
		const context = this.props.context;
		return {
			insertCss: context.insertCss || emptyFunction,
			onSetTitle: context.onSetTitle || emptyFunction,
			onSetMeta: context.onSetMeta || emptyFunction,
			onPageNotFound: context.onPageNotFound || emptyFunction
		};
	}

	componentWillMount() {
		const { insertCss } = this.props.context;
		this.removeCss = insertCss(s);
	}

	componentWillUnmount() {
		this.removeCss();
	}

	render() {
		return !this.props.error ? (
			<div className={s['splash-begin']}>
				<div className={s.container}>
					<div className={s['image-container']}></div>
					<div className={s['image-caption']}>Something Wicked This Way Comes</div>
				</div>
				<div className={s['version-label']}>
					<div><a href="https://thunderflurry.github.io/">ThunderFlurry</a> build <a href="https://github.com/thunderflurry/thunderflurry">v.{config.version}</a></div>
				</div>
			</div>
		) : this.props.children;
	}

};

export default App;
