import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import {  AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const cx = classNames.bind(styles);

function Table() {

    const [list,setList] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}/user/get-all?page=1`)
        .then(res=>{
            console.log(res.data)
            setList(res.data.list)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const navigate = useNavigate()

    const handleEdit = (id)=>{
        console.log(id)
        navigate(`/manage-customer/edit/${id}`)
    }
    const handleAdd = ()=>{
        navigate('/manage-customer/new-customer')
    }
    return <>
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx("tittle")}>MANAGE CUSTOMER</div>
                <div style={{display:"flex",flexDirection:"row",padding:"10px 30px"}}>
                    <div className={cx("tittle")}>LIST OF CUSTOMERS</div>
                    <div style={{color:"white",backgroundColor:"#c70039",cursor:"pointer", padding:"5px 10px",borderRadius:"20px"}} onClick={handleAdd}>
                        <AiFillPlusCircle size={"20"} />
                        Add
                    </div>
                </div>
                <div className={cx("table")}>
                    <div className={cx("element")}>
                        <div className={cx("row-tb")}>
                            
                            <div className={cx("h")}>NO.</div>
                            <div className={cx("r")}>ID</div>
                            <div className={cx("r")}>NAME</div>
                            <div className={cx("r")}>DATE START</div>
                            <div className={cx("h")}>ACTION</div>
                        </div>
                        <div className={cx("horizontal-line")}></div>
                    </div>

                    {
                        list?.map((e,index)=>{
                            return (
                                <div  key={e.id} className={cx("element")}>
                                <div className={cx("row-tb")}>
                                    
                                    <div className={cx("h")}>{index+1}</div>
                                    <div className={cx("r")}>{e.id}</div>
                                    <div className={cx("r")}>{e.nameCustomer}</div>
                                    <div className={cx("r")}>{e.startDate}</div>
                                    <div className={cx("h")}>
                                        <AiFillEdit size={"20"} color="#c70039" style={{margin:"5px", cursor:"pointer"}} onClick={()=>{handleEdit(e.id)}}/>
                                    </div>
                                </div>
                                <div className={cx("horizontal-line")}></div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </>;
}

export default Table;
