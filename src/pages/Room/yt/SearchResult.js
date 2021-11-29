import { Grid, Typography, Stack, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { Element } from 'react-scroll'
import { StateContext } from '../context/StateContext/StateProvider';

const style = makeStyles( (theme) => ({
    grid: {
        cursor: 'pointer'
    },
    img: {
        width: '100%',
    },
    btm: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '0px 2px',
        borderRadius: 5
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: '50%'
    },
    title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        display: "-webkit-box",
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical'
    },
    caption: {
        opacity: 0.6
    }
}) )

const SearchResult = ({ result }) => {
    const classes = style();
    const { playVideo } = useContext(StateContext)

    const select = (i) => {
        let data = {
            from: localStorage.getItem('username'),
            url: i.url,
            type: 'changeUrl'
        }
        playVideo(data)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <Element id="search" >
            
            <Divider  />

            <Grid columns={{ xs: 4, sm: 6, md: 10 }} container spacing={2} mt={1} >
                {result.map( (i,index) => (
                    <Grid item xs={2} sm={2} md={2} key={index} onClick={ () => select(i) } className={classes.grid} >
                        <div style={{ position: 'relative' }} >
                            <img className={classes.img} src={i.img} alt={i.title} />

                            <div className={classes.btm} >
                                <Typography variant="caption" padding={0} >{i.duration}</Typography>
                            </div>
                        </div>

                        <Stack direction="row" spacing={1} >
                            <img className={classes.icon} src={i.channelIcon} alt={i.channelName}/>
                            
                            <Stack>
                                <Typography className={classes.title} >{i.title}</Typography>
                                <Stack className={classes.caption}>
                                    <Typography variant="caption" >{i.channelName}</Typography>
                                    <Typography variant="caption" >{i.uploaded}</Typography>
                                    <Typography variant="caption" >{i.views} views</Typography>                                    
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                ) )}
            </Grid>
        </Element>
    );
}

export default SearchResult;
