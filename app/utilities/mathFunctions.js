const MathService = {

  /**
   * Calcuate 1RM, 3RM, 5RM, 8RM, 10RM, 12RM using 7 formulas and add then together and take the average values
   * @param {Number} weight
   * @param {Number} reps
   * @return {Object} - holds all maxes
   */
  calculateMaxes( weight, reps ) {
    const maxCalcFormulas = {};
    let total = 0;
    const maxRepList = [ 3, 5, 8, 10, 12 ];
    const maxRM = [];
    const estimatedRM = {
      estimated1RM: '',
      estimated3RM: '',
      estimated5RM: '',
      estimated8RM: '',
      estimated10RM: '',
      estimated12RM: '',
    };
    let lombardi,
      brzycki,
      epley,
      mayhew,
      oconner,
      wathan,
      lander;

    // calculate 1 rep max with various formulas
    maxCalcFormulas.lombardi = weight * Math.pow( reps, 1 / 10 );
    maxCalcFormulas.brzycki = weight * ( 36 / ( 37 - reps ) );
    maxCalcFormulas.epley = weight * ( 1 + ( reps / 30 ) );
    maxCalcFormulas.mayhew = ( weight * 100 ) / ( 52.2 + ( 41.9 * Math.exp( -1 * ( reps * 0.055 ) ) ) );
    maxCalcFormulas.oconner = weight * ( 1 + reps * 0.025 );
    maxCalcFormulas.wathan = ( weight * 100 ) / ( 48.8 + ( 53.8 * Math.exp( -1 * ( reps * 0.075 ) ) ) );
    maxCalcFormulas.lander = weight * 100 / ( 101.3 - 2.67123 * reps );

    Object.keys( maxCalcFormulas ).forEach( ( item ) => {
      total += maxCalcFormulas[ item ];
    } );

    const average1RM = Math.round( total / Object.keys( maxCalcFormulas ).length );
    // estimatedRM.estimated1RM = Math.round(total / Object.keys(maxCalcFormulas).length);
    maxRM.push( average1RM );

    // take the average 1RM and calculate the 5RM and 8RM and anything else
    // inside of the maxRepList array
    // Object.keys(estimatedRM).length
    for ( let i = 0; i < maxRepList.length; i += 1 ) {
      lombardi = average1RM / ( Math.pow( maxRepList[ i ], 1 / 10 ) );
      brzycki = ( average1RM * ( 37 - maxRepList[ i ] ) ) / 36;
      epley = average1RM / ( ( 1 + ( maxRepList[ i ] / 30 ) ) );
      mayhew = ( average1RM * ( 52.2 + ( 41.9 * Math.exp( -1 * ( maxRepList[ i ] * 0.055 ) ) ) ) ) / 100;
      oconner = ( average1RM / ( 1 + maxRepList[ i ] * 0.025 ) );
      wathan = ( average1RM * ( 48.8 + ( 53.8 * Math.exp( -1 * ( maxRepList[ i ] * 0.075 ) ) ) ) ) / 100;
      lander = ( ( average1RM * ( 101.3 - 2.67123 * maxRepList[ i ] ) ) / 100 );

      maxRM.push( Math.round( ( lombardi + brzycki + epley + mayhew + oconner + wathan + lander ) / 7 ) );
    }


    Object.keys( estimatedRM ).forEach( ( key, index ) => {
      estimatedRM[ key ] = maxRM[ index ];
    } );

    return estimatedRM;
  },

};

export default MathService;
