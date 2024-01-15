import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';


const Sidebar = ( {email} ) => {
    return (
        <div className="col-lg-1 col-md-12 pt-5 pb-3 px-5 d-flex flex-column">
                <div className="py-5">
                        <AddIcon sx={{ fontSize: 45, color: "white", border: "1px solid black",borderRadius: "50%", backgroundColor: "black",padding: "5px"}}/>
                        <DescriptionIcon sx={{ fontSize: 25, color: "#935568" }} />
                        <h3 className="sidebarOptions px-2">View All</h3>
                        <DeleteIcon sx={{ fontSize: 25, color: "#935568" }} />
                        <h4 className="sidebarOptions px-2">Deleted</h4>
                </div>
        </div>
    );
}

export default Sidebar;