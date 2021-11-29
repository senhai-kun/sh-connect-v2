import { Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useRef, useEffect } from 'react';
import actions from './context/PeerContext/actions';
import { PeerContext } from './context/PeerContext/PeerProvider';

const Chat = () => {
    const tref = useRef(null)
    const [ chat, setChat ] = useState('')
    const { state, sendMsg, destroyConnection } = useContext(PeerContext)

    return (
        <div>
            <TextField 
                label="chat"

                inputRef={tref}
                // value={chat}
                // onChange={ e => setChat(e.target.value) }
            />
            <Button onClick={() => sendMsg(tref.current.value) } >Send</Button>

            <br />
            <br />
            <br />
            <br />
            <Typography marginTop={2} >{state.receive.msg}</Typography>
            <Typography>{state.receive.from}</Typography>

            <Button onClick={ () => {
                destroyConnection()
            } } >Destroy</Button>
        </div>
    );
}

export default Chat;
