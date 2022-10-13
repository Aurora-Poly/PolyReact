import styled from "styled-components";

function Category({title, items, border, background, position, top, left, bottom, right, width, height, color}) {
    const fields = [
        '기획/아이디어','광고/마케팅','학술','사진/영상/UCC',
        '디자인','문학/시나리오','건축/건설/인테리어','브랜드/네이밍',
        '예체능','대외활동','취업/창업','IT/SW/게임','기타'
    ];

    const targets = [
        '누구나','일반인','대학생','대학원생',
        '청소년','어린이','기타'
    ];

    const prizes = [
        '5000만원','일반인','대학생','대학원생',
    ];

    const offices = [
        '중앙정부/기관','공기업','대기업','신문/방송/언론',
        '외국계기업','지방자치단체','학교/재단/협회','중소/벤처기업',
        '학회/비영리단체','해외','기타'
    ];

    const categories = [];
    for(let i=0; i<fields.length; i++){
        categories.push({name:fields[i],value:(i+1)});
    };

    
    return(
        <CategoryContainer width={width} height={height} position={position} top={top} left={left} bottom={bottom} right={right} color={color}>
            <h2 >{title}</h2>
            <ul>
                {categories.map((c,index) => (
                    <li 
                    background={background} 
                    border={border}
                    key={index}
                    >
                        {c.name}
                    </li>
                ))}
            </ul>
        </CategoryContainer>
    )
}

Category.defaultProps = {
    width: "100%",
}

const CategoryContainer = styled.div`
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    left: ${(props)=>props.left};
    bottom: ${(props)=>props.bottom};
    right: ${(props)=>props.right};
    color: ${(props)=>props.color};

    > h2 {
        text-align: center;
        margin: 0;
        margin-bottom: 10px;
    }
    .none_title{
        display: none;
    }
    > ul {
        padding-left: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        
        > li{
            list-style-type: none;
            box-sizing: border-box;
            margin: 3px;
            padding: 2px 5px;
            border: 1px solid ${(props)=>props.border};
            background-color: ${(props)=>props.background};
            border-radius: 30px;
            font-size: 12px;
            transition: all 0.1s;

            &:hover{
                background-color: rgba(135,118,176,1);
                color: #fff;
                border: 1px solid #fff;
            }
        }
    }
`;




export default Category;