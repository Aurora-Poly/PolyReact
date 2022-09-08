import styled from "styled-components";

function Table(){
    return(
        <TableBoard>
            <table style={{borderSpacing:"0px",borderCollapse:"collapse"}}>
                <Thead>
                    <tr>
                        <Th>번호</Th>
                        <Th2>봉사활동명</Th2>
                        <Th3>활동기간</Th3>
                        <Th4>기관명</Th4>
                        <Th>상태</Th>
                    </tr>
                </Thead>
                <tbody>
                    <Trbox>
                        <td>1</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                    <Trbox>
                        <td>2</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                    <Trbox>
                        <td>3</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                    <Trbox>
                        <td>4</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                    <Trbox>
                        <td>5</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                    <Trbox>
                        <td>6</td>
                        <td>덕성여자대학교 교육봉사</td>
                        <td>2022-08-11~2022-08-12</td>
                        <td>덕성여자대학교</td>
                        <td>
                            <Status>모집중</Status>
                        </td>
                    </Trbox>
                </tbody>
            </table>
        </TableBoard>
    )
}

const TableBoard = styled.div`
    background-color: #fff;
    width: 1000px;
    height: 650px;
    /* position: relative;
    left: 100px;
    top: 36px; */
    margin: 50px auto;
    border: 1px solid rgba(169,169,169,0.2);
    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;

const Thead = styled.thead`
    background-color: #E9E8FF;
    width: 100%;
    font-size: 15px;
`;

const Th = styled.th`
    width: 100px;
    height: 60px;
    font-weight: 700;
    color: #7370DA;
`;
const Th2 = styled.th`
    width: 400px;
    font-weight: 700;
    color: #5d576b;
`;
const Th3 = styled.th`
    width: 200px;
    font-weight: 700;
    color: #5d576b;
`;
const Th4 = styled.th`
    width: 200px;
    font-weight: 700;
    color: #5d576b;
`;

const Trbox = styled.tr`
    height: 98px;
    background-color: #fff;
    /* border-top: 1px solid rgba(169,169,169,0.7);
    border-bottom: 1px solid rgba(169,169,169,0.7); */
    border-top: 1px solid rgba(169,169,169,0.2);
    border-bottom: 1px solid rgba(169,169,169,0.2);
    font-size: 15px;
    text-align: center;
    transition: all 0.3s;
    
    &:hover{
        box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 4px;
        background-color: blanchedalmond;
    }
`;

const Status = styled.span`
    border: 1px solid orange;
    border-radius: 50px;
    background-color: orange;
    color: brown;
    padding: 2px 10px;
`;


export default Table; 