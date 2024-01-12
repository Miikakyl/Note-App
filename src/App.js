import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Writing from "./components/Writing";
import AuthenticationModal from "./components/AuthenticationModal";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [isSignIn, setIsSignIn] = useState(true)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
              const uid = user.uid;
              console.log(uid)
              setIsSignIn(true)
            } else {
                setIsSignIn(false)
            }
        })
    }, [])

    
    return (
        <div className="container-fluid h-100" style={{overflow: "hidden"}} >
            <div className="row d-flex h-100">
               {isSignIn? null : <AuthenticationModal />}
                <Sidebar />
                <Notes />
                <Writing />
            </div>
        </div>
    );
}
 
export default App;