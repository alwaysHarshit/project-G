import {LoginPage} from "./component/LoginPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AiFeedbackPage} from "./component/AiFeedbackPage.jsx";
import DashBoard from "./component/DashBoard.jsx";
import {HowToGetSessionId} from "./component/HowToGetSessionId.jsx";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LoginPage/>}/>
              <Route path="/dashboard" element={<DashBoard/>}/>
              <Route path="/ai-analysis" element={<AiFeedbackPage/>}/>
                <Route path="/how-to-get-session-id" element={<HowToGetSessionId/>}/>

            </Routes>
      </Router>
  );
}

export default App;
