import React, { useContext, useState } from 'react'
import './register.css'
import {Link, useNavigate} from 'react-router-dom'

import imgRes from '../../assets/image-register.jpg'
import imgUser from '../../assets/Create.png'

// import { AuthContext } from '../../context/AuthContext'
import { AuthContext } from '../../Context/AuthContext'
import NavbarTwo from '../../Components/Common/NavbarTwo/NavbarTwo'
import axios from 'axios'
import {Form} from 'reactstrap'
import { BASE_URL } from '../../Components/Utils/config'

const Register = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [credentials, setCredentials] = useState({
    lastFirstName: undefined,
    email: undefined,
    password: undefined,
    userName: undefined,
    date: undefined,
    phone: undefined,
    gender: undefined,
    address: undefined,
    avatar: undefined
  })

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value }))
  }

  const handleFileChange = async(e) => {
    try{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post(`${BASE_URL}/upload/image`, formData);
        const imageUrl = response.data.url;
        console.log(imageUrl)
        setSelectedFile(imageUrl);
        setCredentials(prevCredentials => ({
              ...prevCredentials,
              avatar: imageUrl,
            }));
        setIsImageUploaded(true);
        console.log(credentials.avatar);
    }catch(err){
         console.error('Error uploading image:', err.message);
    }
  };
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!isImageUploaded) {
      alert('Please upload the image first.');
      return;
    }
    try{
      const res = await fetch(`${BASE_URL}/users/auth/register`, {
        method: 'post',
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const result = await res.json()
      if(!res.ok){
        alert(result.message)
        navigate('/register')
      }else if(res.ok){
        alert("Tao tai khoan than cong")
        dispatch({type:'REGISTER_SUCCESS'})
        navigate('/login')
      }

    }catch(error){
      alert(error.message)
    }
  }
  return (
    <div className='Register d-flex flex-row justify-content-between'>
      <div className='infor-register d-flex flex-column'>
        <p className='fs-2 fw-bold'>Đăng ký</p>
        <Form onSubmit={handleSubmit} className='d-flex flex-column'>
          <div className='infor d-flex flex-row'>

            <div className='infor-01 d-flex flex-column'>
              <img src={selectedFile}/>
              <input className='file form-control-sm' type="file"
               onChange={handleFileChange}
               required id='avatar'
              ></input>
              <input className="form-control name" type="text" placeholder="Họ và tên"
               onChange={handleChange}
               required id='lastFirstName'
               ></input>
              <div className='date-gender d-flex flex-row justify-content-between'>
                <input className="form-control date" type="date" placeholder="Ngày sinh"
                onChange={handleChange}
                required id='date'
                ></input>
                <select className="form-select" aria-label="Default select example" placeholder='Giới tính'
                onChange={handleChange}
                required id='gender'
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              <input class="form-control name" type="text" placeholder="Số điện thoại"
              onChange={handleChange}
              required id='phone'
              ></input>
            </div>
            <div className='infor-02 d-flex flex-column'>
              <input className="form-control" type="text" placeholder="Địa chỉ"
              onChange={handleChange}
              required id='address'
              ></input>
              <input className="form-control" type="text" placeholder="Email"
              onChange={handleChange}
              required id='email'
              ></input>
              <input className="form-control" type="text" placeholder="Tên người dùng"
              onChange={handleChange}
              required id='userName'
              ></input>
              <input className="form-control" type="password" placeholder="Mật khẩu"
              onChange={handleChange}
              required id='password'
              ></input>
              <input className="form-control" type="password" placeholder="Nhập lại mật khẩu"></input>
            </div>
          </div>

          <div className='footer-res d-flex flex-column align-items-center'>
            <button type='submit' className='btn btn-primary fs-5 fw-bold'>
              Đăng ký
            </button>
            <p className='fs-6 fw-bold'>Tài khoản của bạn đã sẵn sàng, <Link to='/login'>Đăng nhập</Link></p>
          </div>
        </Form>

      </div>
      <div className='image-register d-flex align-items-center'>
        <img src={imgRes}/>
      </div>
    </div>
  )
}

export default Register
