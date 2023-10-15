import { useState, useContext } from "react";
import { Box, styled, TextField, Button, Typography } from "@mui/material";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";


const Component = styled(Box)`

    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0, 0, 0, 0.6);

`;

const Image = styled("img")({
    width: 100,
    display: "flex",
    margin: "auto",
    padding: "50px 0 0"
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0, 0, 0, 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;
const LoginInitialValues = {
    username: "",
    password: ""
}

const SignupInitialValues = {
    name: "",
    username: "",
    password: ""
}



const Login = ({ isUserAuthenticated }) => {

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [ account, toggleAccount] = useState("login");
    const [ signup, setSignUp ] = useState(SignupInitialValues);
    const [ error, setError ] = useState("");
    const [ login, setLogin ] = useState(LoginInitialValues);

    //context
    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = () => {
        account === "signup" ? toggleAccount("login") : toggleAccount("signup");
    }

    const onInputChange = (e) => {
        setSignUp({ ...signup, [e.target.name] : e.target.value});
    }

    const signupUser = async () => {
        try {
          let res = await API.userSignup(signup);
          if (res.isSuccess) {
            setSignUp(SignupInitialValues);
            toggleAccount("login");
          } else {
            setError("Something went wrong! Please try again later");
          }
        } catch (error) {
          setError("Something went wrong with the API call! Please try again later");
        //   console.error("API Error:", error); // You can log the error for debugging purposes
        }
      };
      
    const onValueChange = (e) => {

        setLogin({ ...login, [e.target.name] : e.target.value })

    }

    const loginUser = async () => {
        try {
          let res = await API.userLogin(login);
          if (res.isSuccess) {
            setError("");
      
            sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
            sessionStorage.setItem("refreshToken", `Bearer ${res.data.refreshToken}`);
      
            setAccount({ username: res.data.username, name: res.data.name });
      
            isUserAuthenticated(true);
      
            //if successfully logged in then navigate user to home
            navigate("/");
          } else {
            setError("Something went wrong! Please try again later");
          }
        } catch (error) {
          setError("Something went wrong with the API call! Please try again later");
          console.error("API Error:", error); // You can log the error for debugging purposes
        }
      };


    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />

                {
                    account === "login" ?


                        <Wrapper>
                            <TextField variant="standard" value={login.username} onChange={e => onValueChange(e)} name="username" label="Enter username" />
                            <TextField variant="standard" value={login.password} onChange={e => onValueChange(e)} name="password" label="Enter password" />

                            { error && <Error>{ error }</Error> }

                            <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: "center" }}>OR</Text>
                            <SignUpButton onClick={()=> toggleSignUp()}>Create an account</SignUpButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={e => onInputChange(e)} name="name" label="Enter Name" />
                            <TextField variant="standard" onChange={e => onInputChange(e)} name="username" label="Enter Username" />
                            <TextField variant="standard" onChange={e => onInputChange(e)} name="password" label="Enter Password" />
                            

                            { error && <Error>{ error }</Error> }
 
                            <SignUpButton onClick={() => signupUser()}>Signup</SignUpButton>
                            <Text style={{ textAlign: "center" }}>OR</Text>
                            <LoginButton onClick={() => toggleSignUp()} variant="contained" >Already have an account</LoginButton>
                        </Wrapper>
                }

            </Box>
        </Component>
    )
}

export default Login;