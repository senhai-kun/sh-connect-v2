import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { scroller } from 'react-scroll'
import axios from 'axios'

const styles = makeStyles( (theme) => ({
    wrapper: {
        // padding: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    searchBtn: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
}) )

const Searchbar = ({ setSearchResult }) => {
    const classes = styles()
    const [ query, setQuery ] = useState('')
    const [ suggest, setSuggest ] = useState([])
    const [ open, setOpen ] = useState(false)
    const [ searching, setSearching ] = useState(false)

    useEffect( () => {
        axios.post('https://sh-connect-server-v2.vercel.app/suggestions', query)
        .then(res => {
            // console.log(res.data)
            setSuggest(res.data)
            setOpen(true)
        })
    }, [query])

    useEffect( () => {
        searching && setOpen(false)
    }, [searching])

    const search = (e) => {
        e.preventDefault()
        if(query.length !== 0) {
            setOpen(false)
            setSearching(true)
            axios.post(`https://sh-connect-server-v2.vercel.app/search`, { query: query })
            .then( res => { 
                // console.log(res.data)
                setSearchResult(res.data.result)
                setOpen(false)
                setSearching(false)
                scroller.scrollTo("search", {
                    duration: 100,
                    delay: 0,
                    smooth: true,
                })
            })
            .catch( err => console.error(err))
        }
    }

    const onChange = (e) => {
        e.target.blur()
        setQuery(e.target.value)
    }

    return (
        <form onSubmit={search}>

        <Stack direction="row" className={classes.wrapper} >
                <Autocomplete 
                    freeSolo
                    fullWidth
                    options={suggest}
                    value={query}
                    onChange={ (e) => onChange(e), search}
                    onClose={() => setOpen(false)}
                    open={open}
                    disableClearable
                    renderInput={ (params) => (
                        <TextField 
                            {...params}
                            color="primary"
                            placeholder="Search youtube title..."
                            variant="outlined"
                            fullWidth
                            size="small"
                            InputProps={{ 
                                ...params.InputProps, 
                                type: 'search', 
                                style: { backgroundColor: '#121212'}
                            }}
                            value={query}
                            onChange={ (e) => setQuery(e.target.value) }
                        />
                    )}
                />
            
                <Button type="submit" className={classes.searchBtn} disableFocusRipple >
                    {searching ? <CircularProgress size={22} color="inherit" /> : <SearchIcon />}
                </Button>
        </Stack>
        </form>

    );
}

export default Searchbar;
