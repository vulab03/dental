import styles from "./ManageImage.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

import bg from "../../../../assets/images/bg.jpg"

import { useState } from "react";

const cx = classNames.bind(styles);

function ManageImage() {


    const [image,setImage] = useState(bg)
    const handleChange=(image)=>{
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(image);
    }
    return <>
        <div className={cx('container')}>
            <div className={cx("tittle")}>
                MANAGE IMAGE
            </div>
            <div style={{border:"5px solid #ebdac4", display:"inline-block"}}>
                <img src={image} width="300px" />
            </div>
            <div className={cx("btn")}>
                <label for="file">UPLOAD IMAGE </label>
                <input style={{display:"none"}} type="file" id = "file" onChange={e=>handleChange(e.target.files[0])}/>
            </div>
        </div>
    </>;
}

export default ManageImage;
