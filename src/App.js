import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/chat" Component={Chat} />
            <Route path='*' Component={Login} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
