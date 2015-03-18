var readline = require( 'readline' );
var _case = require( '../case-expression' );

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question( "Do you like node.js? [yes/no]\n", function( ans ) {
  _case( ans, [
    /yes|no/i, function() {
      console.log( 'Thanks for your feedback!' );
      rl.close();
    },
    /.*/, function() {
      console.log( 'Ok...way to follow directions!' );
      rl.close();
    }
  ]);
});