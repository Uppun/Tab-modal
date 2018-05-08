import Dispatcher from '../Dispatcher';
import ActionTypes from './ActionTypes';

export default {
    add() {
        Dispatcher.dispatch({
            type: ActionTypes.ADD,
        });
    }, 
    remove(index) {
        Dispatcher.dispatch({
            type: ActionTypes.REMOVE,
            index,
        });
    },

    open() {
        Dispatcher.dispatch({
            type: ActionTypes.OPEN,
        });
    },

    close() {
        Dispatcher.dispatch({
            type: ActionTypes.CLOSE,
        })
    },

    switch(index) {
        Dispatcher.dispatch({
            type: ActionTypes.SWITCH,
            index,
        });
    },

    update(text) {
        Dispatcher.dispatch({
            type: ActionTypes.UPDATE,
            text,
        });
    },
}