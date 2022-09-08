import styled from "styled-components";
import Card from "../elements/Card";
import Grid from "../elements/Grid";
import {useState, useEffect} from 'react';
import axios from "axios";
import Map from "../components/Map";
import Table from "../components/Table";

function Volunteer(){

    return(
        <>
        
            <h1 style={{textAlign:"center", color:"#2e4057"}}>봉사활동</h1>

            {/* <Map/> */}
            <Table/>


        </>
    )
}

export default Volunteer;