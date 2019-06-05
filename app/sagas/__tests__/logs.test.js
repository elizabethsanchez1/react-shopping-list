import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, put, takeLatest } from 'redux-saga/effects';
import { SaveLogs, watchSaveLogRequest } from '../logs';
import { UPDATE_LOGS_REQUEST } from '../../constants/logs';
import { saveLogsAction } from '../../actions/logs';
import { showLoadingAction } from '../../actions/loading';
import { LOGS } from '../../constants/reducerObjects';


describe( 'Logs saga functionality', () => {

  describe( 'updateSpecifcLog() saga functioality', () => {
    const data = {};
    const action = saveLogsAction( data );


    it.skip( 'watchSaveLogRequest() should create a saga watcher for  UPDATE_LOGS_REQUEST', () => {
      const gen1 = cloneableGenerator( watchSaveLogRequest )();

      expect( JSON.stringify( gen1.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeLatest,
          UPDATE_LOGS_REQUEST,
          SaveLogs,
        ) ) );

    } );

    it( 'should handle success flow', () => {
      const gen = cloneableGenerator( SaveLogs )( action );

      expect( gen.next().value )
        .toEqual( put( showLoadingAction( {
          dataType: LOGS,
        } ) ) );

    } );

  } );

} );
