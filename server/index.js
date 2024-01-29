import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import AuthRoutes from './routes/AuthRoutes.js'
import MessageRoutes from './routes/MessageRoutes.js'
import { Server } from "socket.io";
import path from 'path'

dotenv.config()

const app = express()
const __dirname = path.resolve()

app.use(cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}))
app.use(express.json())

app.use('/uploads/recordings', express.static(path.join(__dirname, 'uploads/recordings')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

app.use('/api/auth', AuthRoutes)
app.use('/api/messages', MessageRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_HOST
    }
})

global.onlineUsers = new Map()
io.on('connection', (socket) => {
    global.chatSocket = socket
    socket.on('add-user', (userId) => {
        onlineUsers.set(userId, socket.id)
        socket.broadcast.emit('online-users', {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })
    socket.on('signout', (id) => {
        onlineUsers.delete(id)
        socket.broadcast.emit('online-users', {
            onlineUsers: Array.from(onlineUsers.keys())
        })
    })

    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', {
                from: data.from,
                message: data.message
            })
        }
    })
    socket.on('outgoing-voice-call', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('incoming-voice-call', {
                from: data.from,
                roomId: data.roomId,
                callType: data.callType
            })
        }
    })
    socket.on('outgoing-video-call', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('incoming-video-call', {
                from: data.from,
                roomId: data.roomId,
                callType: data.callType
            })
        }
    })
    socket.on('reject-video-call', (data) => {
        const sendUserSocket = onlineUsers.get(data.from)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('video-call-rejected')
        }
    })
    socket.on('reject-voice-call', (data) => {
        const sendUserSocket = onlineUsers.get(data.from)
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('voice-call-rejected')
        }
    })
    socket.on('accept-incoming-call',({id}) => {
        const sendUserSocket = onlineUsers.get(id)
        socket.to(sendUserSocket).emit('accept-call')
    })
})
