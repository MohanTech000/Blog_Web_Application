import { Box, Typography } from "@mui/material"
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { Delete } from "@mui/icons-material";
import styled from "@emotion/styled";
import { API } from "../../../service/api";


const Container = styled(Box)`
    margin-top: 30px;
    background-color: #F5F5F5;
    padding: 10px;
`;

const Component = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px; 
`;

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const GetComment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext);

    const removeComment = async() => {

        try {

            const response = await API.deleteComment(comment._id);
            if(response.isSuccess) {
                setToggle(prevState => !prevState);
            }
            
        } catch (error) {
            console.log("error while deleting comment", error.message);
        }

    }

    return(
        <Container>
            

                    <Component>
                            <Name>{ comment.name }</Name>
                            <StyledDate>{ new Date(comment.date).toDateString() }</StyledDate>
                            {
                                comment.name === account.username && <DeleteIcon onClick={() => removeComment()} />
                            }
                    </Component>

                    <Box>
                            <Typography>{ comment.comments }</Typography>
                    </Box>


        </Container>
    )
}

export default GetComment;