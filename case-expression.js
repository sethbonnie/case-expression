/** 
  * A case-expression is a function that simulates a slightly more expressive
  * `switch` statement. It's influenced by Haskell's case expression.
  *
  * @param {*} expr - A value that is tested against the patterns in the
  *   `patterns` associative array.
  * @param {Array} patterns - An associative array holding sets of 
  *   `pattern` -> `block` pairs.
  * @returns {undefined|Object} Returns `undefined` if no patterns matched
  *   the given expression. Otherwise it returns the block. If the block is
  *   a function, it returns the result of evaluating that function.
  */
module.exports = function caseExpression( expr, patterns ) {
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
  * @param {*} value
  * @param {*} pattern - A pattern that `value` is matched against. It
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
  * @param {*} x
  * @returns {Boolean} Returns true if its argument is a regular expression.
  */
function isRegExp( x ) {
  return x instanceof RegExp;
}

/**
  * @param {*} fn
  * @returns {Boolean} Returns true if its argument is a function.
  */
function isFunction( fn ) {
  return typeof fn === 'function';
}