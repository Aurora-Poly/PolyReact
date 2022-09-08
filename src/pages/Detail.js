import styled from "styled-components";
import { useParams } from 'react-router-dom';
import DetailInfo from "../components/DetailInfo.js";
import axios from "axios";
import {useState, useEffect} from 'react';

function Detail(){
    const {pk} = useParams();
    const [data, setData] = useState({
        // title: '',
        // company: '',
        // tag: '',
        // act_period: '',
        // apply_period: '',
        // detail: '',
        // field: '',
        // personnel: 0,
        // apply_url: '',
        // img_url: ''
        title: '',
        office: '',
        apply_target: '',
        act_period: '',
        apply_period: '',
        field: '',
        personnel: 0,
        img_url: ''
    });


    // const { title,company,tag,act_period,apply_period,detail,field,personnel,apply_url,img_url } = data;
    const { title,office, apply_target,act_period,apply_period,field,personnel,img_url } = data;

    const getDetail = async()=>{
        const response = await axios.get(`http://127.0.0.1:8000/activity/${pk}/`);
            console.log(response.data);
            setData({
                title: response.data.title,
                office: response.data.office,
                personnel: 0,
                img_url: response.data.img_url,
                // apply_target: list.data[pk].apply_target,
                // field: list.data[x].field,
                // act_period: list.data[x].act_period,
                // apply_period: list.data[x].apply_period,
                // tag: list.data[x].tag,
                // personnel: list.data[x].number,
                // detail: list.data[x].ex,
                // apply_url: list.data[x].apply,
            });
    }

    useEffect(()=>{
        getDetail();
    },[])
    
    return(
        <DetailInfo
            title = {title}
            office = {office}
            apply_period = {apply_period}
            act_period = {act_period}
            personnel = {personnel}
            apply_target= {apply_target}
            field={field}
            img_url={img_url}/>

    );
}

export default Detail;