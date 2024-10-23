import {Server} from 'socket.io'

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
    }

    public initListeners() {
        const io = this.io;
        console.log('Init socket listers...')
        io.on('connect', (socket) => {
             console.log(`New socket connected ID:${socket.id}`)
             socket.on('event:message', async ({message}:{message: string}) =>{
             console.log('New message Recive.', message)
             });
        });
    }

    get io(){
        return this._io;
    }
}

export default SocketService;