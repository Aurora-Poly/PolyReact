import axios from 'axios';
import { POLY_SERVER } from "../API.js";
import styled from "styled-components";
import React, {useState, useEffect} from 'react';
import Grid from "../elements/Grid";
import Card from "../elements/Card";
import Paginator from "../elements/Paginator";

//portfolioManage페이지의 북마크를 관리하는 컴포넌트
function BookmarkList(){
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkPage, setBookmarkPage] = useState(1);
    const [bookmarkCount, setBookmarkCount] = useState();
    const P_PAGE = 10;

    //스크랩 리스트 조회
    const getBookmarksList =()=>{
        axios.get(`${POLY_SERVER}/likelist/?page_size=${bookmarkPage}`,
        { headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(function(response) {
            console.log(response.data);
            setBookmarks(response.data.results);
            setBookmarkCount(response.data.count);
        }).catch(function(error) {
            console.log(error);
        });
    };
    

    useEffect(()=>{
        getBookmarksList();
    },[]);

    return(
        <>
            {bookmarks.length ?
                <>
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
                                src={r.image_url}/>
                            ))}
                    </Grid>
                    <Paginator count={bookmarkCount} pcount={P_PAGE} page={bookmarkPage} setPage={setBookmarkPage}/>
                </>
                :
                <CannotShow>
                    <p>스크랩한 활동이 없습니다.</p>
                </CannotShow>
            }
        </>
    )
}

const CannotShow = styled.div`
    height: 250px;
    background-color: #f1f3f5;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px;

    p{
        font-size: small;
        margin: 0;
    }
`;

export default BookmarkList;