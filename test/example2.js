var assert = require( 'assert' );
var _case = require( '../case-expression' );

var randomInt = Math.floor( Math.random() * 100 );

_case( randomInt, [
  isOdd, function() {
    console.log( randomInt, 'is odd' );
  },
  randomInt, function() {
    console.log( randomInt, 'is even' );
  }
]);

function isOdd( n ) {
  return n % 2 !== 0;
}