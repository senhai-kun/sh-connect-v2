import React, { useEffect, useState } from 'react';
import ImageBackground  from './ImageBackground';
import { Container, Box, Stack, Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom'

const styles = makeStyles( () => ({
    box: {
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '15px',
        borderRadius: '8px',
    }
}) )

const Login = () => {
    const classes = styles()
    const navigate = useNavigate()
    
    const [ username, setUsername ] = useState("")
    const [ exist, setExist ] = useState(false)

    useEffect( () => {
        if(localStorage.getItem('username') !== null ) {
            setExist(true)
            setUsername(localStorage.getItem('username'))
            navigate(`/room`)
        }
    }, [])

    const submit = () => {
        localStorage.setItem('username', username)
        setExist(true)
        navigate(`/room`)
    }

    return (
        <div>
            <ImageBackground>
                <Container maxWidth="sm" >
                    <Stack marginBottom={3} >
                        <Stack direction="row" alignItems="baseline" >
                            <Typography variant="h4" color="primary" >Senhai Connect</Typography>
                            <Typography variant="caption" marginLeft={0.5} color="primary">v2</Typography>
                        </Stack>
                        <Typography variant="caption" color="primary">Watch videos together</Typography>
                    </Stack>

                    <Box className={classes.box} >
                        <Stack direction="row" >
                            <Typography>Entering as:  </Typography>
                            <Typography marginLeft={1} color="bisque" style={{ textDecoration: 'underline', cursor: 'pointer' }} >{username}</Typography>
                            {/* <Typography>change</Typography> */}
                        </Stack>

                        <TextField
                            label="Username" 
                            variant="outlined" 
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={ e => setUsername(e.target.value) }
                            helperText={ username.length < 3 && "Minimum of 3 characters"}
                            required
                        />

                        <Button 
                            fullWidth 
                            variant="outlined"
                            disabled={ username.length < 3 }
                            onClick={submit}
                        >
                            Set as Username
                        </Button>
                    </Box>
                </Container>
            </ImageBackground>
        </div>
    );
}

export default Login;
