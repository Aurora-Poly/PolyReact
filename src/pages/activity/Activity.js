import styled from "styled-components";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { debounce } from "lodash";
import Card from "../../elements/Card";
import Grid from "../../elements/Grid";
import Paginator from "../../elements/Paginator";
import styles from "./Activity.module.css";
import {BsFilterCircle} from "react-icons/bs";
import {POLY_SERVER} from "../../API.js";


function Activity(){
    //카테고리==========================================================================
    const fields = ['기획/아이디어','광고/마케팅','학술','사진/영상/UCC','디자인','문학/시나리오','건축/건설/인테리어','브랜드/네이밍','예체능','대외활동','취업/창업','IT/SW/게임','기타'];
    const targets = ['누구나','일반인','대학생','대학원생','청소년','어린이','기타'];
    const prizes = ['5000만원이상','3000만원-5000만원','1000만원이하','기타',];
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

     //필터링 기능==========================================================================
    const [checkedFieldList, setCheckedFieldList] = useState([]);
    const onCheckedField = (checked, item) => {
        if (checked) {
          setCheckedFieldList([...checkedFieldList, `field=${item}`])
        } else if (!checked) {
            if(item){
                setCheckedFieldList(checkedFieldList.filter(el => el !== `field=${item}`));
            }else{
                setCheckedFieldList([]);
            }
        }
    };
    const [checkedTargetList, setCheckedTargetList] = useState([]);
    const onCheckedTarget = (checked, item) => {
        if (checked) {
          setCheckedTargetList([...checkedTargetList, `target=${item}`])
        } else if (!checked) {
            if(item){
                setCheckedTargetList(checkedTargetList.filter(el => el !== `target=${item}`));
            }else{
                setCheckedTargetList([]);
            }
        }
    };
    const [checkedPrizeList, setCheckedPrizeList] = useState([]);
    const onCheckedPrize = (checked, item) => {
        if (checked) {
          setCheckedPrizeList([...checkedPrizeList, `prize=${item}`])
        } else if (!checked) {
            if(item){
                setCheckedPrizeList(checkedPrizeList.filter(el => el !== `prize=${item}`));
            }else{
                setCheckedPrizeList([]);
            }
        }
    };
    const [checkedOfficeList, setCheckedOfficeList] = useState([]);
    const onCheckedOffice = (checked, item) => {
        if(checked) {
          setCheckedOfficeList([...checkedOfficeList, `office=${item}`])
        } else if (!checked) {
            if(item){
                setCheckedOfficeList(checkedOfficeList.filter(el => el !== `office=${item}`));
            }else{
                setCheckedOfficeList([]);
            }
        }
    };

    //필터블록 조합해 문자열로 변환해 파라미터로 전달
    const makeQueryString =()=>{
        let field = checkedFieldList;
        let target = checkedTargetList;
        let office = checkedOfficeList;
        let prize = checkedPrizeList;

        let duplRemoveField = field.filter(data => data !== undefined);
        let duplRemoveTarget = target.filter(data => data !== undefined);
        let duplRemoveOffice = office.filter(data => data !== undefined);
        let duplRemovePrize = prize.filter(data => data !== undefined);

        let finalField = String(duplRemoveField).replaceAll(',','&');
        let finalTarget = String(duplRemoveTarget).replaceAll(',','&');
        let finalOffice = String(duplRemoveOffice).replaceAll(',','&');
        let finalPrize = String(duplRemovePrize).replaceAll(',','&');

        let total = [finalField, finalTarget, finalOffice, finalPrize];
        let duplRemoveTotal = total.filter(data => data !== '');
        let removed_total = String(duplRemoveTotal).replaceAll(',','&');
        submitKeyword(removed_total);
    }

    //키워드+필터 검색================================================================================
    const [searchword, setSearchword] = useState('');
    const [searchitems, setSearchitems] = useState([]);
    const [searchPage, setSearchPage] = useState(1);
    const [searchCount, setSearchCount] = useState();

    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
        setPage(1);
        setSearchPage(1);
    }
    const submitKeyword =async(str)=>{
            // if(event && event.preventDefault){event.preventDefault();}
            const response = await axios.get(`${POLY_SERVER}/activity/?search=${searchword}&${str}&page_size=${searchPage}`);   
                setSearchitems(response.data.results);
                setSearchCount(response.data.count);
    }


    //전체 목록 조회(페이지네이션 적용)==========================================================================
    const P_PAGE = 10;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(); 
    const [activities, setActivities] = useState([]);
    
    const getPageActivityList = async()=> {
        const response = await axios.get(`${POLY_SERVER}/activity/?page_size=${page}`);
        setActivities(response.data.results);
        setCount(response.data.count);
    }


    const [filter, setFilter] = useState(false);
    //useEffect=================b=========================================================
    useEffect(()=>{
        getPageActivityList();
        makeQueryString();
    }, [searchword,page,searchPage,checkedFieldList,checkedTargetList,checkedPrizeList,checkedOfficeList]);


    return(
        <Background>
            <div className={styles.parentContainer}>
                <ActivityBackground>
                    <form onSubmit={submitKeyword} className={styles.searchContainer}>
                        <Search type="text" placeholder="검색어를 입력하세요." onChange={debounce(handleKeyword, 1000)}/>
                    </form>
                
                    <div style={{textAlign:"center", margin: "20px 0"}}>
                        <h4 style={{display:"inline"}}>총 {searchCount} 개의 검색결과가 있습니다.</h4>
                        <BsFilterCircle onClick={()=>setFilter(!filter)} size="18" color="#777" style={{cursor:"pointer", position:"relative", top:"3px", marginLeft:"20px"}}/>
                    </div>
                <div className={filter ? `${styles.filterBlockContainer}` : `${styles.filterBlockClosed}`}>
                    <ul id="styles.isField">
                        {Array.from(fieldsObjArr).map((item,index) => (
                            <>
                                <input type="checkbox" name="field" value={item.value} key={index} id={`f_${item.name}`} onChange={(e)=>{onCheckedField(e.target.checked, e.target.value)}}/>
                                <label htmlFor={`f_${item.name}`}>{item.name}</label>
                            </>
                        ))}
                    </ul>
                    <ul id="isCompany">
                        {Array.from(officesObjArr).map((item,index) => (
                            <>
                                <input type="checkbox" name="office" value={item.value} key={index} id={`o_${item.name}`} onChange={(e)=>{onCheckedOffice(e.target.checked, e.target.value)}}/>
                                <label htmlFor={`o_${item.name}`}>{item.name}</label>
                            </>
                        ))}
                    </ul>
                    <ul id="isTarget">
                        {Array.from(targetsObjArr).map((item,index) => (
                            <>
                                <input type="checkbox" name="target" value={item.value} key={index} id={`t_${item.name}`} onChange={(e)=>{onCheckedTarget(e.target.checked, e.target.value)}}/>
                                <label htmlFor={`t_${item.name}`}>{item.name}</label>
                            </>
                        ))}
                    </ul>
                    <ul id="isReward">
                        {Array.from(prizesObjArr).map((item,index) => (
                            <>
                                <input type="checkbox" name="prize" value={item.value} key={index} id={`p_${item.name}`} onChange={(e)=>{onCheckedPrize(e.target.checked, e.target.value)}}/>
                                <label htmlFor={`p_${item.name}`}>{item.name}</label>
                            </>
                        ))}
                    </ul>
                </div>
                { searchword || searchitems?
                            //검색어 혹은 검색결과가 있으면
                                (<>
                                <Grid width="1300px" col="5" colgap="15px" rowgap="20px" margin="0 auto">
                                    {Array.from(searchitems).map((item,index) => (
                                        <Card key={index}
                                            is_scrap
                                            pk={item.id}
                                            width="248px" 
                                            height="276px"
                                            title={item.title}
                                            company={item.jukwan}
                                            period={item.apply_period}
                                            src={item.image_url}
                                            likecount={item.id}/>
                                    ))}
                                </Grid>
                                <Paginator count={searchCount} pcount={P_PAGE} page={searchPage} setPage={setSearchPage}/>
                            </>)
                                :
                            //검색어 없으면
                            (<>
                                <Grid width="1300px" col="5" colgap="15px" rowgap="20px" margin="0 auto">
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
                                            likecount={activity.id}/>
                                ))}
                                </Grid>
                                <Paginator count={count} pcount={P_PAGE} page={page} setPage={setPage}/>
                            </>)
                }
                </ActivityBackground>   
            </div>
        </Background>
        )
}

const Background = styled.div`
    height: 120vh;
    background-blend-mode: multiply;
    background: url('/img/blur_buildings.jpg') no-repeat center center/cover, rgba(0,0,0,0.1);
`;

const ActivityBackground = styled.div`
    width: 1340px;
    height: auto;
    background-color: #fff;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 20px;
`;

const Search = styled.input`
    display: inline-block;
    width: 600px;
    height: 56px;
    padding: 3px 35px 0px 35px;
    font-size: 18px;
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