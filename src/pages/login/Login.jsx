import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import googleicon from "../../assets/google-icon.png"
import { useNavigate } from "react-router-dom";
import { auth } from "../../authentication/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { loginInfos, loginSuccess } from "../../redux/features/loginInfoSlice";
import ForgotPassword from "./ForgotPassword";
import { successNotify, errorNotifyLogin, warningNotify } from "../../notifies/ToastifyNotifies";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const loginInfo = useSelector((state) => state.loginInfo)
    const { email:emailAdress, password } = loginInfo

    const providerGoogle = new GoogleAuthProvider();

    const Copyright = (props) => {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                    Your Website
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
        if(emailAdress.match(reg)) {
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
            try{
                const { user } = await signInWithEmailAndPassword(auth, emailAdress, password)
                console.log(user);
                const { email, displayName, uid } = user
                dispatch(loginSuccess({...loginInfo, userInfo:{displayName, uid}, email:email}))
                navigate("/home")
                successNotify("Logged in successfully!")
            }catch(error) {
                console.log(error.message)
                errorNotifyLogin("Login failed!")
            }
        }
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
          .then((result) => {
            const { email, displayName, photoURL, uid } = result.user
            dispatch(loginSuccess({...loginInfo, userInfo:{displayName, photoURL, uid}, email:email}))
            navigate("/home")
            alert("Successfully logged in with Google!")
          })
    }

    console.log(loginInfo)

    return (
        <>
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => {dispatch(loginInfos({...loginInfo, email:e.target.value}))}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {dispatch(loginInfos({...loginInfo, password:e.target.value}))}}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button sx={{ width: "100%", textTransform: "initial", gap: "1rem" }} variant="contained" onClick={signInWithGoogle} >
                                <div style={{ height: "1.8rem", gap: "0.5rem", alignItems: "center !important" }} className="d-flex flex-row justify-content-center">
                                    <img style={{ width: "1.5rem", height: "1.5rem" }} src={googleicon} alt="google-icon" />
                                    <p style={{ fontSize: "medium" }}>Continue with Google</p>
                                </div>
                            </Button>
                            <Grid className="mt-2" container>
                                <Grid item xs>
                                    <Link sx={{cursor:"pointer"}} variant="body2" data-bs-toggle="modal" data-bs-target="#forgotPassword">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link sx={{ cursor:"pointer" }} variant="body2" onClick={() => navigate("/register")}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
        <ForgotPassword />
        </>
    )
};

export default Login;
