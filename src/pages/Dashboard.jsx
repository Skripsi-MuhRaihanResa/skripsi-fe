import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-white rounded-2xl shadow-md border border-orange-200 px-8 py-10">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                            <span className="text-white text-xl font-bold tracking-wide">T</span>
                        </div>
                        <div className="text-3xl font-extrabold">
                            <span className="text-orange-500">Troto</span>
                            <span className="text-gray-800">Track</span>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 text-lg">
                    Halo Admin, selamat datang di halaman <span className="font-semibold text-orange-500">Dashboard TrotoTrack</span>.
                    Kelola artikel dan pantau data laporan trotoar dengan mudah di sini.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
