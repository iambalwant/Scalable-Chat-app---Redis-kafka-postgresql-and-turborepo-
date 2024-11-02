import {Server} from 'socket.io'
import Redis from 'ioredis'
import prismaClinet from './prisma';

const pub = new Redis({
  host:'0.0.0.0',
  port: 6379
});
const sub = new Redis({
  host:'0.0.0.0',
  port: 6379
});

class SocketService {
    
    private _io: Server;
      
    constructor(){
      console.log("init Socket Server...")
      this._io = new Server({
        cors:{
            allowedHeaders: ['*'],
            origin: '*'
        },
      });
      sub.subscribe("MESSAGES")
    }

    public initListeners() {
        const io = this.io;
        console.log('Init socket listers...')
        io.on('connect', (socket) => {
             console.log(`New socket connected ID:${socket.id}`)
             socket.on('event:message', async ({message}:{message: string}) =>{
             console.log('New message Recive.', message)
             //pubish this message to redis
                                //channel | what we have to send
             await pub.publish('MESSAGES', JSON.stringify({message}))
             });
        });

        sub.on('message', async (channel, message) =>{
           if(channel === "MESSAGES"){
              io.emit('message', message);
              await prismaClinet.message.create({
                data:{
                  text: message,
                },
              });
           } 
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;