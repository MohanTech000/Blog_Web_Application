import { Typography, Box, styled } from "@mui/material";


const Image = styled(Box)`
    // background: url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000;
    background-color: #000;
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;  
    flex-direction: column;
`;

const Heading = styled(Typography)`
    font-size: 70px;
    font-weight: 600;
    color: #FB641B;
    line-height: 1;
`;

const SubHeading = styled(Typography)`
    font-size: 20px;    
    color: #fff;
    // background: #fff;
`;

const Banner = () => {
    return(
       <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Tech World</SubHeading>
       </Image>
    )
}

export default Banner;