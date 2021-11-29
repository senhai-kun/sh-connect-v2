import { Button, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { StateContext } from '../context/StateContext/StateProvider';

const style = makeStyles( (theme) => ({
    playerWrapper: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 300
        },
        [theme.breakpoints.up('md')]: {
            height: 700
        },
    }
}) )

const Videoplayer = () => {
    const classes = style()
    const { videoState, videoPlaying, destroy } = useContext(StateContext)
    const [ playing, setPlaying ] = useState(false)

    useEffect( () => {
        // setPlaying(videoState.playing)

    }, [videoState.playing] )

    const onPlay = () => {
        setPlaying(true) 
        let data = {
            from: localStorage.getItem('username'),
            playing: true,
            type: 'playingState'
        }
        videoPlaying(data)
    }

    const onPause = () => {
        setPlaying(false) 
        let data = {
            from: localStorage.getItem('username'),
            playing: false,
            type: 'playingState'
        }
        videoPlaying(data)
    }

    return (
        <div>
            <div className={classes.playerWrapper} >
                <ReactPlayer 
                    url={videoState.videoUrl}
                    width="100%"
                    height="100%"
                    playing={videoState.playing}
                    onPlay={onPlay}
                    onPause={onPause}
                />

            </div>

            <Stack direction="row" spacing={1} >
                <Button variant="outlined" onClick={ playing ? onPause : onPlay } >{playing ? "Play" : "Pause"}</Button>
                <Button variant="outlined" onClick={destroy} >Disconnect</Button>
            </Stack>

            <Typography>{videoState.playing ? "play":"pause"}</Typography>
        </div>
    );
}

export default Videoplayer;
