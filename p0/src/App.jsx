import {UserLoginPage} from "./component/UserLoginPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AiFeedbackPage} from "./component/AiFeedbackPage.jsx";
import UserProfile from "./component/UserProfile.jsx";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<UserLoginPage/>}/>
              <Route path="/dashboard" element={<div className={"flex items-center justify-center w-ma"}>
                  <UserProfile/>
              </div>}/>
              <Route path="/ai-analysis" element={<AiFeedbackPage/>}/>
            </Routes>
      </Router>
  );
}

export default App;
