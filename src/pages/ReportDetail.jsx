import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faFileAlt, faExclamationTriangle, faThumbsUp, faMap } from '@fortawesome/free-solid-svg-icons';

const ReportDetail = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("token");

        axios.get(`https://troto.aninyan.com/reports/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setReport(res.data.data);
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
    }, [id]);

    if (loading) return <Loading />;

    if (!report) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <p className="text-red-600 text-lg font-medium">Data tidak ditemukan</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Detail Laporan</h1>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faThumbsUp} className="text-yellow-500" />
                            <span className="text-gray-600 font-medium">{report.like} Like</span>
                        </div>
                    </div>
                </div>

                {report.image && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <img
                            src={report.image}
                            alt="Bukti Laporan"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500" />
                                Informasi Lokasi
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Lokasi</div>
                                    <div className="text-gray-900 font-medium">{report.location}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Patokan Lokasi</div>
                                    <div className="text-gray-900 font-medium">{report.reference_location}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Latitude</div>
                                    <div className="text-gray-900 font-mono text-sm">{report.latitude}</div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="text-sm font-medium text-gray-500 mb-1">Longitude</div>
                                    <div className="text-gray-900 font-mono text-sm">{report.longitude}</div>
                                </div>
                            </div>
                        </div>

                        {report.description && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faFileAlt} className="text-green-500" />
                                    Deskripsi
                                </h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 leading-relaxed">{report.description}</p>
                                </div>
                            </div>
                        )}

                        {report.status === "rejected" && report.reason && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
                                <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500" />
                                    Alasan Penolakan
                                </h2>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <p className="text-red-700 leading-relaxed">{report.reason}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Laporan</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${report.status === 'Approved' ? 'bg-green-100 text-green-700' : ''}
                                        ${report.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                        ${report.status === 'Rejected' ? 'bg-red-100 text-red-700' : ''}`}>
                                        {report.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-500">Tingkat Kerusakan</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${report.status_damage === 'Heavy Damaged' ? 'bg-red-100 text-red-700' : ''}
                                        ${report.status_damage === 'Light Damaged' ? 'bg-yellow-100 text-yellow-700' : ''}
                                        ${report.status_damage === 'Good' ? 'bg-green-100 text-green-700' : ''}`}>
                                        {report.status_damage}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t">
                                    <span className="text-sm font-medium text-gray-500">Tanggal Laporan</span>
                                    <span className="text-sm text-gray-700 font-medium">
                                        {new Date(report.created_at).toLocaleDateString("id-ID", {
                                            day: "2-digit", month: "long", year: "numeric"
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi</h3>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${report.latitude},${report.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                <FontAwesomeIcon icon={faMap} />
                                Lihat Lokasi di Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportDetail;