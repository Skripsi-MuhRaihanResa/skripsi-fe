import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-white text-center p-6">
            <div className="animate-bounce mb-6 text-orange-500">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl" />
            </div>

            <h1 className="text-6xl font-extrabold text-orange-500 mb-2">404</h1>
            <p className="text-xl text-gray-700 mb-4">Oops! Halaman tidak ditemukan</p>
            <p className="text-gray-500 mb-6 max-w-md">
                Halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak pernah ada.
            </p>

            <Link
                to="/"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-200"
            >
                Kembali ke Beranda
            </Link>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            </div>
        </div>
    );
};

export default NotFound;
