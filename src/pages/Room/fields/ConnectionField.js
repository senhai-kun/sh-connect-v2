import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { InputAdornment, TextField } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const Connectionfield = ({ connect, setConnect, loading, setLoading, connectTo }) => {
    return (
        <React.Fragment>
            <TextField 
                // inputRef={tref}
                label="Connect with..."
                variant="outlined"
                fullWidth
                margin="normal"
                helperText="Please Enter the connection ID that you want to connect with"
                value={connect}
                onChange={ e => setConnect(e.target.value) }
                InputProps={{
                    startAdornment: <InputAdornment position="start">C -</InputAdornment>,
                }}
            />
            
            <LoadingButton 
                fullWidth 
                variant="contained"
                onClick={connectTo}
                disabled={ connect.length < 4 }
                loading={loading}
                endIcon={<SubdirectoryArrowRightIcon />}
                loadingPosition="end"
            >
                { loading ? 'Connecting' : 'Connect'}
            </LoadingButton>
        </React.Fragment>
    );
}

export default Connectionfield;
