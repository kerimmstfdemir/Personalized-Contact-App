import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ContactsIcon from '@mui/icons-material/Contacts';

const Appbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <ContactsIcon sx={{fontSize:"2rem"}}/>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginLeft:"0.7rem" }}>
            Contact App
          </Typography>
          <Button color="inherit" sx={{fontSize:"1.1rem"}}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Appbar