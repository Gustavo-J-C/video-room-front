import React from 'react'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function VideoDetail(props) {

    const videoSrc = `https://www.youtube.com/embed/${props?.video?.id?.videoId}`;

    return(
        <>
        <Paper elevation={6}>
            <iframe frameBorder="0" height="400px" width="100%" title="video Player" src={videoSrc}/>
        </Paper>
        <Paper>
            <Typography variant="subtitle1"></Typography>
            <Typography variant="subtitle2"></Typography>
            <Typography></Typography>
        </Paper>
        
        </>
    )
}