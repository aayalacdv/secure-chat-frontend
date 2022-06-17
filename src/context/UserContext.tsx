import React, { createContext, useEffect, useState } from "react"
import io, { Socket } from 'socket.io-client'
import { RSA_DATA } from "../data/rsa-data"
import { deserializeBigIntPayload } from "../helpers/data-helpers"
import { decryptPayload } from "../rsaUtils/basic-RSA"



const socket = io('http://localhost:8080').connect()
let CONNECTED_USERS: string[] = []


console.log(socket)

interface IMessage {
    message: string,
    from: string,
}

export interface IUserContext {
    userName: string
    socket: Socket
    rooms: string[],
    roomId: string,
    messages: IMessage[],
    setMessages: Function,
    connectedUsers: any[],
    setConnectedUsers: Function,
    setUserName: Function,
    setRoomId: Function,
    selectedUser: string, 
    setSelectedUser: Function,
    rsaData: any,
    setRsaData: Function


}

export const UserContext = createContext<IUserContext>({
    userName: '',
    socket: socket,
    roomId: '',
    rooms: [],
    messages: [],
    setMessages: () => false,
    connectedUsers: [],
    setConnectedUsers: () => false,
    setUserName: () => console.log('xddd'),
    setRoomId: () => false,
    selectedUser: '', 
    setSelectedUser: () => false,
    rsaData: {}, 
    setRsaData: () => false

})



export const UserContextProvider: React.FC<{ children: any }> = (props) => {

    const [userName, setUserName] = useState<string>('')
    const [roomId, setRoomId] = useState<string>('')
    const [rooms, setRooms] = useState<string[]>([])
    const [messages, setMessages] = useState<IMessage[]>([])
    const [connectedUsers, setConnectedUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<string>('')
    const [rsaData, setRsaData] = useState<any>();


    useEffect(() => {
        let p : any = {}
    }, [userName])

    useEffect(() => {

        socket.on('private-message', (msg, prev) => {
            //decryptPayload(encrypted, bobKeys.privateKey!.d, bobKeys.publicKey!.n);

            const arr = [userName]
            let clear = ''

            RSA_DATA.forEach((data) => {
                if(data.userName == arr[0]){
                    const { privateKey, publicKey } = data
                    console.log(privateKey, publicKey)

                    console.log(msg)

                }
            })
           // const decrypted = decryptPayload(message, p.privateKey.d, p.publicKey!.n);

            setMessages([...prev, { from : msg.from, message: clear}])
        })


        socket.on('user-connected', (users) => {
            console.log(users)
            setConnectedUsers(users)
        })



        socket.on('connected-to-room', (room) => {
            console.log(`You connected to the room ${room}`)

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
                setMessages: setMessages,
                connectedUsers: connectedUsers,
                setConnectedUsers: setConnectedUsers,
                setUserName: setUserName,
                setRoomId: setRoomId,
                selectedUser: selectedUser, 
                setSelectedUser: setSelectedUser,
                rsaData: rsaData, 
                setRsaData: setRsaData
            }}>

            {props.children}
        </UserContext.Provider>
    )
}

