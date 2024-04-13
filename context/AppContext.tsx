import React, { createContext, useReducer } from "react";

type Face = any;

type State = { faces: Face[], faceUri: string, status: 'NO_DETECT_FACES' | 'SUCCESS' | null | 'PENDING' };

type Action = {
    data?: Partial<State>;
    type: 'CLEAR_FACES' | 'UPDATE_FACES' | 'PREDICT_EMOTION';
};

interface ContextType {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialState: State = { faces: [], faceUri: '', status: null };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'CLEAR_FACES':
            return { faces: [], faceUri: '', status: 'NO_DETECT_FACES' };
        case 'UPDATE_FACES':
            return { ...state, ...action.data, status: 'SUCCESS' };
        case 'PREDICT_EMOTION':
            return { ...state, ...action.data, status: 'PENDING' };
        default:
            return state;
    }
};

const Context = createContext<ContextType>({ state: initialState, dispatch: () => { } });

const AppContext = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, AppContext };
