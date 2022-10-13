import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components';
import Grid from '../elements/Grid';
import Button from '../elements/Button';

function VolunteerDetail(){
    const [volunteer, setVolunteer] = useState({
        title: '',
        act_period: '',
        area: 0,
        type: 0,
        meet: 0,
        field: 0,
        apply_url: '',
        place: '',
        office: ''
    });

    const { title,office,place,act_period,apply_url,type,meet,field,area } = volunteer;

    //지역
    const areaList = ['서울', '경기','부산','인천','대구','광주','경남','충남','대전','울산','경북','충북','전남','강원','전북','제주','중앙','세종'];
    const areaObjArr = [];
    for(let i=0; i<areaList.length; i++){
        areaObjArr.push({name:areaList[i],value:(i+1)});
    }
    //분류
    const fieldList = ['시설봉사','재가봉사','지역사회봉사','전문봉사','해외봉사','기타봉사',];
    //대면,비대면
    const meetList = ['대면','비대면','대면+비대면'];


    const {pk} = useParams();
    const getVolunteer = async()=> {
        const response = await axios.get(`http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/volunteer/${pk}`);
        console.log(response.data);
        setVolunteer({
            title: response.data.title,
            act_period: response.data.act_period,
            area: response.data.area,
            type: response.data.type,
            meet: response.data.meet,
            field: response.data.field,
            apply_url: response.data.apply_url,
            place: response.data.place,
            office: response.data.office
        });
    }

    useEffect(()=>{
        getVolunteer();
    },[])

    return(
        <VolunteerContainer>
            <p>{office}</p>
            <h2>{title}</h2>
            <Grid col="2" row="3" colgap="10px">
                <div>
                    <h4>활동기간</h4>
                    <p>{act_period}</p>
                </div>
                <div>
                    <h4>지역</h4>
                    <p>{areaList[area-1]}</p>
                </div>
                <div>
                    <h4>활동장소</h4>
                    <p>{place}</p>
                </div>
                <div>
                    <h4>형태</h4>
                    <p>{type==1? '정기':'비정기'}</p>
                </div>
                <div>
                    <h4>봉사분류</h4>
                    <p>{fieldList[field-1]}</p>
                </div>
                <div>
                    <h4>대면여부</h4>
                    <p>{meetList[meet-1]}</p>
                </div>
            </Grid>
            <div className='btn_box'>
                <Button
                    outside
                    width="300px"
                    text="지원하기" 
                    href={`${volunteer.apply_url}`}/>
            </div>
        </VolunteerContainer>
    )
}

const VolunteerContainer = styled.div`
    width: 50%;
    min-width: 500px;
    height: 550px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    position:relative;
    top: 80px;

    >h2{
        margin: 0;
        margin-bottom: 20px;
    }
    >p{
        margin: 0;
        margin-bottom: 10px;
    }
    .btn_box{
        text-align: center;
        position: relative;
        top: 45px;
    }
`;

export default VolunteerDetail;

