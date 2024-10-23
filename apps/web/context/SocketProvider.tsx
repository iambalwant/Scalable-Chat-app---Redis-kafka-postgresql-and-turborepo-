'use client'
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client'

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

//costum hooks to use in or frontend 

export const useSocket = () =>{
    const state = useContext(SocketContext)
    if(!state) throw new Error(`state is undefined`);

    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) =>{

    const [socket, setSocket] = useState<Socket>()

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) =>{
        console.log("send message",msg);
        if(socket){
            socket.emit('event:message', {message: msg})
        }
    }, [socket]);

    const onMessageRec = useCallback((msg:string) =>{
        console.log('From server message rec', msg)
    }, [])

    useEffect(()=>{
         const _socket = io('http://localhost:8000');
         _socket.on('message', onMessageRec);
         setSocket(_socket)

         return ()=>{
             _socket.off('message', onMessageRec)
            _socket.disconnect();
            setSocket(undefined)
        }
    },[])
   
    return(
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    );
    
};