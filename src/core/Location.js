/**
 *	ThunderFlurry (https://thunderflurry.github.io/)
 *
 * Copyright © 2015 - 2016 Cinecove Digital, LLC. All rights reserved
 *
 * This source code is licensed under the BSD-3 license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import createHistory from 'history/lib/createBrowserHistory';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import useQueries from 'history/lib/useQueries';

const location = useQueries(process.env.BROWSER ? createHistory : createMemoryHistory)();

export default location;
