import React, { useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { RSA_DATA } from "../data/rsa-data";


const Home: React.FC = () => {

    const userNameRef = useRef<HTMLInputElement>(null)
    const roomRef = useRef<HTMLInputElement>(null)
    const { setUserName, setRoomId, roomId, socket, userName, connectedUsers, setSelectedUser, setRsaData} = useContext(UserContext)


    const handleAuth = () => {
        const value = userNameRef.current?.value

        if (value) {
            console.log(value)
            socket.auth = { userName: value, publicKey: 'holisssss'}
            setUserName(userNameRef.current.value)
            RSA_DATA.forEach((data) => {
            if(data.userName == value){
                setRsaData(data)
                console.log(data)
            }
        })
            socket.emit('user-auth', ({ userName: value, publicKey: 'holisssss'}))
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
            <button onClick={() => handleAuth()}>Set Username</button>
            <br />
            <button onClick={() => setRoomId(roomRef.current?.value)}>Set Room</button>
            <br />
            <button onClick={() => handleJoinRoom()}>Healthcheck</button>


            { connectedUsers.map((u, i) => (
                <div key={i}>
                    <p> User : <b>{u.userName }</b> publicKey: n : {u.publicKey.n },e : {u.publicKey.e },  </p> <button onClick={() => setSelectedUser(u.id)}> Message</button> 

                </div>
            ))}
        </>
    )

}


export default Home 