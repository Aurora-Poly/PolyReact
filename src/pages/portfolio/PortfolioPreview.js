import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../elements/Button";
import Card from "../../elements/Card";
import Grid from "../../elements/Grid";
import styles from "./PortfolioPreview.module.css";

function PortfolioPreview(){
    const [posts, setPosts] = useState([]);
    const getPosts = async ()=> {
        const response = await axios.get('http://ec2-43-201-75-218.ap-northeast-2.compute.amazonaws.com:8080/portfolio/',
            { headers : { Authorization: `Token ${localStorage.getItem('token')}` }}
        );
        setPosts(response.data.results);
    }

    const p = posts.map((post,index) =>(
        <Card key={index}
        width="250px" 
        height="300px"
        pk={post.pk}
        title={post.title}
        titlesize="20px"
        date={post.date}
        desc={post.content}
        src={post.image==null||""? "/img/blank-profile.png" : post.image.image}/>
    )).slice(0,3);

    useEffect(()=>{
        getPosts();
    },[])

    return(
        <div className={styles.parentContainer}>
            <div className={styles.textContainer}>
                <h1>{localStorage.getItem('username')}님의 더 많은 작품으로 포트폴리오를 채워보세요.</h1>
            </div>

            <Grid col="3" row="1" colgap="10px" width="860px" height="400px" margin="15px auto" position="relative" top="50px">   
                {/* {p} */}
                <div className={styles.cardContainer}>
                    <div className={styles.imageContainer}></div>
                    <div>
                        <h2 className={styles.title}>제목이 들어가는 곳</h2>
                        <p className={styles.content}>내용이 들어가는 곳</p>
                    </div>
                </div>

                <div className={styles.cardContainer}>
                    <div className={styles.imageContainer}></div>
                    <div>
                        <h2 className={styles.title}>제목이 들어가는 곳</h2>
                        <p className={styles.content}>내용이 들어가는 곳</p>
                    </div>
                </div>

                <div className={styles.cardContainer}>
                    <div className={styles.imageContainer}></div>
                    <div>
                        <h2 className={styles.title}>제목이 들어가는 곳</h2>
                        <p className={styles.content}>내용이 들어가는 곳</p>
                    </div>
                </div>


            </Grid>
            <Button
                width="240px"
                height="50px"
                fontsize="15px"
                text="관리페이지로 이동" 
                href="/mypage"
                position="relative"
                top="20px"
            />
        </div>
    )
}



export default PortfolioPreview;