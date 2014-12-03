sec-count-down-timer
====================

Count down rest seconds

```javascript
// Require
var SecCountDownTimer = require('sec-count-down-timer');

// Construct
var timer = new SecCountDownTimer({
    startSec: 30,
    onStart:  function() { console.log('START!'); }
    onCount:  function(sec) { console.log(sec); },
    onEnd:    function() { console.log('END!'); }
});

// Execute
timer.start();

// Others
timer.pause();
timer.resume();
timer.stop();
```
