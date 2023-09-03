import styles from "./ManageImage.module.scss";
import classNames from "classnames/bind";
import axios from "axios";


import { useEffect, useState } from "react";
import uploadFile from "../../../../Util/upload";
import ClipLoader from "react-spinners/ClipLoader";

const cx = classNames.bind(styles);

function ManageImage() {

    let [loading, setLoading] = useState(true);
    const [bg,setBg] = useState()
    const [image,setImage] = useState()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}file/get`)
        .then(res=>{
            setBg(res.data.path)
            setImage(res.data.path)
            setLoading(false)
        })
    },[])
    const handleChange=(image)=>{
        uploadFile(image,(res)=>{
            axios.post(`${process.env.REACT_APP_SERVER_URI}file/update`,{
                path: res.data.file
            })
        })

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
            
        };
        reader.readAsDataURL(image);
    }
    return <>
        <div >
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
                <div className={cx("tittle")}>
                    MANAGE IMAGE
                </div>
                <div style={{border:"5px solid #ebdac4", display:"inline-block"}}>
                    <img src={image} width="300px" />
                </div>
                <div className={cx("btn")}>
                    <label htmlFor="file">UPLOAD IMAGE </label>
                    <input style={{display:"none"}} type="file" id = "file" onChange={e=>handleChange(e.target.files[0])}/>
                </div>
            </div>
            }
        </div>
    </>;
}

export default ManageImage;
