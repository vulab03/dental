import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import {useForm} from 'react-hook-form'
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"

const cx = classNames.bind(styles);

function Login() {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();


    const onSubmit = (user) => {
        axios.post(`${process.env.REACT_APP_SERVER_URI}admin/login`,user)
        .then(res=>{
            console.log(res.data)
            if (res.data.isAdmin){
                navigate('/manage-customer')
                localStorage.setItem("isAdmin",true)
            }
            else {
                toast.error('Login failed!', {
                    position: 'top-right',
                    autoClose: 2000, // Thời gian thông báo tự đóng (ms)
                });
            }
        })
        .catch(err=>{
            toast.error('Login failed!', {
                position: 'top-right',
                autoClose: 2000, // Thời gian thông báo tự đóng (ms)
            });
        })
    }

    return <>
        <div className={cx("content")}>

                <img src = {logo} width="250px"/>
            <div className={cx("login")}>
                <div className={cx("tittle")}> WELCOME TO ADMIN DASHBOARD </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <label>Tài khoản</label> */}
                        <div className={cx('input-error')}>
                            <input placeholder="account" {...register('account', { required: true, minLength: 5 })} />
                            <p>
                                {errors.account?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.account?.type === 'minLength'
                                    ? 'User phải có từ 5 kí tự'
                                    : ''}
                            </p>
                        </div>
                        {/* <label>Mật khẩu</label> */}
                        <div className={cx('input-error')}>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: true, minLength: 5 })}
                            />
                            <p>
                                {errors.password?.type === 'required'
                                    ? 'Không được bỏ trống'
                                    : errors.password?.type === 'minLength'
                                    ? 'Mật khẩu phải có từ 5 kí tự'
                                    :errors.password?.type==='errorPassword'
                                    ? "Sai tài khoản hoặc mật khẩu"
                                    : ''}
                            </p>
                        </div>
                        <div style={{display: "flex",justifyContent:"center"}}>
                        <button className={cx('submit')} type="submit">
                            LOGIN
                        </button>
                        </div>

                    </form>
            </div>
        </div>
    </>;
}

export default Login;
