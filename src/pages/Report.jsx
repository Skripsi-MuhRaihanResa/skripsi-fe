import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faCheck,
    faTimes,
    faSearch,
    faChevronLeft,
    faChevronRight,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reportsSearch, setReportsSearch] = useState('');
    const navigate = useNavigate();

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total_data: 0
    });

    const fetchData = (page = 1, searchTerm = '') => {
        setLoading(true);
        const token = Cookies.get('token');

        axios.get(`https://troto.aninyan.com/reports?page=${page}&search=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setReports(res.data.data);
                setPagination(res.data.pagination);
            })
            .catch((error) => {
                console.error(error);
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

    const handleUpdateStatus = (id, newStatus) => {
        Swal.fire({
            title: `Ubah status menjadi ${newStatus}`,
            input: 'text',
            inputLabel: 'Alasan perubahan status',
            inputPlaceholder: 'Masukkan alasan di sini...',
            inputValidator: (value) => {
                if (!value) {
                    return 'Alasan wajib diisi';
                }
            },
            showCancelButton: true,
            confirmButtonText: 'Kirim',
            cancelButtonText: 'Batal',
            icon: 'question',
        }).then((result) => {
            if (result.isConfirmed) {
                const reason = result.value;
                const token = Cookies.get("token");

                axios.patch(`https://troto.aninyan.com/reports/${id}/status`, {
                    status: newStatus,
                    reason: reason,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then((res) => {
                        toast.success(res.data?.message || "Update status berhasil", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                        });
                        fetchData();
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        toast.error(error.response?.data?.message || "error", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                        });
                    });
            }
        });
    };

    const handleDeleteReport = (id) => {
        Swal.fire({
            title: 'Konfirmasi Hapus Report',
            text: "Apakah Anda yakin ingin menghapus report ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                const token = Cookies.get("token");

                axios.delete(`https://troto.aninyan.com/reports/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then((res) => {
                        toast.success(res.data?.message || "Laporan berhasil dihapus", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                        });

                        fetchData();
                    })
                    .catch((error) => {
                        console.error("Gagal hapus:", error);
                        toast.error(error.response?.data?.message || "Gagal menghapus laporan", {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
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
            fetchData(pagination.current_page - 1, reportsSearch);
        }
    };

    const handleNext = () => {
        if (pagination.current_page < pagination.last_page) {
            fetchData(pagination.current_page + 1, reportsSearch);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Laporan</h2>
                        <div className="relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari alamat..."
                                onChange={(e) => setReportsSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        fetchData(1, reportsSearch);
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
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Alamat</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {reports.length > 0 ? reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{report.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        {new Date(report.created_at).toLocaleDateString('id-ID', {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`text-sm font-medium px-2 py-1 rounded-full
                                            ${report.status_damage === 'Heavy Damaged' && 'bg-red-100 text-red-600'}
                                            ${report.status_damage === 'Light Damaged' && 'bg-yellow-100 text-yellow-600'}
                                            ${report.status_damage === 'Good' && 'bg-green-100 text-green-600'}
                                            `}
                                        >
                                            {report.status_damage.charAt(0).toUpperCase() + report.status_damage.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium px-2 py-1 rounded-full
                                            ${report.status === 'Approved' && 'bg-green-100 text-green-600'}
                                            ${report.status === 'Rejected' && 'bg-red-100 text-red-600'}
                                            ${report.status === 'Pending' && 'bg-yellow-100 text-yellow-600'}`}>
                                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {report.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className="p-2 bg-green-100 text-green-600 hover:bg-green-200 rounded-lg transition"
                                                        title="Setujui"
                                                        onClick={() => handleUpdateStatus(report.id, "approved")}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>

                                                    <button
                                                        className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                                                        title="Tolak"
                                                        onClick={() => handleUpdateStatus(report.id, "rejected")}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>

                                                </>
                                            )}
                                            <button
                                                onClick={() => navigate(`/reports/${report.id}`)}
                                                className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition"
                                                title="Lihat Detail"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                            <button
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                                                title="Hapus Laporan"
                                                onClick={() => handleDeleteReport(report.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
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

            <ToastContainer
                className="absolute top-5 right-5"
            />
        </div>
    );
};

export default Report;
