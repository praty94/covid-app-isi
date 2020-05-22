import React,{useState,createContext} from 'react';
import { sidebarOptions } from "../Data/AppElements";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const light = "light";//default app theme
    const [appState, setAppState] = useState({
        theme: localStorage.getItem('theme') || light,
        currentPage: sidebarOptions[0]
    });
    return (
        <AppContext.Provider value={[appState,setAppState]}>
            {props.children}
        </AppContext.Provider>
    );
}