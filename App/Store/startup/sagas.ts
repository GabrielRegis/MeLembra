import { is } from 'ramda';
import Reactotron from 'reactotron-react-native';
import { Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { select } from 'redux-saga/effects';
import { RootState } from '../state';
import { setAuthToken } from '../../Services/Api';
import { NavigationActions } from 'react-navigation';

export const selectToken = (state: RootState) => state.login.token;

export function* startup(action?: Action): SagaIterator {
    if (__DEV__) {
        Reactotron.log(action);
        Reactotron.log({
            message: 'log example',
            someGeneratorFunction: selectToken
        });

        Reactotron.display({
            name: 'ESPARTA',
            preview: 'VAI TRABALHAR!!!',
            value: {
                hue: 'huehuehue'
            }
        });
    }

    const token = yield select(selectToken);
    if (is(String, token)) {
        setAuthToken(token);
        NavigationActions.navigate({
            routeName: 'MenuScreen',
            params: {}
        });
    }
}
