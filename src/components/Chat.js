import React, {useState, useEffect} from 'react'
import '../App.css'

export default function Chat({socket, userName, room}) {

    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [input, setInput] = useState("");
    const [link, setLink] = useState("");

    
    const sendMessage = async () => {
        if (message != "") {
            const messageData = {
                room,
                user: userName,
                text: message,
                time: new Date(Date.now()).getHours() + 
                ":" +
                new Date(Date.now()).getMinutes()
            }
            
            await socket.emit("send_message", messageData)
            setMessageList([...messageList, messageData])
            setMessage("")
        }
    }

    function getEmbedLink() {
        var res = input.split("=");
        var newLink = "https://www.youtube.com/embed/"+res[1];
        const linkObj = {
            room,
            newLink
        }
        socket.emit("set_video", linkObj)
        return newLink
    }

    useEffect(() => {
        socket.on('recieve_message', (data) => {
            console.log(data);
            setMessageList((list) => [...list, data])
            console.log("recieving data:");
        })
        
        socket.on('recieve_video', (data) => {
            console.log(data);
            setLink(data)
            console.log("recieving video");
        })
        return () => {socket.off('recieve_message');
            socket.off('recieve_video')}
      }, [socket])

    useEffect(() => {
    }, [socket])

    return (
        <>
        <div>
            <input 
            placeholder="digite o link do video do youtube"
            type="text"
            onChange={(e) => setInput(e.target.value)}/>
            <button onClick={() => setLink(getEmbedLink)}>ok</button>
        </div>
        <div>
            {link != "" ? <iframe frameBorder="0" height="400px" width="100%" title="video Player" src={link}/> : null }
        </div>
        <div className="chat-window">
            
            <div className="chat-headerr"> 
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {messageList.map((element) => {
                    return <h1>{element.text}</h1>    
                })}
            </div>
            <div className="chat-footer">
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="digite aqui"/>
                <button onClick={sendMessage}>enviar</button>
            </div>
        </div>
        </>
    )

}