import styles from "./ManagePost.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import ClipLoader from "react-spinners/ClipLoader";
import { FiDelete } from "react-icons/fi";
import { BsFillPlayCircleFill, BsFillPlusCircleFill } from "react-icons/bs"

const cx = classNames.bind(styles);

function ManagePost() {
    const postD ={
        tittle: "",
        warranty: [],
        noAccept:[]


    }
    const [post,setPost] = useState(postD)
    let [loading, setLoading] = useState(true);


    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}post/get`)
        .then(res=>{
            setPost(res.data)
            setLoading(false)
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
    const handleDelete = (key,index)=>{
        const a  = post[key]
        const newList = a.filter((_, i) => i !== index);
        setPost({
            ...post,
            [key]: newList
        })
    }

    const handleAddRow = (key)=>{
        const a = post[key]
        a.push("")
        setPost({
            ...post,
            [key]: a
        })
    }
    const handleSave=()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URI}post/update`,post)
        toast.success('Saved!', {
            position: 'top-right',
            autoClose: 2000, // Thời gian thông báo tự đóng (ms)
        });
    }

    return <>
    {
        loading?
        <div className={cx("loading")}> 
        <ClipLoader
            color={"#c1a666"}
            loading={loading}
            size={100}     
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        </div>
        :
        <div className={cx('container')}>
            <div style={{fontSize:'20px',fontWeight:"500",margin:"10px 30px"}}>MANAGE POST</div>
            <div className={cx("checking")}>
                <div className={cx("list")}>
                    <div className={cx("abs")} style={{display:"flex",margin:"30px 100px",color:"#d09812"}}>WARRANTY CONDITIONS</div>
                    <div className={cx("content")}>
                        <div className={cx("tittle")}>
                            <input value={post.tittle} onChange={(e)=>{handleChange("tittle",e.target.value)}}/>
                        </div>
                        {post.warranty.map((e,i)=>{
                            return (
                                <div className={cx("inp")} key={i}>
                                    <div>
                                        <div className={cx("dot")}>
                                            <p></p>
                                        </div>
                                    </div>
                                    <input value={e} onChange={e=>handleChange("warranty",e.target.value,i)}/>
                                    <div className={cx("delete")} onClick={()=>handleDelete("warranty",i)}>
                                        <FiDelete color="#d09812" size ="20" cursor="pointer"/>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{marginLeft:"32px",color:"#d09812",cursor:"pointer"}} onClick={()=>handleAddRow("warranty")}>
                            <BsFillPlusCircleFill size="20"/> Add row
                        </div>
                    </div>
                    
                </div>

                <div className={cx("list")}>
                    <div className={cx("abs")}  style={{display:"flex",margin:"30px 100px",color:"#d09812"}}> NO ACCEPTANCE FOR  </div> 
                    <div className={cx("content")}>
                        {post.noAccept.map((e,i)=>{
                            return (
                                <div className={cx("inp")} key={i}>
                                    <div>
                                        <div className={cx("dot")}>
                                            <p></p>
                                        </div>
                                    </div>
                                    <input value={e} onChange={e=>handleChange("noAccept",e.target.value,i)}/>
                                    <div className={cx("delete")} onClick={()=>handleDelete("noAccept",i)}>
                                        <FiDelete color="#d09812" size ="20" cursor="pointer"/>
                                    </div>
                                </div>
                            )
                        })}
                        <div style={{marginLeft:"32px",color:"#d09812",cursor:"pointer"}} onClick={()=>handleAddRow("noAccept")}>
                            <BsFillPlusCircleFill  size ="20"/> Add Row
                        </div>
                    </div>
                </div>

            </div>
            <div className={cx("edit-btn")} onClick={handleSave}>
                    Save
            </div>
        </div>
    }
    </>;
}

export default ManagePost;
