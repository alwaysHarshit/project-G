import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AiFeedbackPage} from "./component/AiFeedbackPage.jsx";
import DashBoard from "./component/DashBoard.jsx";
import {HowToGetSessionId} from "./component/HowToGetSessionId.jsx";
import EdgeCasePage from "./component/EdgeCasePage.jsx";
import Header from "./component/Header.jsx";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.page.jsx";
import ProfilePage from "./pages/Profile.page.jsx";




function App() {
  return (
      <Router>
          <Routes>
              <Route element={<Layout/>}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/about-us" element={<ProfilePage/>}/>
                  <Route path="/dashboard" element={<DashBoard/>}/>
              </Route>
              <Route path="/how-to-get-session-id" element={<HowToGetSessionId/>}/>2
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/edge-cases" element={<EdgeCasePage/>}/>
              <Route path="/ai-analysis" element={<AiFeedbackPage/>}/>

            </Routes>
      </Router>
  );
}

export default App;
