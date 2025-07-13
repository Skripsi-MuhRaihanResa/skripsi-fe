import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const FeatureCard = ({ icon, title, description, color, bgColor }) => (
        <div className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer`}>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white bg-opacity-20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="relative z-10">
                <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl ${color} bg-opacity-20`}>
                        <i className={`${icon} text-3xl ${color}`}></i>
                    </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );

    const QuickActionButton = ({ icon, label, color, bgColor, onClick }) => (
        <button
            onClick={onClick}
            className={`${bgColor} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group w-full text-left`}
        >
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
                    <i className={`${icon} text-2xl ${color} group-hover:scale-110 transition-transform duration-200`}></i>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{label}</h4>
                    <p className="text-sm text-gray-600">Klik untuk mengakses</p>
                </div>
            </div>
        </button>
    );

    const formatTime = (date) => {
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="relative overflow-hidden px-8 py-16 shadow-xl" style={{
                background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)'
            }}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translate(144px, -144px)'
                }}></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10" style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translate(-112px, 112px)'
                }}></div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl" style={{
                                background: 'rgba(255, 255, 255, 0.25)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}>
                                <span className="text-white text-3xl font-bold">T</span>
                            </div>
                            <div>
                                <div className="text-5xl font-extrabold mb-2">
                                    <span className="text-white">Troto</span>
                                    <span className="text-orange-100">Track</span>
                                </div>
                                <p className="text-orange-100 text-lg">Admin Dashboard</p>
                            </div>
                        </div>
                        <div className="text-right text-white">
                            <div className="text-3xl font-bold mb-1">{formatTime(currentTime)}</div>
                            <div className="text-orange-100">{formatDate(currentTime)}</div>
                        </div>
                    </div>

                    <div className="rounded-2xl p-8 max-w-4xl" style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        <div className="flex items-center mb-4">
                            <i className="fas fa-sparkles text-2xl text-white mr-3"></i>
                            <h1 className="text-2xl font-bold text-white">Selamat Datang, Admin!</h1>
                        </div>
                        <p className="text-white text-lg leading-relaxed">
                            Kelola sistem TrotoTrack dengan mudah. Pantau laporan trotoar,
                            atur konten artikel, dan kelola pengguna dalam satu dashboard yang terintegrasi.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Feature Cards */}
                <div className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
                        <p className="text-xl text-gray-600">Kelola semua aspek TrotoTrack dengan mudah</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="fas fa-newspaper"
                            title="Manajemen Artikel"
                            description="Buat, edit, dan kelola artikel informatif tentang trotoar dan infrastruktur kota"
                            color="text-blue-600"
                            bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
                        />
                        <FeatureCard
                            icon="fas fa-exclamation-triangle"
                            title="Laporan Trotoar"
                            description="Pantau laporan kerusakan trotoar dari masyarakat dan kelola tindak lanjutnya"
                            color="text-red-600"
                            bgColor="bg-gradient-to-br from-red-50 to-red-100"
                        />
                        <FeatureCard
                            icon="fas fa-users-cog"
                            title="Manajemen User"
                            description="Kelola pengguna sistem, atur peran, dan pantau aktivitas pengguna"
                            color="text-purple-600"
                            bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
                        />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-16">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center mb-8">
                            <div className="p-3 rounded-xl bg-orange-100 mr-4">
                                <i className="fas fa-bolt text-2xl text-orange-600"></i>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">Aksi Cepat</h3>
                                <p className="text-gray-600">Akses langsung ke fitur yang sering digunakan</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <QuickActionButton
                                icon="fas fa-plus-circle"
                                label="Buat Artikel Baru"
                                color="text-blue-600"
                                bgColor="bg-blue-50"
                                onClick={() => console.log('Navigasi ke buat artikel')}
                            />
                            <QuickActionButton
                                icon="fas fa-list-alt"
                                label="Lihat Semua Laporan"
                                color="text-green-600"
                                bgColor="bg-green-50"
                                onClick={() => console.log('Navigasi ke laporan')}
                            />
                            <QuickActionButton
                                icon="fas fa-user-plus"
                                label="Tambah Pengguna"
                                color="text-purple-600"
                                bgColor="bg-purple-50"
                                onClick={() => console.log('Navigasi ke tambah user')}
                            />
                            <QuickActionButton
                                icon="fas fa-chart-line"
                                label="Lihat Statistik"
                                color="text-orange-600"
                                bgColor="bg-orange-50"
                                onClick={() => console.log('Navigasi ke statistik')}
                            />
                        </div>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Getting Started */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="p-3 rounded-xl bg-green-100 mr-4">
                                <i className="fas fa-play-circle text-2xl text-green-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Mulai Dari Sini</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">1</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Kelola Artikel</h4>
                                    <p className="text-sm text-gray-600">Buat konten edukatif untuk pengguna</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">2</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Pantau Laporan</h4>
                                    <p className="text-sm text-gray-600">Respons cepat terhadap laporan masyarakat</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-orange-600 font-bold text-sm">3</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Analisis Data</h4>
                                    <p className="text-sm text-gray-600">Gunakan insights untuk perbaikan sistem</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips & Tricks */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                        <div className="flex items-center mb-6">
                            <div className="p-3 rounded-xl bg-yellow-100 mr-4">
                                <i className="fas fa-lightbulb text-2xl text-yellow-600"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Aturan</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <i className="fas fa-star text-orange-500 mr-2"></i>
                                    <h4 className="font-semibold text-gray-800">Responsif & Cepat</h4>
                                </div>
                                <p className="text-sm text-gray-600">Respons laporan dalam waktu 24 jam untuk kepuasan pengguna</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <i className="fas fa-shield-alt text-blue-500 mr-2"></i>
                                    <h4 className="font-semibold text-gray-800">Keamanan Data</h4>
                                </div>
                                <p className="text-sm text-gray-600">Pastikan data pengguna selalu terlindungi dengan baik</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center mb-2">
                                    <i className="fas fa-chart-pie text-green-500 mr-2"></i>
                                    <h4 className="font-semibold text-gray-800">Monitor Berkala</h4>
                                </div>
                                <p className="text-sm text-gray-600">Lakukan evaluasi rutin untuk meningkatkan kualitas layanan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;