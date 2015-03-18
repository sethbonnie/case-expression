module.exports = function( expr, patterns ) {
  var len = patterns.length;
  var block;
  var i;

  for ( i = 0; i < len; i += 2 ) {
    if ( equal(expr, patterns[i]) ) {
      block = patterns[i+1];
      if ( isFunction( block ) ) {
        return block();
      }
      else {
        return block;
      }
    }
  }
};

function equal( a, b ) {
  if ( ( a === b ) || 
       ( a == b ) ||
       ( isFunction( b ) && b(a) ) ||
       ( isRegExp( b ) && b.test( a ) ) ||
       ( isRegExp( b ) && isRegExp( a ) && a.toString() == b.toString() )
      ) {
    return true;
  }
  return false;
}

function isRegExp( x ) {
  return x instanceof RegExp;
}

function isFunction( fn ) {
  return typeof fn === 'function';
}