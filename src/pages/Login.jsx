import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash,
    faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [input, setInput] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);

        let { email, password } = input;
        axios.post(`https://troto.aninyan.com/login`, { email, password })
            .then((res) => {
                toast.success(res.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setTimeout(() => {
                    let token = res.data.data.token;

                    const decoded = jwtDecode(token);

                    if (decoded.role !== 'admin') {
                        toast.error('Akses hanya untuk admin', {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                        });
                        setLoading(false)

                        return;
                    }

                    Cookies.set('token', token, { expires: 1 });
                    navigate('/');
                }, 3000);
            })
            .catch((error) => {
                console.error("Error :", error);
                toast.error(error.response.data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });

                setLoading(false)
            });
    };

    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-3xl font-bold">T</span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-2">
                            <span className="text-orange-500">Troto</span>
                            <span className="text-gray-700">Track</span>
                        </h1>
                        <p className="text-gray-600">Selamat datang kembali, Admin! Silakan masuk untuk mengelola aplikasi.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                    </div>

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={input.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>

                            <button
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                            >
                                <div
                                    type='submit'
                                    className="flex items-center justify-center"
                                    disabled={loading}
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                    Login
                                </div>
                            </button>

                            {loading && (
                                <div className="flex justify-center items-center mt-4">
                                    <div className="relative w-12 h-12">
                                        <div className="absolute inset-0 border-4 border-[#FFC100] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                            © 2025 TrotoTrack. All rights reserved.
                        </p>
                    </div>
                </div>

                <ToastContainer
                    className="absolute top-5 right-5"
                />
            </div>
        </>
    );
};

export default Login;