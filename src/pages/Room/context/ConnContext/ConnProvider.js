import { createContext, useState } from 'react';

export const Conncontext = createContext();

const ConnProvider = ({ children }) => {
    const [ connected, setConnected ] = useState(false)

    const ok = () => {
        setConnected(true)
        console.log("ok")
    }

    const value = { connected, ok }

    return (
        <Conncontext.Provider value={value} >
            {children}
        </Conncontext.Provider>
    )
}

export default ConnProvider;
