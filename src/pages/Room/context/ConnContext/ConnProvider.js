import { createContext, useReducer } from 'react';

export const Conncontext = createContext();

const initialState = {
    conn: false
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'CONN': 
        return {
            conn: action.data
        }
        default: return state
    }
}

const ConnProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    const value = { 
        state, 
        connectPeer: () => {
            let data = true
            dispatch({ type: 'CONN', data })
        },
        disconnectPeer: () => {
            let data = false
            dispatch({ type: 'CONN', data })
        }
    }

    return (
        <Conncontext.Provider value={value} >
            {children}
        </Conncontext.Provider>
    )
}

export default ConnProvider;
