import React, {useState} from 'react'
import '../App.css';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

export default function SearchBar(props) {

    const {SearchVideos} = props

    const [search, setSearch] = useState('')

    return(
        <Paper className="inputArea">
            <TextField className="textInput" xs={12} label="Search..." onChange={e => setSearch(e.target.value)}></TextField>
            <Button variant="contained" onClick={() => SearchVideos(search)}>Ok</Button>
            {search}
        </Paper>
    )
}