import React, {useState, useEffect} from 'react'
import './App.css'
import io from 'socket.io-client'
import axios from 'axios'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchBar from './components/SearchBar'
import Chat from './components/Chat'
import VideoDetail from './components/VideoDetail'

const socket = io.connect("https://video-room-app-back.herokuapp.com")

function App() {

  const [videos, setVideos] = useState([])
  const [showVideo, setShowVideo] = useState(false);
  const [input, setInput] = useState('')
  const [rooms, setRooms] = useState([])
  const [newRoom, setNewRoom] = useState([])
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [userName, setUserName] = useState("")

  async function SearchVideos(params) {
    await axios({
      "method": "GET",
      "url": 'https://www.googleapis.com/youtube/v3/search',
      "params":{
          'part':'snippet',
          'maxResults':'20',
          'key':'AIzaSyBD5VkWjcl0UElIV_nAh0h_NF433S1tAi4',
          'q': {input},
          'videoEmbeddable': 'true',
      }
    })
    .then((res) => {
      setVideos(res.data.items)
    })
    .catch((error) => {
    })
  }
  
  useEffect(() => {
    socket.on('request_rooms', (data) => {
      setRooms(data)
    })
  }, [socket])
  

  const enterRoom = (selectRoom) => {
    if (userName !== "" && selectRoom !== "") {
      setRoom((prev) => selectRoom)
      setShowChat(true)
      socket.emit("join_room", selectRoom)
    }
  } 

  const createRoom = () => {
    if (newRoom !== "") {
      socket.emit("create_room", newRoom)
      enterRoom(newRoom)
    }
  }

  return (
    <div className="app">
          {!showChat ? ( 
            <div className="joinChatContainer">
              <h4>selecione a sala que deseja entrar</h4>
              <input type="text"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}/>
              <input type="text"
                placeholder="ROOM ID"
                onChange={(e) => setRoom(e.target.value)}/>
              <button onClick={() => {enterRoom(room); setShowChat(true)}}>entrar na sala</button>
              <input type="text"
                value={newRoom}
                placeholder="ROOM ID"
                onChange={(e) => setNewRoom(e.target.value)}/>
              <button onClick={() => {createRoom(newRoom); setShowChat(true)}}>criar uma sala</button>
              <div>
                <h4>salas ativas</h4>
                {rooms?.map((element) => {
                  return <button onClick={() => enterRoom(element)}>Sala: {element}</button>
                })}
              </div>
            </div>
          ) : <Chat socket={socket} room={room} userName={userName}/>
          }
    </div>
  );
}

export default App;