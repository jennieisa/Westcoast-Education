import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import './App.css';
import CoursesAndTeachersList from './Components/Admin/CoursesAndTeacherList/CoursesAndTeachersList';
import Details from './Components/Admin/Details/Details';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import CourseList from './Components/Public/CourseList/CourseList';
import { TopicProvider } from './store/Topic-context';

function App() {
  return (
    <Router>
      <TopicProvider>
        <header>
          <h1>
            <Link to="/">WESTCOAST EDUCATION</Link>
          </h1>
          <NavBar />
        </header>
        <main className='background'>
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
             <Route 
              path="/courses/:id"
              element={ <Details />}
            />
             <Route 
              path="/teachers/:id"
              element={ <Details />}
            />
          </Routes>
        </main>
      </TopicProvider>
    </Router>
  );
}

export default App;
