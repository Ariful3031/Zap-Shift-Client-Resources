import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../Hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLogin from './GoogleLogin';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


export default function Register() {
   
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { registerUser,updateUserProfile} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure =useAxiosSecure();

    const handleRegistration = (data) => {
        // console.log('after register', data.photo[0])
        const profileImage = data.photo[0]
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                

                // 1. store the image in form data
             
                const formData = new FormData()
                formData.append('image', profileImage)

                // 2. send the photo and get the url
                const image_Api_Url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Host_Key}`;
                axios.post(image_Api_Url,formData)
                    .then(res => {
                       const photoURL = res.data.data.url

                       // create user in the database
                       const userInfo ={
                        email: data.email,
                        displayName: data.name,
                        photoURL: photoURL
                       }
                       axiosSecure.post('/users',userInfo)
                       .then(res=>{
                        if(res.data.insertedId){
                            console.log('user created in the database')
                        }
                       })

                        // 3. update user profile to the firebase 
                        const userProfile ={
                            displayName : data.name,
                            photoURL : photoURL
                        }
                        updateUserProfile(userProfile)
                        .then(()=>{
                            console.log('update user done')
                            navigate(location.state || '/')
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                    })

                toast.success("Registration successful");
            })
            .catch(error => {
                console.log("Register Error:", error.message);
                toast.error(error.message);
            });
    };
    return (

        <div className="card bg-base-100 w-full max-w-sm s mx-auto hrink-0 shadow-2xl">

            <div className="card-body">
                <h1 className='text-center text-4xl font-bold text-black mt-5'>Create an Account</h1>
                <p className='text-center text-black'>Register with ZapShift</p>
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label font-semibold text-black">Name</label>
                        <input type="text" className="input" {...register('name', { required: true })} placeholder="Your Name" />
                        {errors.name?.type === "required" && <p className='text-red-500'>name is required.</p>
                        }
                        {/* Photo/ Image  */}
                        <label className="label font-semibold text-black">Photo</label>

                        <input type="file" className="file-input" {...register('photo', { required: true })} placeholder="Your Photo" />
                        {errors.name?.type === "required" && <p className='text-red-500'>Photo is required.</p>
                        }

                        {/* email */}
                        <label className="label font-semibold text-black">Email</label>
                        <input type="email" className="input" {...register('email', { required: true })} placeholder="Email" />
                        {errors.email?.type === "required" && <p className='text-red-500'>Email is required.</p>
                        }


                        {/* password */}
                        <label className="label font-semibold text-black">Password</label>
                        <input type="password" className="input" {...register('password', {
                            required: true, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
                        })} placeholder="Password" />
                        {
                            errors.password?.type === "required" && <p className='text-red-500'>password is required.</p>
                        }
                        {
                            errors.password?.type === "pattern" && <p className='text-red-500'>Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character.</p>
                        }
                        {/* button */}
                        <button className="btn btn-neutral mt-4">register</button>
                    </fieldset>
                </form>
                <GoogleLogin></GoogleLogin>
                <h1>Already have an account?<Link 
                state={location.state} 
                to='/login' className='text-red-500 underline'>Login</Link></h1>
            </div>
        </div>

    );
};
