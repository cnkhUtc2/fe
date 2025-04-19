import React, { useState } from 'react';
import apiClient from '../../apis/AxiosConfiguration';

const HelpRequestForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        purpose: '',
        description: '',
        priority: 'low',
        status: 'OPEN',
        location: '',

    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await apiClient.post('/front/tickets/create', formData);
            console.log('Response:', response.data);
            onClose();
        } catch (err) {
            console.error('Error submitting form:', err);
            console.log('Chi tiết lỗi từ server:', err.response?.data);
            if (err.response?.status === 401) {
                setError('Vui lòng đăng nhập để gửi đơn xin hỗ trợ.');
            } else {
                setError('Có lỗi xảy ra khi gửi đơn. Vui lòng thử lại sau.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center">Đơn xin hỗ trợ</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mục đích</label>
                        <input
                            type="text"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-yellow-400 text-red-700 rounded-md font-semibold hover:bg-yellow-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi đơn'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HelpRequestForm; 