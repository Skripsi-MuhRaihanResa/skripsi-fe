import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFileAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";

export default function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            const token = Cookies.get("token");

            try {
                const res = await axios.get(`https://troto.aninyan.com/articles/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setArticle(res.data.data);
            } catch (error) {
                console.error("Error:", error);
                toast.error(error.response?.data?.message || "Gagal memuat artikel", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition"
                    aria-label="Kembali"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Kembali
                </button>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
                </div>

                {article.image && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-80 object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileAlt} className="text-green-500" />
                        Isi
                    </h2>
                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-line text-gray-700 leading-relaxed">
                        {article.description}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-3 text-gray-600 text-sm font-medium">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>
                        Dibuat pada:{" "}
                        {new Date(article.created_at).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
