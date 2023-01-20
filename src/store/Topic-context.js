import React, { useState } from "react";

const TopicContext = React.createContext({
    showCourses: true,
    topicToShow: "courses",
    showTeachers: false,
    onChange: () => {},
});

export const TopicProvider = ({children}) => {

    const [topicToShow, setTopicToShow] = useState("courses");
    const [showCourses, setShowCourses] = useState(true);
    const [showTeachers, setShowTeachers] = useState(false);
    
    const onChangeHandler = (topic) => {
        if(topicToShow !== topic) {
            setTopicToShow(topic);

            if(topic.toLowerCase() === "teachers") {
                setShowCourses(false);
                setShowTeachers(true);
            } else if (topic.toLowerCase() === "courses") {
                setShowTeachers(false);
                setShowCourses(true);
            }
        }        
    }

    return (
        <TopicContext.Provider 
            value={{
                topicToShow, 
                showCourses,
                showTeachers,
                onChange: onChangeHandler,
            }}
        >
            {children}
        </TopicContext.Provider>
    )
}

export default TopicContext;