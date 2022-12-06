import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ContactsIcon from '@mui/icons-material/Contacts';
import { signOut } from 'firebase/auth';
import { auth } from '../authentication/firebase';
import { logout } from "../redux/features/loginInfoSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try{
            await signOut(auth);
            dispatch(logout());
            navigate("/")
            alert("Logged out successfully!")
        }catch(error) {
            console.log(error.message);
        }
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <ContactsIcon sx={{fontSize:"2rem"}}/>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft:"0.7rem" }}>
            Contact App
          </Typography>
          <Button color="inherit" sx={{fontSize:"1.1rem"}} onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Appbar