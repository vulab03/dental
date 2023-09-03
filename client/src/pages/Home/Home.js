import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import logo from '../../assets/images/logo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";


const cx = classNames.bind(styles);

const CHECKING = "checking";
const POLICY = "policy";
const NO_RESULT = "no-result";

function Home() {

    const [input,setInput] = useState('')
    const [search,setSearch] = useState(false)

    const [state,setState] = useState()

    const [customer,setCustomer] = useState({})

    const [policy,setPolicy] = useState()

    const handleSearch = ()=>{
        setSearch(true);
        axios.get(`${process.env.REACT_APP_SERVER_URI}user/find-id?id=${input}`)
        .then(res=>{
            setCustomer(res.data.user)
            setState(CHECKING)
        })
        .catch(err=>{
            setState(NO_RESULT)   
        })
        console.log(input);
    }

    const handleChecking = ()=>{
        setState(CHECKING)
    }
    const handlePolicy = ()=>{
        if (!policy){
            axios.get(`${process.env.REACT_APP_SERVER_URI}post/get`)
            .then(res=>{
                setPolicy(res.data)
            })
        }
        setState(POLICY)
    }

    return (<>

            <div className={cx("content",search&&"opacity")}>
                <div className={cx("column")}>

                <div className={cx("row","logo")} >
                    <img src={logo} width="200px" height="200px"/>
                </div>
                <div className={cx("search")}>
                    { 
                    !search || state === NO_RESULT 
                    ? <label style={{color: state===NO_RESULT?"black":"white"}}>Enter ID code to check warranty information</label>
                    
                    : <div className={cx("option")}>
                        <div className={cx("opt",state===CHECKING? "active":"unactive")} onClick={handleChecking}>CHECKING WARRANTY</div>
                        <div className={cx("opt",state===POLICY?"active":"unactive")} onClick={handlePolicy}>WARRANTY POLICY</div>
                    </div>
                
                }
                    <div className={cx("wrap-s")}>
                        <input value={input} placeholder="ID code" onChange={(e)=>{setInput(e.target.value)}}></input>
                        <AiOutlineSearch size="30"  style={{cursor:"pointer"}} onClick={handleSearch}/>
                    </div>
                </div>
                <div className={cx("row","result")}>
                    {
                        search && state === CHECKING ?
                        <div className={cx("checking")}>
                            <div className="customer-info">
                                <div style={{display:"flex",justifyContent:"center",margin:"5px 0"}}>CUSTOMER INFORMATION</div>
                                <div className={cx("row")}>
                                    <div className="column" style={{marginRight:"10px"}}>
                                        Dental Clinic: {customer?.dental}
                                        <br/>
                                        Customer Name: {customer?.nameCustomer} <br/>
                                        Age: {customer?.age} <br/>
                                        Phone: {customer?.phone} <br/>
                                        Address: {customer?.address} 
                                    </div>
                                    <div className="column">Address: {customer?.addressDental}</div>
                                </div>
                            
                            </div>

                            <div className="service-info">
                            <div style={{display:"flex",justifyContent:"center",margin:"5px 0"}}> SERVICE INFORMATION </div> 
                            Service Name: {customer?.nameService} <br/> 
                            Position: {customer?.position} <br/>
                            Country of Manufacture: {customer?.country} <br/>
                            Date of Start: {customer?.startDate} <br/>
                            Expire Date: {customer?.expireDate} <br/> 
                            </div>

                        </div>
                        :search && state === NO_RESULT
                        ?<span>No results match. Try with another id code.</span>
                        : search && state === POLICY
                        ?<div>
                            <div className={cx("checking")}>
                            <div classname={cx("listcondition")}>
                                <div style={{display:"flex",justifyContent:"center",margin:"5px 0",color:"#d09812"}}>WARRANTY CONDITIONS</div>
                                <div>{policy?.tittle}</div>
                                <ul>
                                    {policy?.warranty?.map((e,i)=>{
                                        return (<li key = {i}>{e}</li>)
                                    })}
                                </ul>

                            
                            </div>

                            <div className="service-info">
                            <div style={{display:"flex",justifyContent:"center",margin:"5px 0",color:"#d09812"}}> NO ACCEPTANCE FOR  </div> 
                                <ul>
                                    {policy?.noAccept?.map((e,i)=>{
                                        return (<li key = {i}>{e}</li>)
                                    })}
                                </ul>
                            </div>

                        </div>
                        </div>
                        :""
                    }
                </div>
                </div>

            </div>
    </>);
}

export default Home;
