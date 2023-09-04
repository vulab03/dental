import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import { AiFillPhone, AiTwotoneHome } from 'react-icons/ai'

const cx = classNames.bind(styles);

const Footer = () => {
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
                                    <span>638/10 Le Hong Phong, 10 Ward, 10 District, Ho Chi Minh City</span>                            
                                </div>
                            </div>
                            <div className='row' style={{fontWeight:"400"}}>
                                <div className='column'>
                                    <AiFillPhone size={20} color='black' style={{marginRight:"row"}}/>
                                    0962624448
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
