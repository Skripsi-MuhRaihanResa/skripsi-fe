import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronLeft, faChevronRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
    const [loading, setLoading] = useState(true);
    const [usersSearch, setUsersSearch] = useState('');
    const [users, setUsers] = useState([]);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total_data: 0
    });

    const fetchData = (page = 1, search = '') => {
        setLoading(true);
        const token = Cookies.get('token');

        axios
            .get(`https://troto.aninyan.com/users?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUsers(res.data.data);
                setPagination(res.data.pagination);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response?.data?.message || "error", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (usersId) => {
        Swal.fire({
            title: 'Konfirmasi Hapus User',
            text: 'Apakah Anda yakin ingin menghapus user ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = Cookies.get('token');

                axios
                    .delete(`https://troto.aninyan.com/users/${usersId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => {
                        toast.success(
                            response.data.message || 'Hapus user berhasil',
                            {
                                position: 'top-center',
                                autoClose: 3000,
                                hideProgressBar: true,
                            }
                        );

                        setTimeout(() => {
                            fetchData(usersPagination.current_page, usersSearch);
                        }, 1000);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        toast.error(
                            error.response?.data?.message || 'error',
                            {
                                position: 'top-center',
                                autoClose: 3000,
                                hideProgressBar: true,
                            }
                        );
                    });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePrevPage = () => {
        if (usersPagination.current_page > 1) {
            fetchData(usersPagination.current_page - 1, usersSearch);
        }
    };

    const handleNextPage = () => {
        if (usersPagination.current_page < usersPagination.last_page) {
            fetchData(usersPagination.current_page + 1, usersSearch);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Pengguna</h2>
                        </div>
                        <div className="relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari pengguna..."
                                value={usersSearch}
                                onChange={(e) => setUsersSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        fetchData(1, usersSearch);
                                    }
                                }}
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 w-80"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-medium">
                                                    {user.name?.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                                                title="Delete"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={pagination.current_page === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium">
                            {pagination.current_page}
                        </span>
                        <button
                            onClick={handleNextPage}
                            disabled={pagination.current_page === pagination.last_page}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    );
};

export default User;
