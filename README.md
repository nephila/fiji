# Fiji 

[![Build Status](https://travis-ci.org/nephila/fiji.svg)](https://travis-ci.org/nephila/fiji)
![Bower version](https://img.shields.io/bower/v/fiji.js.svg)
[![npm version](https://img.shields.io/npm/v/fiji.js.svg)](https://www.npmjs.com/package/fiji.js)

Lightweight, clear and simple method for decoupling javascript from templates

## Install

You can install with [bower](http://bower.io/) or [npm](https://www.npmjs.com/).
```
$ bower install fiji.js
$ npm install fiji.js
```

## Usage

Write your code somewhere and wrap it in a function ready to receive a context object
```
function myfunction(context) {
    console.log(context);
    console.log(context.choices[0].fields);
    console.log(context.normal);
    console.log(context.plain);
}
```
Then use fiji to create the context and call your function in your template
```
fiji({
    poll_id: {'{{poll.pk}}': Number},
    choices: {'{{poll.choice_set.all|jsonify|safe}}': Object},
    normal: {'[1, 2, 3]': Array},
    plain: 'text'
}).run(myfunction);
```
