import { useState } from 'react'
import SessionContext from './SessionContext'


const SessionState = (props)=>{
    const [session, setSession] = useState({ authenticated: false })

    const login = (user) => {
      setSession({ ...session, authenticated: true, ...user })
    }
  
    const logout = () => {
      setSession({ authenticated: false })
    }
   
       
    return (
<SessionContext.Provider value={{session,login,logout}}>
    {props.children}
</SessionContext.Provider>
    )
}
export default SessionState;