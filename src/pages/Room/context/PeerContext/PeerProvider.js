import React, { createContext, useReducer, useEffect } from 'react';
import Peer from 'peerjs';
import { reducer, initialState } from './reducer';
import actions from './actions';

export const PeerContext = createContext();

const Peerprovider = ({ children }) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    useEffect( () => {
        if(state.conn) {
            state.peer.on('connection', (connection) => {
                console.log('connection peer', connection)
                dispatch({ type: actions.STORE_CONNECTION, connection })
            } )
            // state.conn.on('data', (msg) => {
            //     dispatch({ type: actions.RECEIVE_MSG, msg })
            // } )
        }
    }, [state.peer, state.conn])

    const value = { 
        state,
        initializePeer: (peerId) => {
            const peer = new Peer(peerId)
            dispatch({ type: actions.SET_PEER, peer })
        },
        createConnection: (connectionId) => {
            const conn = state.peer.connect(connectionId)
            dispatch({ type: actions.SET_CONNECTION, conn })
        },
        sendMsg: (data) => {
            console.log("to be sent", data)
            let msg = {
                from: localStorage.getItem("username"),
                msg: data
            }
            state.conn.send(msg)    

            dispatch({ type: actions.SEND_MSG, msg })
        },
        destroyConnection: () => {
            // state.peer.destroy()
            console.log("asd")
        },

    }

    return (
        <PeerContext.Provider value={value} >
            {children}
        </PeerContext.Provider>
    );
}

export default Peerprovider;
