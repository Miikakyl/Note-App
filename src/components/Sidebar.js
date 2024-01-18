import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

import "../styles/styles.css";


const Sidebar = ({ createNewNote, setRemovedNotesShow }) => {
    return (
        <div className="col-lg-1 col-md-12 pt-5 pb-3 px-5">
            <h1 className="header">Note-App</h1>
            <div className="py-5 d-flex justify-content-between d-lg-block">
                <AddIcon
                    onClick={() => {
                        setRemovedNotesShow(false)
                        createNewNote(null)
                    }}
                    className="addIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
                <DescriptionIcon
                    onClick={() => setRemovedNotesShow(false)}
                    className="notesIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
                <DeleteIcon
                    onClick={() => setRemovedNotesShow(true)}
                    className="deletedIcon sidebarIcons"
                    sx={{ fontSize: 50 }}
                />
            </div>
        </div>
    );
}

export default Sidebar;