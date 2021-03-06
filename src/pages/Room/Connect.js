import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Conncontext } from './context/ConnContext/ConnProvider'
import { PeerContext } from './context/PeerContext/PeerProvider';
import Connectionfield from './fields/ConnectionField';

const styles = makeStyles( () => ({
    box: {
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        textAlign: 'center'
    },
    avatar: {
        width: '200px',
        height: '100%',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '50%'
    }
}) )

const Connect = () => {
    const classes = styles()
    const [ peerId ] = useState(Math.floor(Math.random() * (9999 - 1000) ) + 1000)
    const { initializePeer, createConnection } = useContext(PeerContext)
    const { connectPeer } = useContext(Conncontext)

    const [ copy, setCopy ] = useState(false)
    const [ connect, setConnect ] = useState('')
    const [ loading, setLoading ] = useState(false)

    useEffect( () => {
        initializePeer(peerId)
    }, [] )

    const connectTo = () => {
        setLoading(true)
        createConnection(connect)
        connectPeer()
    }

    return (    
        <Container maxWidth="sm"className={classes.box} >
            <Box  >
                <img 
                    src="https://i.pinimg.com/originals/67/39/c8/6739c8635e734d0006fa9508f772e333.png"
                    className={classes.avatar}
                    alt="logo"
                />

                <Typography variant="h4" >Connect</Typography>

                <Stack direction="row" marginTop={3} alignItems="center" >
                    <Typography align="left" >Your ID: </Typography>
                    <Typography marginLeft={2} marginRight={2} color="bisque" >{peerId}</Typography>

                    <CopyToClipboard text={peerId} >
                        <Button size="small" variant="outlined" onClick={ () => setCopy(true) } disabled={copy} >{ copy ? "Copied" : "Copy" }</Button>
                    </CopyToClipboard>
                </Stack>

                <Connectionfield connect={connect} setConnect={setConnect} loading={loading} setLoading={setLoading} connectTo={connectTo} />
            </Box>
        </Container>
    );
}

export default Connect;
