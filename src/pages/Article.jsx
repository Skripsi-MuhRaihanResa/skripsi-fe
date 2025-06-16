import React from 'react';
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

const Article = () => {
    const articles = [
        { id: 1, title: 'Pentingnya Perawatan Trotoar di Perkotaan' },
        { id: 2, title: 'Solusi Trotoar Rusak untuk Kota Ramah Pejalan Kaki' },
        { id: 3, title: 'Inovasi Material untuk Trotoar Tahan Lama' },
        { id: 4, title: 'Cara Pemerintah Menangani Kerusakan Trotoar' },
        { id: 5, title: 'Peran Warga dalam Melaporkan Trotoar Rusak' },
    ];

    return (
        <div className="flex-1 p-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Artikel</h2>
                            <p className="text-gray-500 mt-1">Kelola informasi artikel yang tersedia di sistem</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari artikel..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 w-80"
                                />
                            </div>
                            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-all duration-200">
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
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                className="p-2 bg-orange-100 text-orange-600 hover:bg-orange-200 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition"
                                                title="Hapus"
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
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-medium">1</span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
