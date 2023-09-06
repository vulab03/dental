import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { AiFillPhone, AiOutlineMail, AiTwotoneHome } from 'react-icons/ai'
import axios from 'axios';

const cx = classNames.bind(styles);

const Footer = () => {
    const [footer,setFooter] = useState()

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}company/get`)
        .then(res=>{
        setFooter(res.data)
        })
    },[])
    return (

        <div className={cx('footer')}>
            <div className={cx('footer-content')}>
                <div className="container">
                    <div className='row'>                        
                        <div className="col-md-3">
                        </div>
                        <div className={cx("col-md-6","content")}>
                            <div className={cx("name","row")} style={{fontWeight:"500"}}>
                            VU DENTAL LABORATORY
                            </div>
                            <div className={cx("horizontal-line")}></div>
                            <div className='row' style={{fontWeight:"400",maxWidth:"600px", display:"flex", flexDirection:"row"}}>
                                <div className='column'>
                                    <AiTwotoneHome size={20} color="black" style={{marginRight:"5px"}}/>
                                    <span>{footer?.address}</span>                            
                                </div>
                            </div>
                            <div style={{display:"flex", flexDirection:"row", fontWeight:"400"}}>
                                <div className='column' style={{marginRight:"50px"}}>
                                    <AiFillPhone size={20} color='black' style={{marginRight:"row"}}/>
                                    {footer?.hotline}
                                </div>
                                <div className='column'>
                                    <AiOutlineMail size={20} color='black' style={{marginRight:"row"}}/>
                                    {footer?.email}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
                </div>
            </div>
        </div>
            

    );
};

export default Footer;
