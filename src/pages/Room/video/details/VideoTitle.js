import React, { useContext } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StateContext } from '../../context/StateContext/StateProvider';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const style = makeStyles( (theme) => ({
    root: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    title: {
        fontSize: '17px'
    },
    subtitle: {
        marginTop: theme.spacing(0.5),
        opacity: '0.7',
    },
    dot: {
        fontSize: '8px'
    }
}) )

const VideoTitle = () => {
    const classes = style()
    const { videoState } = useContext(StateContext)
    return (
        <Stack className={classes.root} >
            <Typography variant="h6" className={classes.title} >{videoState.video.title}</Typography>

            { videoState.video.videoType === 'youtube' && <Stack direction="row" alignItems="center" spacing={1} className={classes.subtitle} >
                <Avatar 
                   src={videoState.video.channelIcon} 
                   alt="icon"
                   sx={{ width: 24, height: 24 }}
                />
                
                <Stack direction="row" alignItems="center" spacing={0.5}  >
                    <Typography variant="body2" >{videoState.video.views}</Typography>
                    <FiberManualRecordIcon fontSize="small" className={classes.dot} />
                    <Typography variant="body2" >{videoState.video.uploaded}</Typography>
                </Stack>
            </Stack>}
        </Stack>
    );
}

export default VideoTitle;
