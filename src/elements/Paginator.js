import React, {useState} from 'react';
import '../styles/Pagination.css';
import Pagination from "react-js-pagination";

function Paginator({page,count,pcount,setPage}) {

    let apage = page;
    let tcount = count;
    let perCount = pcount;

    return (
        <Pagination
          activePage={apage} //현재 페이지
          itemsCountPerPage={perCount} //한 페이지당 보여줄 아이템 갯수
          totalItemsCount={tcount||0} //총 아이템 갯수
          pageRangeDisplayed={5} //Paginator 내에서 보여줄 페이지의 범위
          prevPageText={"pre"} //"이전"을 나타낼 텍스트 (prev, <, ...)
          nextPageText={"next"} //"다음"을 나타낼 텍스트 (next, >, ...)
          onChange={setPage} //페이지가 바뀔 때 핸들링해줄 함수
        />
      );
}

export default Paginator;