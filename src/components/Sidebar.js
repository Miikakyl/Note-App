import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

import "../styles/styles.css";


const Sidebar = ({ createNewNote }) => {
    return (
        <div className="col-lg-1 col-md-12 pt-5 pb-3 px-5">
            <h1 className="header">Note-App</h1>
            <div className="py-5 d-flex justify-content-between d-lg-block">
                <AddIcon
                    onClick={() => createNewNote(null)}
                    className="addIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
                <DescriptionIcon
                    className="notesIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
                <DeleteIcon
                    className="deletedIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
            </div>
        </div>
    );
}

export default Sidebar;