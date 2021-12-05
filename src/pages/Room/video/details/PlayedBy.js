import { Stack, Typography } from '@mui/material';
import React from 'react';

const PlayedBy = ({ username }) => {
    return (
        <Stack direction="row" spacing={1} >
            <Typography>Played By: </Typography>
            <Typography color="bisque" >{username}</Typography>
        </Stack>
    );
}

export default PlayedBy;
