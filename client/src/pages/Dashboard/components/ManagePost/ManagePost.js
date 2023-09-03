import styles from "./ManagePost.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"

const cx = classNames.bind(styles);

function ManagePost() {
    const postD ={
        tittle: "",
        warranty: [],
        noAccept:[]


    }
    const [post,setPost] = useState(postD)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}/post/get`)
        .then(res=>{
            setPost(res.data)
        })
    },[])

    const handleChange = (key,value,index="a") =>{
        if (index ==="a"){
            setPost({...post,[key]:value})
            return;
        }
        const a = post[key]
        a[index] = value
        setPost({...post,
            [key]:a
        })
    }

    const handleSave=()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URI}/post/update`,post)
        toast.success('Saved!', {
            position: 'top-right',
            autoClose: 2000, // Thời gian thông báo tự đóng (ms)
        });
    }

    return <>
        <div className={cx('container')}>
            <div style={{fontSize:'20px',fontWeight:"500",margin:"10px 30px"}}>MANAGE POST</div>
            <div className={cx("checking")}>
                <div classname={cx("listcondition")}>
                    <div style={{display:"flex",margin:"30px 100px",color:"#d09812"}}>WARRANTY CONDITIONS</div>
                    <div>
                        <div className={cx("tittle")}>
                            <input value={post.tittle} onChange={(e)=>{handleChange("tittle",e.target.value)}}/>
                        </div>
                        {post.warranty.map((e,i)=>{
                            return (
                                <div className={cx("inp")} key={i}>
                                    <input value={e} onChange={e=>handleChange("warranty",e.target.value,i)}/>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>

                <div class="service-info">
                <div style={{display:"flex",margin:"30px 100px",color:"#d09812"}}> NO ACCEPTANCE FOR  </div> 
                    <div>
                        {post.noAccept.map((e,i)=>{
                            return (
                                <div className={cx("inp")} key={i}>
                                    <input value={e} onChange={e=>handleChange("noAccept",e.target.value,i)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className={cx("edit-btn")} onClick={handleSave}>
                    Save
            </div>
        </div>
    </>;
}

export default ManagePost;
