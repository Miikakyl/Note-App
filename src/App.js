import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Writing from "./components/Writing";

const App = () => {
    return (
        <div className="container-fluid h-100" >
            <div className="row d-flex align-items-stretch h-100 ">
                <Sidebar />
                <Notes />
                <Writing />
            </div>
        </div>
    );
}
 
export default App;