import dateHelpers from '../dateHelpers';

describe( 'dataHelpers utility', () => {

  it( 'sortByDate() should sort by desc or asc order for a given set of items with a timestamp', () => {
    const data = [
      {
        userId: 1,
        name: 'bulking program',
        type: 'program',
        documentId: 12,
        created: { seconds: 1556427600, nanoseconds: 0 },
      },
      {
        userId: 1,
        name: 'cutting program',
        type: 'program',
        documentId: 10,
        created: { seconds: 1556686800, nanoseconds: 0 },
      },
    ];
    const descendingOrder = [
      {
        userId: 1,
        name: 'cutting program',
        type: 'program',
        documentId: 10,
        created: { seconds: 1556686800, nanoseconds: 0 },
      },
      {
        userId: 1,
        name: 'bulking program',
        type: 'program',
        documentId: 12,
        created: { seconds: 1556427600, nanoseconds: 0 },
      },
    ];
    const ascendingOrder = [
      {
        userId: 1,
        name: 'bulking program',
        type: 'program',
        documentId: 12,
        created: { seconds: 1556427600, nanoseconds: 0 },
      },
      {
        userId: 1,
        name: 'cutting program',
        type: 'program',
        documentId: 10,
        created: { seconds: 1556686800, nanoseconds: 0 },
      },
    ];

    expect( dateHelpers.sortByDate( data, 'descending', 'created' ) ).toEqual( descendingOrder );


    expect( dateHelpers.sortByDate( data, 'ascending', 'created' ) ).toEqual( ascendingOrder );

  } );

  it( 'formatDate() should format the date into MM/DD/YYYY format', () => {

    expect( dateHelpers.formatUnix(1556686800 ) )
      .toEqual( '05/01/2019' );

  } );

} );
