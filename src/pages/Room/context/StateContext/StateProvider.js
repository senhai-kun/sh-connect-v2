import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { reducer, initialState } from './reducer';
import actions from './actions';
import { PeerContext } from '../PeerContext/PeerProvider';

export const StateContext = createContext();

const StateProvider = ({ children }) => {
    const { state } = useContext(PeerContext)
    const [ videoState, setVideoState ] = useReducer(reducer, initialState);

    useEffect( () => {
        if(state.conn) {
            state.conn.on('data', (data) => {
                console.log("state provider: ", data )
                if( data.type === 'changeUrl' ) {
                    setVideoState({ type: actions.PLAY_VIDEO, data })
                }
                else if ( data.type === 'playingState') {
                    setVideoState({ type: actions.PLAYING, data })
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
            setVideoState({ type: actions.PLAY_VIDEO, data })
        },
        videoPlaying: (data) => {
            if(localStorage.getItem('username') === data.from) {
                state.conn.send(data)
            } 
            setVideoState({ type: actions.PLAYING, data })
            
        },
        destroy: () => {
            state.peer.destroy()
        }
    }

    return (
        <StateContext.Provider value={value} >
            {children}
        </StateContext.Provider>
    );
}

export default StateProvider;
