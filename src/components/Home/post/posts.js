import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";

import { API } from "../../../service/api";

import { useSearchParams, Link  } from "react-router-dom";


//components
import SinglePost from "./SinglePost";





const Posts = () => {

    const [ posts, setPosts ] = useState([]);
    const [ searchParams ] = useSearchParams();
    const category = searchParams.get("category");

    useEffect(() => {
        const fetchData = async() => {
            try {

                const response = await API.getAllPosts({ category: category || "" });
                if(response.isSuccess) {
                    setPosts(response.data);
                }
                
            } catch (error) {
              console.log("Error fetching posts:", error.message);
                
            }

        }
        fetchData();
    }, [category]);

    return(
        <>
            {
                posts && posts.length > 0 ? posts.map(post => {
                   return <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`/details/${post._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <SinglePost post={post}/>
                    </Link>    
                    </Grid>

                }) : <Box style={{ color: "#878787", margin: "30px 80px", fontSize: 18 }}>Soory! No data available to display
                
                </Box>

            }
        </>
    )
}

export default Posts;