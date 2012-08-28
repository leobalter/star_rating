/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function( $ ) {

  module( 'Star Rating' );

  test( 'enviroment', 2, function() {
    strictEqual( typeof( $.fn.starRating ), 'function', 'starRating is a jQuery function' );
    strictEqual( $( '#starRating' ).length, 1, 'template is present in the fixture, don´t touch' );
  });

  test( 'template', 3, function() {
    $( '#foo' ).text( '100%' );
    $( '#foo' ).starRating();
    
    strictEqual( $( '#foo' ).find( '.starRating' ).length, 1, '.starRating is copied from template' );
    strictEqual( $( '#foo' ).find( '.starRatingBack' ).length, 1, '.starRatingBack is copied from template' );
    strictEqual( $( '#foo' ).find( '.starRatingFront' ).length, 1, '.starRatingFront is copied from template' );
  });
  
  test( 'background width w/ % values', 4, function() {
    $( '#foo' ).text( '100%' );
    $( '#foo' ).starRating();
    var bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 100% value' );

    $( '#foo' ).text( '0%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 0, '0% width in 0% value' );
    
    $( '#foo' ).text( '50%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 50, '50% width in 50% value' );
    
    $( '#foo' ).text( '42%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 42, '42% width in 42% value' );

  });

  test( 'commas and points', 4, function() {
    $( '#foo' ).text( '23.7%' );
    $( '#foo' ).starRating();
    var bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 23, '23% width in 23.7% value' );
    
    $( '#foo' ).text( '51.1%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 51, '51% width in 51.1% value' );
    
    $( '#foo' ).text( '23,7%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 23, '23% width in 23,7% value' );
    
    $( '#foo' ).text( '51,1%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 51, '51% width in 51,1% value' );
  });

  test( 'division values', 7, function() {
    $( '#foo' ).text( '100/100' );
    $( '#foo' ).starRating();
    var bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 100/100 value' );
    
    $( '#foo' ).text( '42/100' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 42, '42% width in 42/100 value' );
    
    $( '#foo' ).text( '23/100' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 23, '23% width in 23/100 value' );
    
    $( '#foo' ).text( '0/100' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 0, '0% width in 0/100 value' );
    
    $( '#foo' ).text( '42/42' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 42/42 value' );
    
    $( '#foo' ).text( '23/46' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 50, '50% width in 23/46 value' );
    
    $( '#foo' ).text( '9900/10000' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 99, '99% width in 9900/10000 value' );
  });
  
  test( 'troll testing', 6, function() {
    $( '#foo' ).text( '103/100' );
    $( '#foo' ).starRating();
    var bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 103/100 value' );
    
    $( '#foo' ).text( '-1/100' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 0, '0% width in -1/100 value' );
    
    $( '#foo' ).text( '-20%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 0, '0% width in -20% value' );
    
    $( '#foo' ).text( '-120.20%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 0, '0% width in -120.20% value' );
    
    $( '#foo' ).text( '150%' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 150% value' );
    
    $( '#foo' ).text( '107.23/100' );
    $( '#foo' ).starRating();
    bgWidth = $( '#foo .starRatingBack' ).width();
    strictEqual( bgWidth, 100, '100% width in 107.23/100 value' );
  });
  
  test( 'data-title', 4, function() {
    $( '#foo' ).text( '99%' );
    $( '#starRating' ).data( 'title', '' );
    $( '#foo' ).starRating();
    var titleSet = $( '#foo' ).find( '.starRating' ).attr( 'title' );
    
    strictEqual( titleSet, '', 'title === "" if template data-title is empty' );
  
    $( '#foo' ).text( '99%' );
    $( '#starRating' ).data( 'title', 'title is set' );
    $( '#foo' ).starRating();
    titleSet = $( '#foo' ).find( '.starRating' ).attr( 'title' );
    
    strictEqual( titleSet, 'title is set', 'title is set with template data-title value' );
    
    $( '#foo' ).text( '98%' );
    $( '#starRating' ).data( 'title', '{rate} title is set' );
    $( '#foo' ).starRating();
    titleSet = $( '#foo' ).find( '.starRating' ).attr( 'title' );
    
    strictEqual( titleSet, '98% title is set', 'title is set with template data-title value and {rate} key' );
    
    $( '#foo' ).text( '97%' );
    $( '#starRating' ).data( 'title', '{rate} {rate} is set' );
    $( '#foo' ).starRating();
    titleSet = $( '#foo' ).find( '.starRating' ).attr( 'title' );
    
    strictEqual( titleSet, '97% 97% is set', 'multiple {rate} keys in data-title is set' );
  });
  
}( jQuery ));