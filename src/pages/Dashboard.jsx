import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faFileAlt,
    faExclamationTriangle,
    faClock,
    faMapMarkerAlt,
    faThumbsUp,
    faCalendar
} from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import Loading from '../components/Loading';
import axios from 'axios';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    // Separate state for each data type
    const [reports, setReports] = useState({ data: [], count: 0 });
    const [users, setUsers] = useState({ data: [], count: 0 });
    const [articles, setArticles] = useState({ data: [], count: 0 });

    useEffect(() => {
        const token = Cookies.get('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        Promise.all([
            axios.get('https://troto.aninyan.com/reports', config),
            axios.get('https://troto.aninyan.com/users', config),
            axios.get('https://troto.aninyan.com/articles', config)
        ])
            .then(([reportsRes, usersRes, articlesRes]) => {
                setReports(reportsRes.data);
                setUsers(usersRes.data);
                setArticles(articlesRes.data);

                console.log('📊 Reports - count:', reportsRes.data.count, '| data.length:', reportsRes.data.data.length);
                console.log('👤 Users   - count:', usersRes.data.count, '| data.length:', usersRes.data.data.length);
                console.log('📰 Articles - count:', articlesRes.data.count, '| data.length:', articlesRes.data.data.length);


            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Bisa tampilkan notifikasi error di sini
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Calculate statistics
    const getReportStats = () => {
        const reportsData = reports.data || [];
        const pending = reportsData.filter(r => r.status === 'Pending').length;
        const approved = reportsData.filter(r => r.status === 'Approved').length;
        const rejected = reportsData.filter(r => r.status === 'Rejected').length;
        const heavyDamage = reportsData.filter(r => r.status_damage === 'Heavy Damaged').length;
        const lightDamage = reportsData.filter(r => r.status_damage === 'Light Damaged').length;
        const good = reportsData.filter(r => r.status_damage === 'Good').length;

        return { pending, approved, rejected, heavyDamage, lightDamage, good };
    };

    const stats = getReportStats();

    // Data for charts
    const statusData = [
        { name: 'Pending', value: stats.pending, color: '#f59e0b' },
        { name: 'Diterima', value: stats.approved, color: '#10b981' },
        { name: 'Ditolak', value: stats.rejected, color: '#ff0022ff' }
    ];

    const damageData = [
        { name: 'Heavy Damage', count: stats.heavyDamage },
        { name: 'Light Damage', count: stats.lightDamage },
        { name: 'Good', count: stats.good }
    ];

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-5xl font-extrabold mb-10">
                    <span className="text-orange-500">Troto</span>
                    <span className="text-black">Track</span>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Laporan</p>
                                <p className="text-3xl font-bold text-gray-900">{reports.count}</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total User</p>
                                <p className="text-3xl font-bold text-gray-900">{users.count}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Artikel</p>
                                <p className="text-3xl font-bold text-gray-900">{articles.count}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faFileAlt} className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Laporan Pending</p>
                                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Status Distribution */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Status Laporan</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Damage Level */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribusi Tingkat Kerusakan</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={damageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Laporan Terbaru</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lokasi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Upvote
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.data.slice(0, 5).map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <i className="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                                                <span className="text-sm text-gray-900 capitalize">{report.location}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                                                ${report.status === 'Approved' && 'bg-green-100 text-green-600'}
                                                ${report.status === 'Rejected' && 'bg-red-100 text-red-600'}
                                                ${report.status === 'Pending' && 'bg-yellow-100 text-yellow-600'}
                                            `}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full 
                                                ${report.status_damage === 'Heavy Damaged' && 'bg-red-100 text-red-600'}
                                                ${report.status_damage === 'Light Damaged' && 'bg-yellow-100 text-yellow-600'}
                                                ${report.status_damage === 'Good' && 'bg-green-100 text-green-600'}
                                            `}>
                                                {report.status_damage}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <i className="fas fa-thumbs-up text-gray-400 mr-1"></i>
                                                <span className="text-sm text-gray-900">{report.like}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <i className="fas fa-calendar text-gray-400 mr-2"></i>
                                                <span className="text-sm text-gray-900">
                                                    {new Date(report.created_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Artikel Terbaru</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {articles.data.slice(0, 6).map((article) => (
                            <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-32 object-cover rounded-md mb-3"
                                />
                                <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{article.title}</h4>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.description}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <i className="fas fa-calendar mr-1"></i>
                                    {new Date(article.created_at).toLocaleDateString('id-ID')}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;