import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContactsIcon from '@mui/icons-material/Contacts';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../authentication/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { registerInformations, afterRegister } from '../../redux/features/registerSlice';
import { useState } from 'react';
import { successNotify, warningNotify, errorNotify } from '../../notifies/ToastifyNotifies';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerInfo = useSelector((state) => state.registerInfo)
    const { firstName, lastName, email, password } = registerInfo;

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/kerimmstfdemir" target="_blank">
              Kerim Mustafa Demir
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

      const theme = createTheme();

      const handleSubmit = async (event) => {
        event.preventDefault();
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        //? email format check
        if(email.match(reg)) {
          setEmailError(false)
        }else {
          setEmailError(true)
          warningNotify("Invalid email format!")
        } 

        //? password length check
        if(password.toString().length < 6){
          setPasswordError(true)
          warningNotify("Please enter a password at least 6 character!")
        }else{
          setPasswordError(false)
        }

        if(!emailError && !passwordError) {
          try {
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser,{
            displayName:`${firstName} ${lastName}`
          })
          dispatch(afterRegister())
          successNotify("Registration Successful!")
          navigate("/")
          } catch(error) {
            if (error.message.indexOf("auth/email-already-in-use") >= 0) {
              warningNotify("Already registered with this email!")
            }
            dispatch(afterRegister())
            errorNotify("Registration failed!")
          }
        }
      };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="d-flex align-items-center mt-4 mb-5" style={{gap:"0.7rem"}}>
                            <ContactsIcon style={{fontSize:"2.5rem"}}/>
                            <Typography component="h1" variant="h4">
                            Contact App
                            </Typography>
                        </div>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e)=>dispatch(registerInformations({...registerInfo, firstName:e.target.value}))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => dispatch(registerInformations({...registerInfo, lastName:e.target.value}))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => dispatch(registerInformations({...registerInfo, email:e.target.value}))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => dispatch(registerInformations({...registerInfo, password:e.target.value}))}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link sx={{ cursor:"pointer" }} variant="body2" onClick={() => navigate("/")}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Register