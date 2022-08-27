import axios from 'axios'

export default axios.create({
    baseURL: 'https://youtube.googleapis.com/yotube/v3',
    params: {
        part: 'snippert',
        maxResults: 10,
        key: {process.env.REACT_APP_YT_KEY}
    },
    header: {}
})