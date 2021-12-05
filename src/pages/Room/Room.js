import React, { useState, useContext, useEffect } from 'react';
import { Conncontext } from './context/ConnContext/ConnProvider';
import Peerprovider from './context/PeerContext/PeerProvider';
import StateProvider from './context/StateContext/StateProvider';
import Searchbar from './fields/SearchBar';
import { Container as MuiContainer } from '@mui/material';
import Connect from './Connect';
import Videoplayer from './video/VideoPlayer';
import SearchResult from './yt/SearchResult';

const Room = () => {
    const { state } = useContext(Conncontext)
    
    const preventRefresh = (e) => {
        if(state.conn) {
            e.preventDefault();
            e.returnValue = "";
        }
    }

    useEffect( () => {
        window.addEventListener("beforeunload", preventRefresh);
        return () => {
          window.removeEventListener("beforeunload", preventRefresh);
        };
    }, [] )

    return (
        <Peerprovider >
            <StateProvider>
                <MuiContainer maxWidth="lg" >
                    {state.conn ? <Container /> : <Connect /> }
                    {/* <Container /> */}
                </MuiContainer>
            </StateProvider>
        </Peerprovider>
    );
}


const Container = () => {
    const [ searchResult, setSearchResult ] = useState([])

    return (
        <div>
            <Searchbar setSearchResult={setSearchResult} />
            <Videoplayer />

            { searchResult && <SearchResult result={searchResult} />}
        </div>
    )    
}


export default Room;
