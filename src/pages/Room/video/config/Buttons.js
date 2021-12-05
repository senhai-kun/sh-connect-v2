import React, { useContext, useState } from 'react';
import { Button, Collapse, Stack, TextField } from '@mui/material';
import { StateContext } from '../../context/StateContext/StateProvider';

const DirectField = ({ open, playVideo }) => {
    const [ directUrl, setDirectUrl ] = useState('')

    const playThisVideo = () => {
        let data = {
            from: localStorage.getItem('username'),
            title: 'Title not available on direct url',
            url: directUrl,
            type: 'changeVideoUrl', // type of dispatch to determine if pause play or changeVideoUrl
            videoType: 'direct' // indicates whether youtube or direct url
        }
        playVideo(data)
    }

    return (
        <Collapse in={open} >
            <Stack direction="row" spacing={1} marginBottom={1} >
                <TextField  
                    size="small"
                    placeholder="Direct url"
                    fullWidth
                    value={directUrl}
                    onChange={ (e) => setDirectUrl(e.target.value) }
                />

                <Button variant="contained" size="small" onClick={playThisVideo} >Play</Button>
            </Stack>
            <Button variant="outlined" color="secondary" onClick={() => setDirectUrl('') } >Clear</Button>
        </Collapse>
 
    )
}

const Buttons = () => {
    const { playVideo, destroy } = useContext(StateContext)
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div style={{ marginBottom: 10 }} >
            <Stack direction="row" spacing={1} marginBottom={2} >
                <Button variant="contained" size="small" color="primary" onClick={handleOpen} >Direct</Button>
                <Button variant="contained" size="small" color="error" onClick={destroy} >Disconnect</Button> 
            </Stack>

            <DirectField open={open} playVideo={playVideo} />

        </div>
    );
}

export default Buttons;
