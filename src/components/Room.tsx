import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { IUserContext, UserContext } from '../context/UserContext'


const MessageContainer: React.FC<{ sender: string, msg: string }> = (props) => {
    return (
        <div>
            <p><b>{props.sender}</b> : {props.msg}
            </p>
        </div>
    )
}




const Room: React.FC = () => {
    const { socket, roomId, messages, userName } = useContext(UserContext)
    const msgRef = useRef<HTMLInputElement>(null)



    const sendMessage = () => {

        const value = msgRef.current?.value
        console.log(value)
        if (!value) {
            console.log('not value')
            return
        }

        socket.emit('room-message', roomId, value, userName)

    }




    return <>
        <h1>Room: {roomId}</h1>
        <div className='messages-container'>
            <div className='msgs'>
                {messages.map((m, i) => <MessageContainer key={i} sender={m.userName} msg={m.message}/>)}
            </div>
            <div className='input-box'>
                <input ref={msgRef} type="text" placeholder='Text' />
                <button onClick={() => sendMessage()}> SEND</button>

            </div>

        </div>

    </>
}


export default Room