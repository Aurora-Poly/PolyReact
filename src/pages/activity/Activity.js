import styled from "styled-components";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { debounce } from "lodash";
import Card from "../../elements/Card";
import Grid from "../../elements/Grid";
import Paginator from "../../elements/Paginator";
import styles from "./Activity.module.css";

function Activity(){
    //카테고리==========================================================================
    const fields = ['기획/아이디어','광고/마케팅','학술','사진/영상/UCC','디자인','문학/시나리오','건축/건설/인테리어','브랜드/네이밍','예체능','대외활동','취업/창업','IT/SW/게임','기타'];
    const targets = ['누구나','일반인','대학생','대학원생','청소년','어린이','기타'];
    const prizes = ['5000만원','일반인','대학생','대학원생',];
    const offices = ['중앙정부/기관','공기업','대기업','신문/방송/언론','외국계기업','지방자치단체','학교/재단/협회','중소/벤처기업','학회/비영리단체','해외','기타'];

    const fieldsObjArr = [];
    const targetsObjArr = [];
    const prizesObjArr = [];
    const officesObjArr = [];
    for(let i=0; i<fields.length; i++){
        fieldsObjArr.push({name:fields[i],value:(i+1)});
    };
    for(let i=0; i<targets.length; i++){
        targetsObjArr.push({name:targets[i],value:(i+1)});
    };
    for(let i=0; i<prizes.length; i++){
        prizesObjArr.push({name:prizes[i],value:(i+1)});
    };
    for(let i=0; i<offices.length; i++){
        officesObjArr.push({name:offices[i],value:(i+1)});
    };

    const [field, setField] = useState('');
    const getFilteredList =async(event,name)=>{
        if(event && event.preventDefault){event.preventDefault();}
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/activity/?${strings}`);
            console.log(response.data.results);
            setSearchitems(response.data.results);
            setSearchCount(response.data.count);
    
    }
    const makeFiltering =(str)=>{
        setField(`field=${str}`);
    }

    //전체 목록 조회(페이지네이션 적용)==========================================================================
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(); 
    const [activities, setActivities] = useState([]);
    const getPageActivityList = async()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/activity/?page_size=${page}`);
        setActivities(response.data.results);
        setCount(response.data.count);
    }

    //키워드 검색==========================================================================
    const [searchword, setSearchword] = useState('');
    const [searchitems, setSearchitems] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searchCount, setSearchCount] = useState();

    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
        setPage(1);
        setSearchPage(1);
    }
    const submitKeyword =async(event)=>{
            if(event && event.preventDefault){event.preventDefault();}

            const response = await axios.get
            (`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/activity/?search=${searchword}&page_size=${searchPage}`);
                console.log(response.data.results);
                setSearchitems(response.data.results);
                setSearchCount(response.data.count);
        
    }

    //useEffect==========================================================================
    useEffect(()=>{
        getPageActivityList();
        submitKeyword();
    }, [searchword,page,searchPage]);


    return(
        <>
        <form onSubmit={submitKeyword} className={styles.searchContainer}>
            <Search type="text" placeholder="검색어를 입력하세요." onChange={debounce(handleKeyword, 1000)}/>
        </form>

        <div style={{border:"1px solid #e6e6e6", textAlign:"center"}}>
            <div style={{display:"inline-block"}}>
                {Array.from(fieldsObjArr).map((item,index) => (
                        <li key={index}onClick={()=>{makeFiltering(index+1)}}>{item.name}</li>
                ))}
            </div>
            <div style={{display:"inline-block"}}>
                {Array.from(targetsObjArr).map((item,index) => (
                        <li key={index}>{item.name}</li>
                ))}
            </div>
            <div style={{display:"inline-block"}}>
                {Array.from(prizesObjArr).map((item,index) => (
                        <li key={index}>{item.name}</li>
                ))}
            </div>
            <div style={{display:"inline-block"}}>
                {Array.from(prizesObjArr).map((item,index) => (
                        <li key={index}>{item.name}</li>
                ))}
            </div>
            <div style={{display:"inline-block"}}>
                {Array.from(officesObjArr).map((item,index) => (
                        <li key={index}>{item.name}</li>
                ))}
            </div>
        </div>
        { searchword ?
                    //검색어 있으면
                        (<>
                        <Grid width="1260px" col="5" colgap="15px" rowgap="20px" margin="0 auto">
                            {Array.from(searchitems).map((item,index) => (
                                <Card key={index}
                                    is_scrap
                                    pk={item.id}
                                    width="248px" 
                                    height="276px"
                                    title={item.title}
                                    company={item.jukwan}
                                    src={item.image_url}
                                    like={item.id}/>
                            ))}
                        </Grid>
                        <Paginator count={searchCount} page={searchPage} setPage={setSearchPage}/>
                    </>)
                        :
                    //검색어 없으면
                    (<>
                        <Grid width="1260px" col="5" colgap="15px" rowgap="20px" margin="0 auto">
                            {Array.from(activities).map((activity,index) => (
                                <Card key={index}
                                    pk={activity.id}
                                    is_scrap
                                    width="240px" 
                                    height="276px"
                                    title={activity.title}
                                    company={activity.jukwan}
                                    period={activity.apply_period}
                                    src={activity.image_url}
                                    like={activity.id}/>
                        ))}
                        </Grid>
                        <Paginator count={count} page={page} setPage={setPage}/>
                    </>)
        }
        </>
        )
}


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

export default Activity;