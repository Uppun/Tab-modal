import {ReduceStore} from 'flux/utils';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../actions/ActionTypes';

class modalStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
    }

    getInitialState() {
        let startingState = JSON.parse(localStorage.getItem('mock1'));
        if (!startingState) {
            startingState = {textAreas: [''], visibility: false, current: 0};
            localStorage.setItem('mock1', JSON.stringify(startingState));
        }
        return startingState;
    }

    reduce(state, action) {
        switch(action.type) {
            case ActionTypes.ADD: {
                const textAreas = state.textAreas.concat('');
                const newState = {...state, textAreas, current: textAreas.length - 1};
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState
            }

            case ActionTypes.REMOVE: {
                const textAreas = [...state.textAreas];
                
                textAreas.splice(action.index, 1);
                
                
                let current = state.current;

                if (current === action.index && action.index > 0) {
                    current--; 
                }
                
                const newState = {...state, textAreas, current}; 
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState
            }

            case ActionTypes.OPEN: {
                const newState = {...state, visibility: true};
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState
            }

            case ActionTypes.CLOSE: {
                const newState = {...state, visibility: false};
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState
            }

            case ActionTypes.SWITCH: { 
                const newState = {...state, current: action.index};
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState;
            }

            case ActionTypes.UPDATE: {
                const textAreas = [...state.textAreas];
                textAreas[state.current] = action.text;
                const newState = {...state, textAreas};
                localStorage.setItem('mock1', JSON.stringify(newState));
                return newState
            }

            default: {
                return state;
            }
        }
    }
}

export default new modalStore();