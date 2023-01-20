import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import CoursesAndTeachersList from './Components/Admin/CoursesAndTeacherList/CoursesAndTeachersList';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import CourseList from './Components/Public/CourseList/CourseList';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route 
          path="/"
          element={ <Home />}
        />
        <Route 
          path="/courses" 
          element={ <CourseList />}
        />
        <Route 
          path="/admin"
          element={ <CoursesAndTeachersList />}
        />
      </Routes>
    </Router>
  );
}

export default App;
