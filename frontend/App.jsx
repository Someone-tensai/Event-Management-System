import {Routes, Route} from "react-router-dom";
import Register_page from "./src/pages/Register";
import Login_page from "./src/pages/Login";
import Events from "./src/pages/Events";

function App(){
    return (
        <>
        <Routes>
            <Route index element={<Register_page/>}/>
            <Route path="/register" element={<Register_page/>} />
            <Route path="/login" element={<Login_page/>}/>
            <Route path="/events" element={<Events />} />
        </Routes>
        </>
    );
}

export default App;

