import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEdit,
    faTrash,
    faEye,
    faPlus,
    faSearch,
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Article = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [articlesSearch, setArticlesSearch] = useState('');
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total_data: 0
    });

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setFormData((prev) => ({
                ...prev,
                image: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const fetchData = (page = 1, search = '') => {
        setLoading(true);
        const token = Cookies.get('token');

        axios
            .get(`https://troto.aninyan.com/articles?page=${page}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setArticles(res.data.data);
                setPagination(res.data.pagination);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.response?.data?.message || "Gagal memuat artikel", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = () => {
        const token = Cookies.get('token');
        setLoadingSubmit(true);
        const payload = new FormData();
        payload.append('title', formData.title);
        payload.append('description', formData.description);
        payload.append('image', formData.image);

        axios.post('https://troto.aninyan.com/articles', payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                toast.success("Artikel berhasil ditambahkan!", { autoClose: 3000 });
                setShowModal(false);
                setFormData({ title: '', description: '', image: '' });
                fetchData();
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal menambahkan artikel", {
                    autoClose: 3000,
                });
            })
            .finally(() => {
                setLoadingSubmit(false);
            });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Konfirmasi Hapus Article',
            text: 'Apakah Anda yakin ingin menghapus article ini?',
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
                    .delete(`https://troto.aninyan.com/articles/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(() => {
                        toast.success('Artikel berhasil dihapus!', { autoClose: 3000 });
                        fetchData();
                    })
                    .catch((error) => {
                        console.error(error);
                        toast.error(error.response?.data?.message || 'Gagal menghapus artikel', {
                            autoClose: 3000,
                        });
                    });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePrev = () => {
        if (pagination.current_page > 1) {
            fetchData(pagination.current_page - 1, articlesSearch);
        }
    };

    const handleNext = () => {
        if (pagination.current_page < pagination.last_page) {
            fetchData(pagination.current_page + 1, articlesSearch);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Artikel</h2>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    onChange={(e) => setArticlesSearch(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            fetchData(1, articlesSearch);
                                        }
                                    }}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 w-80"
                                />
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-all duration-200"
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Tambah Artikel
                            </button>

                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Judul</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {articles.length > 0 ? articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                                                title="Hapus"
                                                onClick={() => handleDelete(article.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <button
                                                className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition"
                                                title="Lihat Detail"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-sm text-gray-500 py-8">
                                        Tidak ada data ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex justify-center">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handlePrev}
                            disabled={pagination.current_page === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium">
                            {pagination.current_page}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={pagination.current_page === pagination.last_page}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-xl space-y-6">
                        <h3 className="text-2xl font-bold text-gray-800">Tambah Artikel</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Judul artikel"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi / Isi Artikel</label>
                                <textarea
                                    name="description"
                                    placeholder="Isi artikel..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={10}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            {loadingSubmit ? (
                                <div className="relative w-6 h-6">
                                    <div className="absolute inset-0 border-4 border-[#FFC100] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 text-sm"
                                    >
                                        Simpan
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    );
};

export default Article;
