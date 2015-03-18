# CaseExpression
`case-expression` is a control-construct similar to Haskell's `case` expression. It takes 2 arguments, a pattern to match on and an associative array of pattern-block pairs.

## Install
    $ npm install case-expression 

## Usage
```js
var readline = require( 'readline' );
var _case = require( 'case-expression' );

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question( "Do you like node.js? [yes/no]", function( ans ) {
  _case( ans, [
    /yes|no/i, function() {
      console.log( 'Thanks for your feedback!' );
      rl.close();
    },
    /.*/, function() {
      console.log( 'Ok...' );
      rl.close();
    }
  ]);
});
```

## License
The MIT License (MIT)

Copyright &copy; 2015 Seth Bonnie

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.