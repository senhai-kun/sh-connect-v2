import React, { useEffect, useRef, useState, useContext } from 'react';
import { Conncontext } from './context/ConnContext/ConnProvider';
import Peerprovider from './context/PeerContext/PeerProvider';
import StateProvider from './context/StateContext/StateProvider';
import Searchbar from './fields/SearchBar';
import { Button, Container as MuiContainer, TextField, Typography } from '@mui/material';
import Connect from './Connect';
import Videoplayer from './video/VideoPlayer';
import SearchResult from './yt/SearchResult';

const Room = () => {
    const { connected } = useContext(Conncontext)
    return (
        <Peerprovider >
            <StateProvider>
                <MuiContainer maxWidth="lg" >
                    {connected ? <Container /> : <Connect /> }
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
