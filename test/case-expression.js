var assert = require( 'assert' );
var _case = require( '../case-expression' );

describe( 'case( expr, pattern )', function() {

  describe( 'when `expr` is a Number', function() {
    it( 'returns `undefined` if none of the patterns match', function() {
      var result = _case( 0, [
        '1', 'first',
        '2', 'second',
        '3', 'third' 
      ]);

      assert.strictEqual( result, undefined );
    });

    it( 'returns the matching block if there is an exact match', function() {
      var result = _case( 2, [
        1, 'first',
        2, 'second',
        3, 'third' 
      ]);

      assert.strictEqual( result, 'second' );
    });

    it( 'returns the matching block for matching regexps', function() {
      var result = _case( 321, [
        /^\d{1}$/, 'ones',
        /^\d{2}$/, 'tens',
        /^\d{3}$/, 'hundreds', 
        /^\d{4}$/, 'thousands'
      ]);

      assert.strictEqual( result, 'hundreds' );
    });

    it( 'returns the matching block for matching predicates', function() {
      var result;
      var greaterThan5 = function( n ) { return n > 5 };

      result = _case( 10, [
        greaterThan5, 'first'
      ]);

      assert.strictEqual( result, 'first' );
    });
  });

  describe( 'when `expr` is a Boolean', function() {
    it( 'returns `undefined` if none of the patterns match', function() {
      var falseResult;
      var trueResult;

      falseResult = _case( false, [
        undefined, 'first',
        null, 'second',
        0, 'third',
        '', 'fourth',
        [], 'fifth'
      ]);

      trueResult = _case( true, [
        1, 'first',
        '1', 'second'
      ]);

      assert.strictEqual( falseResult, undefined );
      assert.strictEqual( trueResult, undefined );
    });

    it( 'only matches direct values of `true` and `false`', function() {
      var falseResult;
      var trueResult;

      falseResult = _case( false, [
        undefined, 'first',
        null, 'second',
        0, 'third',
        '', 'fourth',
        [], 'fifth',
        false, 'last'
      ]);

      trueResult = _case( true, [
        1, 'first',
        '1', 'second',
        true, 'last'
      ]);

      assert.strictEqual( falseResult, 'last' );
      assert.strictEqual( trueResult, 'last' );
    });

    it( 'matches the corresponding regular expression', function() {
      var falseResult;
      var trueResult;

      falseResult = _case( false, [
        /false/, 'first'
      ]);

      trueResult = _case( true, [
        /true/, 'first'
      ]);

      assert.strictEqual( falseResult, 'first' );
      assert.strictEqual( trueResult, 'first' );
    });

    it( 'matches predicates', function() {
      var falseResult;
      var trueResult;
      var isFalse = function( x ) { return x === false };
      var isTrue = function( x ) { return x === true };

      falseResult = _case( false, [
        isFalse, 'first'
      ]);

      trueResult = _case( true, [
        isTrue, 'first'
      ]);

      assert.strictEqual( falseResult, 'first' );
      assert.strictEqual( trueResult, 'first' );
    });
  });

  describe( 'when `expr` is a String', function() {
    it( 'returns `undefined` if none of the patterns match', function() {
      var result = _case( 'hello', [
        'abc', 'first',
        'h*', 'second',
        'hell', 'third' 
      ]);

      assert.strictEqual( result, undefined );
    });

    it( 'returns the matching block if there is an exact match', function() {
      var result = _case( 'hello', [
        'hallo', 1,
        'bonjour', 2,
        'ciao', 3,
        'hello', 4
      ]);

      assert.equal( result, 4 );
    });

    it( 'returns the matching block for matching regexps', function() {
      var result = _case( 'YES', [
        'hallo', 1,
        'bonjour', 2,
        'ciao', 3,
        /yes|no/i, 4
      ]);

      assert.equal( result, 4 );
    });

    it( 'returns the matching block for matching predicates', function() {
      var result1;
      var result2;
      var is5CharsOrLonger = function( str ) { return str.length >= 5 };

      result1 = _case( 'hello', [ 
        is5CharsOrLonger, true
      ]);

      result2 = _case( 'abc', [
        is5CharsOrLonger, true
      ]);

      assert.strictEqual( result1, true );
      assert.strictEqual( result2, undefined );
    });
  });

  describe( 'when there are multiple matching patterns', function() {
    it( 'returns the first matching block', function() {
      var result = _case( 'abc', [
        /abc/, 'first',
        'abc', 'second'
      ]);

      assert.equal( result, 'first' );
    });
  });

  describe( 'when matching block is a function', function() {

    it( 'evaluates the function', function() {
      _case( 'abc', [
        'abc', function() { assert( true ); }
      ]);
    });

    it( 'returns the result of evaluating the function', function() {
      var result = _case( 'abc', [
        'abc', function() { return 'first'; }
      ]);

      assert.equal( result, 'first' );
    });
  });
});