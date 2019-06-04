import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork } from 'redux-saga/effects';
import { updateSpecificLog, watchUpdateLogRequest } from '../logs';
import { UPDATE_LOGS_REQUEST } from '../../constants/logs';


describe( 'Logs saga functionality', () => {

  describe( 'updateSpecifcLog() saga functioality', () => {
    const data = {};
    // const action =


    it( 'watchUpdateLogRequest() should create a saga watcher for  UPDATE_LOGS_REQUEST', () => {
      const gen1 = cloneableGenerator( watchUpdateLogRequest )();

      expect( JSON.stringify( gen1.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          UPDATE_LOGS_REQUEST,
          updateSpecificLog,
        ) ) );

    } );

    it( 'should handle success flow', () => {
      const gen = cloneableGenerator( updateSpecificLog )();

    } );

  } );

} );
