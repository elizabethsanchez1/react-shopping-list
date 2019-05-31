import moment from 'moment';

const dateHelpers = {

  sortByDate: ( items, direction, property ) => {

    if ( direction === 'descending' ) {
      return items.sort( ( a, b ) => {
        return b[ property ].seconds - a[ property ].seconds;
      } );
    }

    if ( direction === 'ascending' ) {
      return items.sort( ( a, b ) => {
        return a[ property ].seconds - b[ property ].seconds;
      } );
    }

  },

  formatUnix: ( unixSeconds, format = 'MM/DD/YYYY' ) => {
    return moment( moment.unix( unixSeconds ) )
      .format( format );
  },

};

export default dateHelpers;
