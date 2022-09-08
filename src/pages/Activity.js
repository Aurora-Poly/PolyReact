import styled from "styled-components";
import Block from "../elements/Block";
import Card from "../elements/Card";
import Grid from "../elements/Grid";
import Paginator from "../elements/Paginator";
import axios from 'axios';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Activity(){
    //데이터 모두 불러오기
    const [activities, setActivities] = useState([]);
    const getActivitiesList = async ()=> {
        const response = await axios.get('http://127.0.0.1:8000/activity/')
        // console.log(response.data.results);
        setActivities(response.data.results);
        console.log(`all_dactivities: ${response.data.results}`);
    }

    //검색필터
    const [searchword, setSearchword] = useState('');
    const [searchitems, setSearchitems] = useState([]);

    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
        // console.log("검색어 onChange: ", event.target.value); //검색어를 실시간으로 찍어봄
    }

    //enter로 키워드를 서버로 전달
    const submitKeyword =async(event)=>{
        event.preventDefault();
        const response = await axios.get(`http://127.0.0.1:8000/activity/?search=${searchword}`)
        console.log("submit된 검색어: ",searchword);
        if(response.data.count === 0){
            console.log("검색결과를 찾을 수 없습니다");
        }else{
            console.log("총 ",response.data.count," 개의 검색결과가 있습니다");
            setSearchitems(response.data.results);
        }
    }

    //스크랩 기능
    // const {pk} = useParams();
    // const [like, setLike] = useState(false);
    // const handleLike = async () => {
    //     await axios.get(`http://127.0.0.1:8000/activity/like/${pk}`,
    //     { headers : { Authorization: `Token ${localStorage.getItem('token')}`}}
    //     );
    //     setLike(!like);
    //     console.log("like-status: ",like);
    // }

    //페이지네이션
    const [page, setPage] = useState(1);
    const handlePage =()=>{ //paginator 컴포넌트의 onClick함수로 추가
        //value값(페이지 번호1,2,3)가져와서 page 상태변수값을 변경
        setPage();
    }
    const getPageActivityList = async ()=> {
        const response = await axios.get(`http://127.0.0.1:8000/activity/?page_size=${page}`);
        setActivities(response.data.results);
        console.log(response.data.results);
    }

    useEffect(()=>{
        getActivitiesList();
        getPageActivityList();
    }, []);


    return(
        <>
        <Title>대외활동/공모전</Title>
        <SearchBox onSubmit={submitKeyword}>
            <Search type="text" placeholder="검색어를 입력하세요." onChange={handleKeyword}/>
        </SearchBox>
        <BlockList>
            <Block text="경영/마케팅" color="#45404f" border="#45404f"/>
            <Block text="IT/통신" color="#45404f" border="#45404f"/>
            <Block text="디자인/예술/영상" color="#45404f" border="#45404f"/>
            <Block text="역사" color="#45404f" border="#45404f"/>
            <Block text="미용/뷰티" color="#45404f" border="#45404f"/>
            <Block text="경제/금융" color="#45404f" border="#45404f"/>
            <Block text="법률" color="#45404f" border="#45404f"/>
            <Block text="교육" color="#45404f" border="#45404f"/>
            <Block text="엔터테인먼트" color="#45404f" border="#45404f"/>
            <Block text="의료/보건" color="#45404f" border="#45404f"/>
            <Block text="환경/에너지" color="#45404f" border="#45404f"/>
            <Block text="행사/컨텐츠" color="#45404f" border="#45404f"/>
            <Block text="식품/건강" color="#45404f" border="#45404f"/>
        </BlockList>
        { searchword ?
                        //검색어 있으면
                    (<>
                        <Grid width="1050px" col="4" colgap="15px" rowgap="20px" background="transparent">
                            {Array.from(searchitems).map(item => (
                                <Card key={item.id}
                                    pk={item.pk}
                                    is_scrap
                                    // onClike={handleLike}
                                    width="248px" 
                                    height="276px"
                                    title={item.title}
                                    desc={item.company}
                                    src={item.img_url}/>
                                    ))}
                        </Grid>
                        <Paginator/>
                    </>)
                        :
                        //검색어 없으면
                    (<>
                        <Grid width="1050px" col="4" colgap="15px" rowgap="20px" background="transparent">
                            {Array.from(activities).map(activity => (
                                <Card key={activity.id}
                                    pk={activity.pk}
                                    is_scrap
                                    // onClike={handleLike}
                                    width="248px" 
                                    height="276px"
                                    title={activity.title}
                                    desc={activity.company}
                                    src={activity.img_url}/>
                                    ))}
                        </Grid>
                        <Paginator/>
                    </>)
        }
        </>
        )
}

const Title = styled.h1`
    margin-bottom: 0;
    text-align: center;
    color: #fff;
`;

const SearchBox = styled.form`
    text-align: center;
`;

const Search = styled.input`
    display: inline-block;
    width: 600px;
    height: 56px;
    padding: 3px 35px 0px 35px;
    font-size: 18px;
    background: transparent;
    outline: none;
    border: 1px solid rgba(169,169,169,0.1);
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;
    transition: all 0.5s;

    &:hover,&:focus{
        box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px;
    }
`;

const BlockList = styled.ul`
    padding-left: 0;
    display: flex;
    margin-top: 30px; 
    justify-content: center;
`;

export default Activity;