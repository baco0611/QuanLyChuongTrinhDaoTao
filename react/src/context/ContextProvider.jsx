import { createContext, useEffect, useState } from "react";

const UserContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken:() => {},
    apiURL: null,
    fakeApi: null,
    currentId: null,
    currentSection: null,
    setCurrentId: () => {},
    setCurrentSection: () => {}
})

function StateContext({ children }) {

    // User and token
    // const [user, setUser] = useState()
    const [user, setUser] = useState({
        name: 'Huynh Van Nguyen Bao'
    })
    const [token, _setToken] = useState(localStorage.getItem('ACCES_TOKEN'))
    // const [token, _setToken] = useState(123)

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCES_TOKEN', token)
        } else { 
            localStorage.removeItem('ACCES_TOKEN')
        }
    } 

    // Default path of API
    const apiURL = "http://localhost:8000/api"
    const fakeApi = "http://localhost:3001"

    // Handle current editing
    const [currentId, setCurrentId] = useState(null)
    const [currentSection, setCurrentSection] = useState('A')

    return (
        <UserContext.Provider value={{
                user,
                token,
                setUser,
                setToken,
                apiURL,
                fakeApi,
                currentId,
                currentSection,
                setCurrentId,
                setCurrentSection
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export default StateContext
export { UserContext }