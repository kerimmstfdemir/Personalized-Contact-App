import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CallIcon from "@mui/icons-material/Call";
import { FromStyledDiv, FormStyledHeader } from "./Form.styled";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database"
import { useSelector } from "react-redux";
import app from "../authentication/firebase";

const Form = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")

  const { userInfo } = useSelector((state) => state.loginInfo)

  const genderSelect = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const [gender, setGender] = useState("Male");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const addUserButton = () => {
    if (name && phoneNumber) {
      try {
        const database = getDatabase(app);
        const userRef = push(ref(database, `${userInfo.uid}/contacts`))
        set(userRef, {
          name:name,
          phoneNumber:phoneNumber,
          gender:gender
        })
        alert("Contact added!")
      } catch(error) {
        console.log(error);
      }
    }
  }

  console.log(userInfo)

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
    <FromStyledDiv>
    <FormStyledHeader>ADD CONTACT</FormStyledHeader>
        <Box component="form" sx={{marginTop:"-2rem", display: "flex", alignItems: "flex-end"}}>
          <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} />
          <TextField 
          name="text"
          type="text" 
          label="Name"
          variant="standard" InputLabelProps={{style:{color:"white"}}} 
          inputProps={{style:{color:"white"}}}
          onChange={(e) => setName(e.target.value)}/>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <CallIcon sx={{ color: "white", mr: 1, my: 0.5 }} />
          <TextField
            type="tel"
            label="Phone Number"
            variant="standard"
            InputLabelProps={{style:{color:"white"}}}
            sx={{input:{color:"white"}}}
            inputProps={{pattern:"[0-9]"}}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
      <Box
        component="form"
        sx={{ "& .MuiTextField-root": {width: "25ch" }, marginTop:"0.5rem" }}
        noValidate
        autoComplete="off">
        <div>
        <TextField
          select
          label="Gender"
          value={gender}
          onChange={handleChange}
          variant="standard"
          InputLabelProps={{style:{color:"white"}}}
          sx={{marginLeft:"1rem"}}
        >
          {genderSelect.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
      </Box>
      <Button variant="contained" onClick={addUserButton}>Add</Button>
    </FromStyledDiv>
    </div>
  );
};

export default Form;

