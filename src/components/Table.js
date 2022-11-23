import styled from "styled-components";
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { POLY_SERVER } from "../API";
import Paginator from "../elements/Paginator";

function Table(){
    const areaList = ['서울', '경기','부산','인천','대구','광주','경남','충남','대전','울산','경북','충북','전남','강원','전북','제주','중앙','세종'];
    const areaObjArr = [];
    for(let i=0; i<18; i++){
        areaObjArr.push({name:areaList[i],value:(i+1)});
    }
    console.log(areaObjArr);

    //페이지네이션+활동 불러오기==========================================================================
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [volunteers, setVolunteers] = useState([]);
    const getPageVolunteerList = async()=> {
        const response = await axios.get(`${POLY_SERVER}/volunteer/?page_size=${page}`);
        console.log(response.data.results);
        setVolunteers(response.data.results);
        setCount(response.data.count);
    }

    //useEffect==========================================================================
    useEffect(()=>{
        getPageVolunteerList();
    }, [count,page]);


    return(
        <TableBoard>
            <table style={{borderSpacing:"0px",borderCollapse:"collapse",borderRadius: "10px"}}>
                <Thead>
                    <tr>
                        <Th>번호</Th>
                        <Th2>봉사활동명</Th2>
                        <Th3>활동기간</Th3>
                        <Th4>기관명</Th4>
                        <Th>지역</Th>
                    </tr>
                </Thead>
                <tbody>
                    {Array.from(volunteers).map((v,index) => (
                        <Trbox key={index}>
                                <td>{v.id}</td>
                                <td><StyledLink to={`/volunteer/${v.id}`}>{v.title}</StyledLink></td>
                                <td>{v.act_period}</td>
                                <td>{v.office}</td>
                                <td>{areaObjArr[v.area-1].name}</td>
                            </Trbox>
                    ))}
                </tbody>
            </table>
            <Paginator count={count} page={page} setPage={setPage}/>
        </TableBoard>
    )
}

const TableBoard = styled.div`
    background-color: #fff;
    width: 1000px;
    height: 620px;
    margin: 10px auto;
    margin-bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;

const Thead = styled.thead`
    background-color: #333b3e;
    width: 100%;
    font-size: 15px;
`;

const Th = styled.th`
    width: 100px;
    height: 60px;
    font-weight: 700;
    color: #fff;
`;
const Th2 = styled.th`
    width: 400px;
    font-weight: 700;
    color: #e6e6e6;
`;
const Th3 = styled.th`
    width: 200px;
    font-weight: 700;
    color: #e6e6e6;
`;
const Th4 = styled.th`
    width: 200px;
    font-weight: 700;
    color: #e6e6e6;
`;

const Trbox = styled.tr`
    height: 70px;
    background-color: #fff;
    border-top: 1px solid rgba(169,169,169,0.2);
    border-bottom: 1px solid rgba(169,169,169,0.2);
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    transition: all 0.1s;
    
    /* &:hover{
        box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 4px;
        background-color: #E9E8FF;
    } */
`;

const StyledLink = styled(Link)`
    color: #000;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

`; 


export default Table; 