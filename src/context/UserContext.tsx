import React, { createContext, useEffect, useState } from "react"
import io, { Socket } from 'socket.io-client'



const socket = io('http://localhost:8000')
let CONNECTED_USERS: string[] = []
console.log(socket)

interface IMessage {
    userName: string,
    message: string
}

export interface IUserContext {
    userName: string
    socket: Socket
    rooms: string[],
    roomId: string,
    messages: IMessage[],
    connectedUsers: string[],
    setUserName: Function,
    setRoomId: Function,


}

export const UserContext = createContext<IUserContext>({
    userName: '',
    socket: socket,
    roomId: '',
    rooms: [],
    messages: [],
    connectedUsers: [],
    setUserName: () => console.log('xddd'),
    setRoomId: () => false,

})


export const UserContextConsumer = UserContext.Consumer

const userName = 'david'

export const UserContextProvider: React.FC<{ children: any }> = (props) => {

    const [userName, setUserName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [rooms, setRooms] = useState<string[]>([])
    const [messages, setMessages] = useState<IMessage[]>([])

    useEffect(() => {

        socket.on('user-connected', (users) => {
            console.log(users);
        })


        socket.on('connected-to-room', (room) => {
            console.log(`You connected to the room ${room}`)

        })
        
        socket.on('room-messages', (msgs) => {
            console.log('new msg')
            setMessages(msgs)
            console.log(messages)
        })





    }, [])

    return (
        <UserContext.Provider
            value={{
                userName: userName,
                socket: socket,
                roomId: roomId,
                rooms: rooms,
                messages: messages,
                connectedUsers: CONNECTED_USERS,
                setUserName: setUserName,
                setRoomId: setRoomId,
            }}>

            {props.children}
        </UserContext.Provider>
    )
}

