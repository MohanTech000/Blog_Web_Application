import { Box, Button, TextareaAutosize, styled } from "@mui/material"
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../service/api";

//components
import GetComment from "./GetComment";

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

const Image = styled("img")({
    width: 50,
    height: 50,
    borderRadius: "50%"
});

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;

`;




const InitialValues = {
    name: "",
    postId: "",
    comments: "",
    date: new Date()
}


const Comments = ({ post }) => {

    const [ comment, setComment ] = useState(InitialValues);
    const [ comments, setComments ] = useState([]); //for getting comments
    const [ toggle, setToggle ] = useState(false);
    const { account } = useContext(DataContext);

    const url = "https://static.thenounproject.com/png/12017-200.png";

    useEffect(() => {
        const getData = async() => {

            try {

                const response = await API.getAllComments(post._id);
                if(response.isSuccess) {
                    setComments(response.data);

                }

                
            } catch (error) {
                console.log("Error getting comments:", error.message);
            }

           
        }
        getData();
    }, [post, toggle])


    const handleChange = (e) => {
        setComment({ ...comment, name: account.username, postId: post._id, comments: e.target.value});
    }

    const addComment = async(e) => {

        try {

            let response = await API.newComment(comment);
            if(response.isSuccess) {
                setComment(InitialValues);
            }
    
            setToggle(prevState => !prevState);
            
        } catch (error) {

            console.log("error while adding comment", error.message);
            
        }


    }

    return (
        <Box>


            <Container>
                <Image src={url} alt="user" />
                <StyledTextArea
                    minRows={5}
                    placeholder="What's on your mind?"
                    value={comment.comments}
                    onChange={e => handleChange(e)}
                />
                <Button onClick={e => addComment(e)} variant="contained" color="primary" size="medium" style={{ height: 40 }}>Post</Button>
            </Container>


            <Box>
                 {
                    comments && comments.length > 0 && comments.map(comment => (
                        <GetComment comment={comment} setToggle={setToggle} />
                    ))
                 }   
            </Box>
        </Box>
    )
}

export default Comments;