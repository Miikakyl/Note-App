import { Link } from "react-router-dom";
import "../styles/sidebar.css";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';


const Sidebar = () => {
    return (
        <div className="col-lg-2 col-md-12 pt-5 pb-3 px-5 d-flex flex-column justify-content-between" style={{ backgroundColor: "#373A47" }}>
            <div>
                <div className="d-flex justify-content-center">
                    <div className="logo">
                        <SaveAsIcon sx={{ fontSize: 55, color: "#935568" }} />
                    </div>
                </div>

                <div className="py-5">
                    <h4 className="sidebarOptionsHeader pb-1">NOTES</h4>
                    <div className="pb-2 d-flex">
                        <DescriptionIcon sx={{ fontSize: 25, color: "#935568" }} />
                        <h3 className="sidebarOptions px-2">View All</h3>
                    </div>
                    <div className="d-flex">
                        <DeleteIcon sx={{ fontSize: 25, color: "#935568" }} />
                        <h4 className="sidebarOptions px-2">Deleted</h4>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <h4 className="authButtons">SIGN IN</h4>
                <h4 className="authButtons">REGISTER</h4>
            </div>
        </div>
    );
}

export default Sidebar;