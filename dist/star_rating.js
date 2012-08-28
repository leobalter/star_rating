/*! Star Rating JS - v0.1.0 - 2012-08-28
* https://github.com/leobalter/star_rating
* Copyright (c) 2012 Estante Virtual; Licensed MIT, GPL */

(function( $ ) {
  function apply() {
    var template = $( '#starRating' ).html(),
        self = $( this ),
        rateString = self.text(),
        isPercentage = ( rateString.indexOf( '%' ) > 0 ) || ( rateString.indexOf( '/' ) < 0 ),
        rates = 0,
        totalVotes,
        rate,
        rateTitle = $( '#starRating' ).data( 'title' );

    rateTitle = ( rateTitle || "" ).replace( /\{rate\}/g, rateString );

    if ( isPercentage ) {
      rate = rateString.replace( /,/g, '.' );
      rate = rate.replace( /%/g, '' );
    } else {
      rates = rateString.split( '/' )[ 0 ];
      totalVotes = rateString.split( '/' )[ 1 ];
      rate = ( rates / totalVotes ) * 100;
    }

    // rating must be between 0 and 100
    if ( rate > 100 ) {
      rate = 100;
    } else if ( rate < 0 ) {
      rate = 0;
    }

    // remove this and Browsers will diverge rounding float numbers
    rate = parseInt( rate, 10 );
    rate += '%';

    self.html( template );

    self.find( '.starRating' ).attr( 'title', rateTitle );

    self.find( '.starRatingBack' ).width( rate );
  }

  jQuery.fn.starRating = function() {
    return this.each( apply );
  };

}( jQuery ));  