import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import actions from './actions';
import { PeerContext } from '../PeerContext/PeerProvider';
import { Conncontext } from '../../context/ConnContext/ConnProvider';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
    const { state } = useContext(PeerContext)
    const { disconnectPeer } = useContext(Conncontext)
    const [ videoState, dispatch ] = useReducer(reducer, initialState);

    useEffect( () => {
        if(state.conn) {
            state.conn.on('data', (data) => {
                console.log("state provider: ", data )
                if( data.type === 'changeVideoUrl' ) {
                    dispatch({ type: actions.PLAY_VIDEO, data })
                }
                else if ( data.type === 'playingState') {
                    dispatch({ type: actions.PLAYING, data })
                }
                // disconnect the other user
                if ( data.type === 'disconnect' ) {
                    state.peer.destroy()
                    disconnectPeer()
                }
            } )
        }
    }, [state.peer,state.conn] )

    const value = {
        videoState,
        playVideo: (data) => {
            if(localStorage.getItem('username') === data.from) {
                state.conn.send(data)
            } 
            dispatch({ type: actions.PLAY_VIDEO, data })
        },
        pausePlay: (data) => {
            if(localStorage.getItem('username') === data.from) {
                state.conn.send(data)
            } 
            dispatch({ type: actions.PLAYING, data })
            
        },
        destroy: () => {
            state.conn.send({ type: 'disconnect' })
            state.peer.destroy()
            disconnectPeer()
            console.log("Disconnected Peer")
        }
    }

    return (
        <StateContext.Provider value={value} >
            {children}
        </StateContext.Provider>
    );
}

export default StateProvider;
