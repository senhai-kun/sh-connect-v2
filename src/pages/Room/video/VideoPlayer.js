import React, { useContext, useRef, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ReactPlayer from 'react-player'
import { StateContext } from '../context/StateContext/StateProvider';
import PlayedBy from './details/PlayedBy';
import VideoTitle from './details/VideoTitle';
import Buttons from './config/Buttons';
import { Slider, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Duration from './config/Duration';
import PlayerControls from './controls/PlayerControls';

const style = makeStyles( (theme) => ({
    root: {
        marginTop: theme.spacing(2)
    },
    playerWrapper: {
        width: '100%',
        [theme.breakpoints.down('md')]: {
            height: 200
        },
        [theme.breakpoints.up('sm')]: {
            height: 300
        },
        [theme.breakpoints.up('md')]: {
            height: 600
        },
        position: 'relative',
        overflow: 'hidden'
    },
    playerControls: {
        position: 'absolute',
        bottom: 0,
        padding: '0 10px',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.65)',
        opacity: 1,
        transition: 'all 0.5s ease-in'
    },
    hideControls: {
        height: 0,
        opacity: 0,
        transition: 'all 0.5s ease-out'
    }
}) )

const Videoplayer = () => {
    const videoRef = useRef(null)
    const hideControlsRef = useRef(null)
    const theme = useTheme()
    const classes = style()
    const { videoState, pausePlay } = useContext(StateContext)
    // const [ playing, setPlaying ] = useState(false)
    const [ progress, setProgress ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const [ hideControls, setHideControls ] = useState(false)

    useEffect(() => {
        if( !videoState.videoControls.playing && videoState.videoControls.syncTime !== 0  ) {
            videoRef.current.seekTo(videoState.videoControls.syncTime) 
            console.log("Seeking")
        }

        if ( !videoState.videoControls.playing ) {
            clearTimeout(hideControlsRef.current)
            setHideControls(false)
        }

    }, [videoState.videoControls.syncTime, videoState.videoControls.playing]);
    
    const onPlay = () => {
        // setPlaying(true) 
        let data = {
            from: localStorage.getItem('username'),
            playing: true,
            type: 'playingState'    
        }
        pausePlay(data)
        hideControlsRef.current = setTimeout(() => {
            setHideControls(true)
        }, 5000);
    }

    const onPause = () => {
        // setPlaying(false) 
        let data = {
            from: localStorage.getItem('username'),
            playing: false,
            syncTime: videoRef.current.getCurrentTime().toFixed(1),
            type: 'playingState'
        }
        console.log(videoRef.current.getCurrentTime().toFixed(1))
        pausePlay(data)
    }

    const onRewind = () => {
        let currentTime = Number(videoRef.current.getCurrentTime().toFixed(1))
        let syncTime = currentTime-10
        let data = {
            from: localStorage.getItem('username'),
            playing: false,
            syncTime: syncTime,
            type: 'playingState'
        }
        setProgress(syncTime)
        pausePlay(data)
    }
    const onForward = () => {
        let currentTime = Number(videoRef.current.getCurrentTime().toFixed(1))
        let data = {
            from: localStorage.getItem('username'),
            playing: false,
            syncTime: currentTime+10,
            type: 'playingState'
        }
        pausePlay(data)
    }
    const onOpenControls = () => {
        setHideControls(false)
        if( videoState.videoControls.playing ) {
            hideControlsRef.current = setTimeout(() => {
                setHideControls(true)
            }, 8000);
        } else {
            clearTimeout(hideControlsRef.current)
            setHideControls(false)
        }
        
    }

    const onHideControls = () => {
        // clearTimeout(hideControlsRef.current)
        setHideControls(true)
    }

    return (
        <div className={classes.root} >
            <PlayedBy username={videoState.playedBy} />
            <div id="videoPlayer" className={classes.playerWrapper} onClick={onOpenControls} onMouseEnter={onOpenControls} >
                <ReactPlayer 
                    ref={videoRef}
                    url={videoState.video.videoUrl}
                    width="100%"
                    height="100%"
                    playing={videoState.videoControls.playing}
                    onDuration={ (time) => {
                        setDuration(time-1)
                        console.log("duration", time)
                    } }
                    onProgress={ (time) => {
                        setProgress(time.playedSeconds)
                    } }
                    onReady={ () => {
                        setHideControls(false)
                    } }
                    onStart={ () => {
                        setHideControls(false)
                    } }
                    onPlay={onPlay}

                    onPause={onPause}
                    onEnded={ () => {
                        console.log("ended: ", progress)
                        console.log("endedd: ", duration)
                    }}
                />

                <div className={ hideControls ? classes.hideControls : classes.playerControls} >
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={progress}
                        min={0}
                        // step={1}
                        max={duration}
                        onChange={(_, value) => {
                            setProgress(value)
                            let data = {
                                from: localStorage.getItem('username'),
                                playing: false,
                                syncTime: value,
                                type: 'playingState'
                            }
                            pausePlay(data)
                            videoRef.current.seekTo(value)
                        }}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            height: 4,
                            '&.MuiSlider-root': {
                                padding: 0,
                            },
                            '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                theme.palette.mode === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 10,
                                height: 10,
                            },
                            },
                            '& .MuiSlider-rail': {
                            opacity: 0.28,
                            },
                        }}
                    />

                    <Stack direction="row" justifyContent="space-between" >
                        <Duration seconds={progress} />
                        <Duration seconds={duration} />
                    </Stack>

                    <PlayerControls 
                        playing={videoState.videoControls.playing} 
                        onPlayBtn={videoState.videoControls.playing ? onPause : onPlay} 
                        onRewind={onRewind}
                        onForward={onForward}
                        onHideControls={onHideControls}
                    />
                </div>
            </div>

            <VideoTitle />

            <Buttons playing={videoState.videoControls.playing  } onClick={ videoState.videoControls.playing ? onPause : onPlay } />
           
        </div>
    );
}

export default Videoplayer;
