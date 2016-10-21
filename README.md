# situscale
Node.js interface for reading data from SITU® Smart Food Nutrition Scale over a bluetooth low energy connection.

## Badges
[![bitHound Overall Score](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/score.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale)
[![bitHound Dependencies](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/dependencies.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/shantanubhadoria/node-situscale/badges/code.svg)](https://www.bithound.io/github/shantanubhadoria/node-situscale)

## Description
This package allows you to set up asynchronous notifications for weight update notifications from SITU scale.

![SITU Scale](/corpus/situscale.png)

## Dependencies

### Ubuntu/Debian/Raspbian

```shell
$ sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
```

### Fedora/RPM Based

```shell
$ sudo yum install bluez bluez-libs bluez-libs-devel
```

## Install

You can install this package with `npm`.

### npm

```shell
$ npm install situscale
```

## Using the command line helper
When you install this module, you will also find a new command available to you to test if you are able to detect situscales in your vicinity.

```shell
$ search-situscales
  Discovered SITU scale with address:  c6:e3:c7:5e:fd:fc
  0 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  0 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  0 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  0 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  0 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  627 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  627 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  627 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  1165 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  1165 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  1165 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  522 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  522 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
  522 'Received from scale with address' 'c6:e3:c7:5e:fd:fc'
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
"use strict";
var SituScale = require("./situscale").SituScale;
SituScale.searchScales(function (scale) {
    console.log("Discovered SITU scale with address: ", scale.address);

    // Set weight callback for the discovered scale
    scale.callback = function (weight) {
        console.log(weight, " from scale ", scale.address);
    };

    // Stop weight notifications after 3 seconds
    setTimeout(
      scale.pauseNotifications(),
      3000
    );
});
```

```ts
// discover.ts or ES2015
import { SituScale } from "situscale";

SituScale.searchScales((scale) => {
  console.log("Discovered SITU scale with address: ", scale);
  scale.callback = (weight) => {
    console.log(weight, scale.address);
  }
});
```

## Receiving weight notifications from a specific SITU scale
Once you know the address for your SITU scale you can receive weight notifications from it as and when they happen.
Note that the weight is always received in grams and you must convert it to other unit of calculation if you need to.

```javascript
// getWeight.js
"use strict";
var SituScale = require("situscale").SituScale;
var scale = new SituScale("c6:e3:c7:5e:fd:fc", function (weight) {
    console.log(weight);
});

setTimeout(function () {
    console.log('stopping notifications');
    scale.pauseNotifications();
    setTimeout(function () {
        console.log('starting notifications');
        scale.startNotifications();
    }, 4000);
}, 4000);
```

```ts
// getWeight.ts or ES2015
import { SituScale } from "./situscale";

let scale = new SituScale("c6:e3:c7:5e:fd:fc", (weight) => {
  console.log(weight);
});

// Stop weight notifications after 4 seconds 
setTimeout(function(){
  console.log('stopping notifications');
  scale.pauseNotifications();
 
  // Start weight notifications after another 4 seconds 
  setTimeout(function(){
    console.log('starting notifications');
    scale.startNotifications();
  }, 4000);
}, 4000);
```

## Receiving weight notifications from all the SITU scales in your vicinity (new syntax since v2.0.0)
If you wish to receive notifications from all available SITU scales in your vicinity without knowing the address of the
SITU scales, then you may use the searchScales function.

### Javascript
```javascript
"use strict";
var SituScale = require("./situscale").SituScale;
SituScale.searchScales(function (scale) {
    // Set weight callback for the discovered scale to receive weight notifications
    scale.callback = function (weight) {
        console.log(weight, " from scale ", scale.address);
    };
});
```

### ES2015 or Typescript
```ts
import { SituScale } from "situscale";

SituScale.searchScales((scale) => {
  scale.callback = (weight) => {
    console.log(weight, " from scale ", scale.address);
  }
});
```

## Turning weight notifications on or off after connecting.
You can turn off weight notifications and turn them on as needed intermittently to save scale battery. The scale will
still be connected on bluetooth but it will not send notifications while the notifications are turned off this way.

### Javascript
```javascript
var SituScale = require("situscale").SituScale;
var scale = new SituScale("c6:e3:c7:5e:fd:fc", function (weight) {
    console.log(weight);
});

setTimeout(function () {
    console.log('stopping notifications');
    scale.pauseNotifications();
    setTimeout(function () {
        console.log('starting notifications');
        scale.startNotifications();
    }, 4000);
}, 4000);
```

### ES2015 or Typescript
```ts
import { SituScale } from "./situscale";

let scale = new SituScale("c6:e3:c7:5e:fd:fc", (weight) => {
  console.log(weight);
});

setTimeout(function(){
  console.log('stopping notifications');
  scale.pauseNotifications();
 
  setTimeout(function(){
    console.log('starting notifications');
    scale.startNotifications();
  }, 4000);
}, 4000);
```

## Disconnecting from the scale
You can disconnect from the SITU scale when you are done using it. Note that in disconnected state the scale will
automatically power down after some time.

```javascript
var SituScale = require("situscale").SituScale;
var scale = new SituScale("c6:e3:c7:5e:fd:fc", function (weight) {
    console.log(weight);
});


// Stop weight notifications after 3 seconds
setTimeout(function(){
  scale.pauseNotifications();
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
