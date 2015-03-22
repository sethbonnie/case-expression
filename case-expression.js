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

/**
  * @param {Any} value
  * @param {Any} pattern - A pattern that `value` is matched against. It
  *   it can also be a predicate value.
  * @returns {Boolean} Returns true if `value` and `pattern` have the
  */
function equal( value, pattern ) {
  if ( ( value === pattern ) ||
       ( isFunction( pattern ) && pattern(value) ) ||
       ( isRegExp( pattern ) && 
         isRegExp( value ) && 
         value.toString() == pattern.toString() ) ||
       ( isRegExp( pattern ) && pattern.test( value ) ) ||
       ( isRegExp( value ) && value.test( pattern ) ) ) {
    return true;
  }
  return false;
}

/**
  * @param {Any} x
  * @returns {Boolean} Returns true if its argument is a regular expression.
  */
function isRegExp( x ) {
  return x instanceof RegExp;
}

/**
  * @param {Any} fn
  * @returns {Boolean} Returns true if its argument is a function.
  */
function isFunction( fn ) {
  return typeof fn === 'function';
}