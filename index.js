/**
 *	ThunderFlurry Virtual Host (https://thunderflurry.github.io/)
 *
 * Copyright © 2016 Cinecove Digital, LLC. All rights reserved
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

'use strict';

var EXPRESSIONS = {
    invalidHostNameTokens: /[^a-zA-Z_0-9.*-]/,
    findDotSeparator: /\./g,
    findWildCard: /\*/g
};

function buildHostRegex(input) {
    if (typeof input !== 'string') {
        throw new Error('Invalid hostname provided. Must be a string or array of string: ' + input);
    }

    if (input === '~') {
        return '';
    }

    var hostname = input || '*';
    if (EXPRESSIONS.invalidHostNameTokens.test(hostname)) {
        throw new Error('Invalid characters in host pattern: ' + hostname);
    }

    var pattern = hostname
        .replace(EXPRESSIONS.findDotSeparator, '\\.')
        .replace(EXPRESSIONS.findWildCard, '(.*)');

    return new RegExp('^' + pattern + '$', 'i');
}

module.exports = function (factory) {
    return function (hostname) {
        var hosttable = [];
        if (Object.prototype.toString.call( hostname ) === '[object Array]') {
            hostname.forEach(function (e) {
                hosttable.push({ host: e, expression: buildHostRegex(e)});
            });
        } else {
            hosttable.push({ host: hostname, expression: buildHostRegex(hostname)});
        }

        if (hosttable.length < 1) {
            throw new Error('No host name was provided');
        }

        var active = true;

        var middleware = function (req, res, next) {
            if (middleware.isActive() === false) {
                return next();
            }

            if (!req.headers.host) {
                return next();
            }

            var host = req.headers.host.split(':')[0];
            var parts = host.split('.');

            var matches = hosttable.map(function(k) {
                if (k.expression === '' && k.host === '~') {
                    if (parts.length < 3 || (parts.length === 1 && parts[0].toLocaleLowerCase() === 'localhost')) {
                        return k;
                    }
                }
                else {
                    if (k.expression.test(host)) {
                        return k;
                    }
                }
            });

            if (matches.length === 0) {
                return next();
            }

            if (typeof middleware.server === 'function') {
                return middleware.server(req, res, next);
            }
            middleware.server.emit('request', req, res);
        };

        middleware.server = factory();

        middleware.off = function() {
            active = false;
        };

        middleware.on = function () {
            active = true;
        };

        middleware.isActive = function () {
            return active;
        };

        middleware.handlesRoot = function () {
            return middleware.hosts().contains('~');
        };

        middleware.hosts = function () {
            return hosttable.map(function (i) {
                return i.host;
            });
        };

        return middleware;
    };
};
