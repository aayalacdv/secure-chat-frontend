import React, { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";


const Home: React.FC = () => {

    const userNameRef = useRef<HTMLInputElement>(null)
    const roomRef = useRef<HTMLInputElement>(null)
    const { setUserName, setRoomId, roomId, socket, userName } = useContext(UserContext)


    const handleAuth = () => {
        const value = userNameRef.current?.value

        if (value) {
            console.log(value)
            socket.emit('user-auth', value)
            setUserName(userNameRef.current.value)
        }
        return
    }

    const handleJoinRoom = () => {
        const value = roomRef.current?.value

        if (value) {
            console.log(value)
            socket.emit('user-join-room', value)
            setRoomId(roomId)
        }

        return
    }







    return (
        <>

            <p>{userName}</p>
            <input type="text"  ref={userNameRef} placeholder="UserName" />
            <input type="text" ref={roomRef} placeholder="Room"/>
            <br />
            <button onClick={() => setUserName(userNameRef.current?.value)}>Set Username</button>
            <br />
            <button onClick={() => setRoomId(roomRef.current?.value)}>Set Room</button>
            <br />
            <button onClick={() => handleJoinRoom()}>Healthcheck</button>
        </>
    )

}


export default Home 