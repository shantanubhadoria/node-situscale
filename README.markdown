# node-situscale
Node.js interface for reading data from SITU® Smart Food Nutrition Scale over bluetooth low energy connection.

## Badges
[![bitHound Overall Score](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/score.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale)
[![bitHound Dependencies](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/dependencies.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/code.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale)

## Description
This package allows you to set up asynchronous notifications for weight update notifications from SITU scale.

![SITU Scale](/corpus/situscale.png)

## Install

You can install this package either with `npm`.

### npm

```shell
npm install situscale
```

## Synopsis
```javascript
var SituScale = require('situscale');

var scaleInstance = new SituScale(address);
```

## Discovering Situscales in your vicinity
You can discover situscales in your vicinity using this module if you do not have the address for your situscale.

```javascript
// discover.js
var SituScale = require('situscale');

var scale = new SituScale();
scale.searchScales(function(scale) {
  // Callback run for every new scale discovered in the vicinity till stopSearching is called()
  console.log("Discovered SITU scale with address: " + scale.address);
});

// Stop Searching after 3 seconds
setTimeout(
  scale.stopSearching(),
  3000
);
```

## Receiving weight notifications from SITU scale
Once you know the address for your SITU scale you can receive weight notifications from it as and when they happen.
Note that the weight is always received in grams and you must convert it to other unit of calculation if you need to.

```javascript
var SituScale = require('situscale');

var address = "c6:e3:c7:5e:fd:fc";
var scaleInstance = new SituScale(address);

scale.getWeight(function(weight){
  console.log(weight);
});
```

## Turning weight notifications on or off after connecting.
You can turn off weight notifications and turn them on as needed intermittently to save scale battery. The scale will
still be connected on bluetooth but it will not send notifications while the notifications are turned off this way.

```javascript
var SituScale = require('situscale');

var address = "c6:e3:c7:5e:fd:fc";
var scaleInstance = new SituScale(address);

scale.getWeight(function(weight){ // This function is called each time a weight notification is received.
  console.log(weight);
});

// Stop weight notifications after 3 seconds
setTimeout(function(){
  scale.stopNotifications();
  console.log('stopped notifications');

  // Start weight notifications after another 3 seconds
  setTimeout(function(){
    scale.startNotifications();
    console.log('started notifications');
  });
});
```

## Disconnecting from the scale
You can disconnect from the SITU scale when you are done using it. Note that in disconnected state the scale will
automatically power down after some time at the moment.

```javascript
var SituScale = require('situscale');

var address = "c6:e3:c7:5e:fd:fc";
var scaleInstance = new SituScale(address);

scale.getWeight(function(weight){ // This function is called each time a weight notification is received.
  console.log(weight);
});

// Stop weight notifications after 3 seconds
setTimeout(function(){
  scale.stopNotifications();
  console.log('stopped notifications');
  setTimeout(function(){
    scale.disconnect();
    console.log('disconnected');
  }, 3000);
});
```

## License
The MIT License

Copyright (c) Shantanu Bhadoria. https://www.shantanubhadoria.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


##Copyrights and Trademarks
All labels including SITU® Smart Food Nutrition are trademarks of their respective owners.
Please refer http://situscale.com/copyrights-trademarks/ for trademark information.
Permission has been sought and received from SITU to release this module under the MIT license.
