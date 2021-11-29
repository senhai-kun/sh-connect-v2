import { useState, useEffect, useCallback } from 'react';
import Peer from 'peerjs'

const usePeer = () => {
    const [peerId] = useState(Math.floor(Math.random() * (9999 - 1000) ) + 1000)
    
    // initialize Peer with peerId new Peer(peerId)
    const [ peer, setPeer ] = useState()
    // connection state
    const [ conn, setConn ] = useState()
    // const [ connected, setConnected ] = useState(false)

    const [ receive, setReceive ] = useState({ from: '', msg: '' })

    useEffect( () => {
        // console.log("peer me");
        // setPeer( new Peer(peerId) )
        return () => {
            console.log("peer", peer)
        }
    }, [] )
 
    useEffect( () => {
        if(conn) {  
            peer.on('connection', setConn)
            conn.on('data', function(data) {
                // console.log('Received', data);
                console.log('conn')
                setReceive(data)
            });
        }
    }, [peer, conn] )

    const setConnection = (connectWithId) => {
        console.log("set", peer)
        // setConn(peer.connect(connectWithId))
        // setConnected(true)
    }

    const sendChat = (msg) => {
        console.log("send Chat", conn)
        // conn.send({ from: localStorage.getItem('username'), msg: msg })
    }

    const destroyConnection = () => {
        peer.destroy()
    }

    const [ on, setOn ] = useState(false)

    const set = () => {
        setOn(!on)
        console.log("On", on)
    }

    return { 
        peerId, 
        // connected, 
        receive,
        setConnection, 
        sendChat, 
        destroyConnection,
        on,
        set
    }
}

export default usePeer;
