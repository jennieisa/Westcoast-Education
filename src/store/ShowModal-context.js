import React, { useState } from "react";

const ShowModalContext = React.createContext({
    showModal: false,
    onChange: () => {},
});

export const ShowModalProvider = ({children}) => {

    const [showModal, setShowModal] = useState(false);
    
    const onChangeHandler = () => {
        setShowModal(!showModal);      
    }

    return (
        <ShowModalContext.Provider 
            value={{
                showModal, 
                onChange: onChangeHandler,
            }}
        >
            {children}
        </ShowModalContext.Provider>
    )
}

export default ShowModalContext;