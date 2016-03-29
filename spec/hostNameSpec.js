var express = require('express');
var vhost = require('../index')(express);


describe('vHost Creation', function () {
    describe('Handles the host names correctly', function() {
        it('Allows host name to be a string', function () {
            var test = function () {
                return vhost('www.*');
            };
            expect(test).not.toThrow();
        });
        it('Allows host name to be an array of strings', function () {
            var test = function () {
                return vhost(['www.*', 'test']);
            };
            expect(test).not.toThrow();
        });
        it('Errors on a number', function () {
           var test = function () {
               return vhost(123);
           };
           expect(test).toThrow();
        });
        it('Errors on a number in array', function () {
           var test = function () {
               return vhost(['www', 123]);
           };
           expect(test).toThrow();
        });
        it('Errors on empty array', function () {
            var test = function () {
                return vhost([]);
            };
            expect(test).toThrow();
        });
        it('Errors on empty value', function () {
            var test = function () {
                return vhost();
            };
            expect(test).toThrow();
        });
        it('Errors on function value', function () {
            var test = function () {
                return vhost(function () {});
            };
            expect(test).toThrow();
        });
        it('Errors on object value', function () {
            var test = function () {
                return vhost({});
            };
            expect(test).toThrow();
        });
        it('Allows alphabet', function () {
            var test = function () {
                return vhost('abcdefghijklmnopqrstuvwxyz');
            };
            expect(test).not.toThrow();
        });
        it('Allows alphabet (uppercase)', function () {
            var test = function () {
                return vhost('ABCDEFGHIJKLMNOPQURSTUVWXYZ');
            };
            expect(test).not.toThrow();
        });
        it('Allows numbers', function () {
            var test = function () {
                return vhost('1234567890');
            };
            expect(test).not.toThrow();
        });
        it('Allows underscore', function () {
            var test = function () {
                return vhost('hello_kitty');
            };
            expect(test).not.toThrow();
        });
        it('Allows dash', function () {
            var test = function () {
                return vhost('hello-kitty');
            };
            expect(test).not.toThrow();
        });
        it('Allows asterisk', function () {
            var test = function () {
                return vhost('hello*');
            };
            expect(test).not.toThrow();
        });
        it('Allows dot', function () {
            var test = function () {
                return vhost('hello.kitty');
            };
            expect(test).not.toThrow();
        });
        it('Disallows exclamation', function () {
            var test = function () {
                return vhost('hello!kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows ampersand', function () {
            var test = function () {
                return vhost('hello&kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows at', function () {
            var test = function () {
                return vhost('hello@kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows hash', function () {
            var test = function () {
                return vhost('hello#kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows dollar', function () {
            var test = function () {
                return vhost('hello$kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows percent', function () {
            var test = function () {
                return vhost('hello%kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows carrot', function () {
            var test = function () {
                return vhost('hello^kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows paren open', function () {
            var test = function () {
                return vhost('hello(kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows paren close', function () {
            var test = function () {
                return vhost('hello)kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows equal', function () {
            var test = function () {
                return vhost('hello=kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows plus', function () {
            var test = function () {
                return vhost('hello+kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows pipe', function () {
            var test = function () {
                return vhost('hello|kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows bracket open', function () {
            var test = function () {
                return vhost('hello[kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows bracket close', function () {
            var test = function () {
                return vhost('hello]kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows curly open', function () {
            var test = function () {
                return vhost('hello{kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows curly close', function () {
            var test = function () {
                return vhost('hello}kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows quote', function () {
            var test = function () {
                return vhost('hello\'kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows double quote', function () {
            var test = function () {
                return vhost('hello"kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows question mark', function () {
            var test = function () {
                return vhost('hello?kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows forward slash', function () {
            var test = function () {
                return vhost('hello/kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows back slash', function () {
            var test = function () {
                return vhost('hello\\kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows comma', function () {
            var test = function () {
                return vhost('hello,kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows less than', function () {
            var test = function () {
                return vhost('hello<kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows greater than', function () {
            var test = function () {
                return vhost('hello>kitty');
            };
            expect(test).toThrow();
        });
        it('Disallows tilde in word', function () {
            var test = function () {
                return vhost('hello~kitty');
            };
            expect(test).toThrow();
        });
        it('Allows tilde alone', function () {
            var test = function () {
                return vhost('~');
            };
            expect(test).not.toThrow();
        });
        it('Disallows forward quote', function () {
            var test = function () {
                return vhost('hello`kitty');
            };
            expect(test).toThrow();
        });
    });

    describe('Executes functionality', function() {
        it('Understands it is root when host is ~', function () {
            var test = function () {
                var vh = vhost('~');
                return vh.handlesRoot();
            };
            expect(test).toBeTruthy();
        });
        it('Exposes the hosts', function () {
            var test = function () {
                var vh = vhost(['www','test']);
                return vh.hosts().length;
            };
            expect(test()).toEqual(2);
        });
    });
});
