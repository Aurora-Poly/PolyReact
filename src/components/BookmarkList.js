import axios from 'axios';
import { POLY_SERVER } from "../API.js";
import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import Grid from "../elements/Grid";
import Card from "../elements/Card";

//portfolioManage페이지의 북마크를 관리하는 컴포넌트
function BookmarkList(){
    const [bookmarks, setBookmarks] = useState([]);
    const getBookmarksList =()=>{
        axios.get(`${POLY_SERVER}/likelist/`,
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            setBookmarks(response.data.results);
        }).catch(function(error) {
            console.log(error);
        });
    };

    useEffect(()=>{
        getBookmarksList();
    },[]);

    return(
        <Grid col="3" colgap="20px" rowgap="30px">
            {Array.from(bookmarks).map((r,index) => (
                <Card key={index}
                    is_scrap
                    pk={r.id}
                    width="100%" 
                    height="276px"
                    title={r.title}
                    company={r.jukwan}
                    period={r.apply_period}
                    src={r.image_url}
                    like={r.id}/>
                ))}
        </Grid>
    )
}

export default BookmarkList;