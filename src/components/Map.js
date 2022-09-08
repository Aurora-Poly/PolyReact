/*global kakao*/ 
import React, { useEffect } from 'react'

const Map=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), //경도,위도 정보
      level: 3
    };

    //마커 추가 코드
    var map = new kakao.maps.Map(container, options);
    var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
    var marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    }, [])


    return (
        <div style={{position:"absolute", top:"200px", right:"100px", background:"#fff"}} >
        	<div id="map" style={{width:"600px", height:"600px", margin: "10px"}}></div> 
        </div>
    )
}

export default Map;