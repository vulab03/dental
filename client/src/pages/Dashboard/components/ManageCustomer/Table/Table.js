import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import {  AiFillCaretLeft, AiFillCaretRight, AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


const cx = classNames.bind(styles);

function Table() {
    let [loading, setLoading] = useState(true);
    const LIMIT = 8;
    const [list,setList] = useState([])
    const [amount,setAmount] = useState([])
    const [activePage,setActive] = useState(1)
    const [search,setSearch] = useState("")
    const [back,setBack] = useState(false)

    useEffect(()=>{
        
        !back&&axios.get(`${process.env.REACT_APP_SERVER_URI}user/get-all?page=${activePage}`)
        .then(res=>{
            console.log(res.data)
            setList(res.data.list)
            setAmount(parseInt(res.data.amount/LIMIT) +1)
            console.log(Math.floor(res.data.amount/LIMIT) +1)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
        })
    },[activePage,back])

    const navigate = useNavigate()

    const handleEdit = (id)=>{
        console.log(id)
        navigate(`/manage-customer/edit/${id}`)
    }
    const handleAdd = ()=>{
        navigate('/manage-customer/new-customer')
    }
    const handleSeacrh=()=>{
        setAmount(0)
        setBack(true)
        axios.get(`${process.env.REACT_APP_SERVER_URI}user/get-phone?phone=${search}`)
        .then(res=>{
            setList(res.data.list)
            if(res.data.list.length===0)
                {
                    axios.get(`${process.env.REACT_APP_SERVER_URI}user/find-id?id=${search}`)
                .then(res=>{
                    setList([res.data.user])
                })
                .catch(err=>{
                    setList([])
                })
            }
            setLoading(false)
        })
        .catch(err=>{
            

        })
        
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
            <div className={cx('content')}>
                <div className={cx("tittle")}>MANAGE CUSTOMER</div>
                <div style={{display:"flex",flexDirection:"row",padding:"10px 30px"}}>
                    <div className={cx("tittle")}>LIST OF CUSTOMERS</div>
                    <div className={cx("search")} >
                        <input value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                        <div style={{color:"white",backgroundColor:"#c70039",cursor:"pointer",marginLeft:"10px", padding:"5px 10px",borderRadius:"20px"}} onClick={handleSeacrh}>
                        Search
                        </div>
                        {back
                        &&<div 
                            style={{textDecoration:"underline",color:"red",cursor:"pointer",marginLeft:"10px", padding:"5px 10px",borderRadius:"20px"}} 
                            onClick={()=>{setBack(false); setSearch("")}}>
                        Back
                        </div>}
                    </div>
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
                        list.length===0 ? 
                        <div className={cx("no-result")}>*No result match</div>
                        :list?.map((e,index)=>{
                            return (
                                <div  key={e.id} className={cx("element")}>
                                <div className={cx("row-tb")}>
                                    
                                    <div className={cx("h")}>{index+1+LIMIT*(activePage-1)}</div>
                                    <div className={cx("r")}>{e.id}</div>
                                    <div className={cx("r")}>{e.nameCustomer}</div>
                                    <div className={cx("r")}>{e.startDate}</div>
                                    <div className={cx("h")} style={{paddingLeft:"20px"}}>
                                        <AiFillEdit size={"20"} color="#c70039" style={{margin:"5px", cursor:"pointer"}} onClick={()=>{handleEdit(e.id)}}/>
                                    </div>
                                </div>
                                <div className={cx("horizontal-line")}></div>
                            </div>
                            )
                        })
                    }
                </div>
                <div className={cx("change-page")}>
                    
                    {
                    
                    amount <6 ?[...Array(amount)].map((_,i)=>{
                        return (<>
                            <div key ={i} className={cx("page",i+1===activePage&&"active")} onClick={()=>{
                                activePage!==i+1 &&setActive(i+1)
                                activePage!==i+1 &&setLoading(true)
                            }}>
                            {i+1}
                            </div>
                        
                        </>) 
                    })
                    :   
                    <div style={{display:"flex",flexDirection:"row"}}>
                        {activePage!==1&&<div style={{padding:"10px",cursor:"pointer"}} onClick={()=>{setActive(activePage-1);setLoading(true)}}>
                            <AiFillCaretLeft size="40" color="#c70039"/>
                        </div>}
                        <div className={cx("page")} onClick={()=>{
                            setActive(activePage+1)
                            setLoading(true)
                        }}>
                            {activePage}
                        </div>
                        {activePage!==amount+1&&<div style={{padding:"10px",cursor:"pointer"}} onClick={()=>{setActive(activePage+1);setLoading(true)}}>
                            <AiFillCaretRight size="40" color="#c70039"/>
                        </div>}
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    }
    </>;
}

export default Table;
