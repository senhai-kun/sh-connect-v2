import React from 'react';
import { IconButton, Stack } from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import screenfull from 'screenfull'


const PlayerControls = ({ playing, onPlayBtn, onRewind, onForward, onHideControls }) => {
    return (
        <Stack direction="row" justifyContent="space-between" >

            <IconButton onClick={onHideControls} >
                <VisibilityOffRoundedIcon fontSize="meduim" />
            </IconButton>
            
            <Stack direction="row" >
                <IconButton onClick={onRewind} >
                    <FastRewindRounded fontSize="meduim" />
                </IconButton>

                <IconButton onClick={onPlayBtn}>
                    {playing ? <PauseRounded fontSize="meduim" /> : <PlayArrowRounded fontSize="meduim" />}
                </IconButton>

                <IconButton onClick={onForward}>
                    <FastForwardRounded fontSize="meduim" />
                </IconButton>
            </Stack>

            <IconButton
                onClick={ () => {
                    const el = document.getElementById("videoPlayer")
                    screenfull.toggle(el)
                    if (window.screen.width < 500) window.screen.orientation.lock("landscape")
                }}
            >
                <OpenInFullRoundedIcon fontSize="meduim"  />
            </IconButton>
        </Stack>
    );
}

export default PlayerControls;
