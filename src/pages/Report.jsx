import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faCheck,
    faTimes,
    faSearch,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const Report = () => {

    const reports = [
        {
            id: 1,
            alamat: 'Jl. Merdeka No. 45',
            kategori: 'Rusak Berat',
            status: 'pending',
        },
        {
            id: 2,
            alamat: 'Jl. Diponegoro No. 10',
            kategori: 'Rusak Ringan',
            status: 'disetujui',
        },
        {
            id: 3,
            alamat: 'Jl. Sudirman No. 88',
            kategori: 'Bagus',
            status: 'ditolak',
        },
    ];

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Laporan</h2>

                        </div>
                        <div className="relative">
                            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari alamat..."
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
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{report.alamat}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{report.kategori}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium px-2 py-1 rounded-full
                      ${report.status === 'disetujui' && 'bg-green-100 text-green-600'}
                      ${report.status === 'ditolak' && 'bg-red-100 text-red-600'}
                      ${report.status === 'pending' && 'bg-yellow-100 text-yellow-600'}`}>
                                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            {report.status === 'pending' && (
                                                <>
                                                    <button className="p-2 bg-green-100 text-green-600 hover:bg-green-200 rounded-lg transition" title="Setujui">
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                    <button className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition" title="Tolak">
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition" title="Lihat Detail">
                                                <FontAwesomeIcon icon={faEye} />
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
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
