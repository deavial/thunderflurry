# Thunderflurry Virtual Host

Middleware for `express` or `connect` to create virtual, self-contained application nodes in ThunderFlurry. Based originally on virtual-host, overhauled to add features specifically needed for ThunderFlurry's core.

### Install

```bash
$ npm install thunderflurry-virtualhost --save
```

Requre

```js
var host = require('thunderflurry-virtualhost')(express);
```

Or ES7

```
import virtualhost from 'thunderflurry-virtualhost';
const host = virtualhost(express);
```

### API

#### vhost(hostname)

Creates an instance of `express` (or `connect`), and a middleware you can `.use` in your main application.

You must provide a `hostname` to restrict the hostnames the virtual server will be used on. `hostname` is used to build a regular expression to test against `req.headers.host`, after stripping out the `port`. Stars `'*'` will be converted to `(.*)`. You can use any characters in this set: `[a-zA-Z_0-9.*-]`. You may also provide an array of hostnames to `hostname`.

You can also just use a `RegExp` object as a `hostname` directly.

Example hostnames:

```js
vhost('*')                // results in /^(.*)$/
vhost('*.foo.com')        // results in /^(.*)\.foo\.com$/i
vhost('www.*.com')        // results in /^www\.(.*)\.com$/i
vhost(/^www\.foo\.com$/i) // results in /^www\.foo\.com$/i
vhost(['www.*', 'test.*'] // results in /^www\.(.*)$/i AND /^test\.(.*)$/i
```

Special case: The tile `~` is a special case that will match localhost and the root domain. Example:

```js
vhost('~')                // matches localhost and example.com
vhost(['www.*', '~'])     // matches localhost and example.com and www.example.com
```

#### vhost(hostname).off

Turns off the middleware, it will automatically `.next` all future requests.

```js
var express = require('express');
var vhost = require('virtual-host')(express);
var www = vhost('www.*');

// configure www

app.use(www);

somethingBadHappens(function(){
    www.off(); // disable www
});
```

#### vhost(hostname).on

Turns on the middleware, it will start handling requests once again.

```js
var express = require('express');
var vhost = require('virtual-host')(express);
var www = vhost('www.*');

// configure www

app.use(www);

somethingGoodHappens(function(){
    www.on(); // re-enable www
});
```

#### vhost(hostname).server

Exposes the `express` or `connect` instance used by this `vhost`.

## Usage

```js
var express = require('express');
var vhost = require('virtual-host')(express);
var app = express();
var www = vhost('www.*');

www.use(function(req,res,next){
    console.log(req.url);

    if(req.url === '/off'){
        www.off();
        res.send(500);
    }else{
        res.send(200);
    }    
});

app.use(www);
```

#### vhost(hostname).handlesRoot

Returns true if `~` was used as a hostname and false if it wasn't included.

## Usage

```js
var express = require('express');
var vhost = require('virtual-host')(express);
var app = express();
var www = vhost('~');

if (www.handlesRoot) {
   console.log('Tilde was used');
}
```

#### vhost(hostname).hosts

Returns the array of hosts the adapter is handling.

## Usage

```js
var express = require('express');
var vhost = require('virtual-host')(express);
var app = express();
var www = vhost(['~', 'www.*']);

www.forEach(function (item) {
  console.log(item);
}
```
