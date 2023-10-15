import { useState, useEffect, useContext } from "react";
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from "@mui/material";
import { AddCircle as Add} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../service/api";


const Container = styled(Box)(({ theme }) => ({
    margin: "50px 100px",
    [theme.breakpoints.down('md')] : {
        margin: 0
    }
}));


const Image = styled("img")({
    width: "100%",
    height: "50vh",
    objectFit: "cover"
});

const AddIcon = styled(Add)`
    cursor: pointer;
`;

const StyledFormControl = styled(FormControl)`
    margin: 10px;
    display: flex;
    flex-direction: row;

`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const TextArea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }

`;

const InitialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    category: "",
    createdDate: new Date()
}



const CreatePost = () => {

    const [post, setPost] = useState(InitialPost);
    const [file, setFile] = useState("");
    const { account } = useContext(DataContext);
    const location = useLocation(); 
    const navigate = useNavigate();

    const url = post.picture ? post.picture : "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=773&q=80";


    useEffect(() => {
        const getImage = async() => {
          if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
      
            try {
              // API call for uploading img
            const response = await API.uploadFile(data);
            console.log(response.data);
            post.picture = response.data;
            } catch (error) {
              console.log("Error uploading image:", error.message);
            }
          }
        };
      
        getImage();
        post.category = location.search?.split("=")[1] || "All";
        post.username = account.username;
      }, [file]);
      
      
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name] : e.target.value});
    }

    const savePost = async() => {
        let res = await API.createPost(post);
        if(res.isSuccess) {
            navigate("/");
        }
    }

    return(
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl> 
                <label htmlFor="fileInput" >
                 <AddIcon fontSize="large" color="action"/>      
                </label>    
                <input type="file"  id="fileInput" style={{ display: "none"}} onChange={e => setFile(e.target.files[0])} />

                <InputTextField placeholder="Title" onChange={e => handleChange(e)} name="title"/>
                <Button variant="contained" onClick={() => savePost()}>Publish</Button>

            </StyledFormControl> 

            <TextArea 
                minRows={5}
                placeholder="Tell your story...."
                onChange={e => handleChange(e)}
                name="description"
            />

        </Container>
    )
}

export default CreatePost;