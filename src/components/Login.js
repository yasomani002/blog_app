import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Input, Logo } from '../components/index'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log(data, 'data')
        setError('')
        try {
            const session = await authService.login(data)
            console.log(session, 'sees')
            if (session) {
                const userData = authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                {/* logo  */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* sign in content  */}
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Login
                    </Link>
                </p>

                {/* error  */}
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* form  */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email :"
                            placeholder="Type your email"
                            type="text"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password :"
                            placeholder="Type your password"
                            type="password"
                            {...register('password', {
                                required: true,
                            })}
                        />

                        <Button
                            type='submit'
                            className="w-full"
                        >
                            Log In
                        </Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
