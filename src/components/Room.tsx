import { stringify } from 'querystring'
import React, { ReactNode, useContext, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { json } from 'stream/consumers'
import { measureMemory } from 'vm'
import { IUserContext, UserContext } from '../context/UserContext'
import { RSA_DATA } from '../data/rsa-data'
import { decryptPayload, encryptPayload } from '../rsaUtils/basic-RSA'


const MessageContainer: React.FC<{ sender: string, msg: string }> = (props) => {
    return (
        <div>
            <p><b>{props.sender}</b> : {props.msg}
            </p>
        </div>
    )
}




const Room: React.FC = () => {
    const { socket, userName, messages, selectedUser, setMessages, connectedUsers} = useContext(UserContext)
    const msgRef = useRef<HTMLInputElement>(null)


    useEffect(() => {

    },[])

    const sendMessage = () => {

        const value = msgRef.current?.value
        console.log(value)
        if (!value) {
            console.log('not value')
            return
        }


        let messageCipher : string = ''
        connectedUsers.forEach((user) => {
            if (user.id == selectedUser){

                messageCipher = encryptPayload(value, BigInt(user.publicKey.e),BigInt(user.publicKey.n)).toString()

            }
        })



        socket.emit('private-message', ({ to: selectedUser, message: messageCipher, prev: messages}))
        setMessages([...messages, { from: userName , message: value}])
        
    }




    return <>
        <h1>Room: {selectedUser}</h1>
        {userName}
        <div className='messages-container'>
            <div className='msgs'>
                {messages.map((m, i) => <MessageContainer key={i} sender={m.from} msg={m.message}/>)}
            </div>
            <div className='input-box'>
                <input ref={msgRef} type="text" placeholder='Text' />
                <button onClick={() => sendMessage()}> SEND</button>

            </div>

        </div>

    </>
}


export default Room