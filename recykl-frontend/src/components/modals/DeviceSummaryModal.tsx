import React, { useState, useEffect } from 'react';
import { deviceApi } from '../../api/deviceApi';

interface DeviceSummary {
    count: number;
    deviceType: string;
    region: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const DeviceSummaryModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [summary, setSummary] = useState<DeviceSummary[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 5; // Items per page

    useEffect(() => {
        if (isOpen) {
            const fetchSummary = async () => {
                try {
                    setLoading(true);
                    setError(null);
                    const response = await deviceApi.getDeviceSummary(currentPage, limit);
                    if (response.success) {
                        setSummary(response.data);
                        setTotalPages(Math.ceil(response.total / limit));
                    } else {
                        setError(response.message || 'Failed to fetch summary');
                    }
                } catch (err) {
                    setError('An unexpected error occurred.');
                } finally {
                    setLoading(false);
                }
            };

            fetchSummary();
        }
    }, [isOpen, currentPage]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white dark:text-gray-700 p-6 rounded-lg shadow-xl w-full max-w-2xl items-center justify-center">
                <h2 className="text-xl font-bold mb-4">Device Summary</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <>
                        <div className="overflow-auto max-h-80 justify-center">
                            <table className="min-w-full bg-white border">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-2 px-4 border-b">Device Type</th>
                                        <th className="py-2 px-4 border-b">Region</th>
                                        <th className="py-2 px-4 border-b text-center">Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {summary.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-2 px-4 border-b">{item.deviceType}</td>
                                            <td className="py-2 px-4 border-b">{item.region}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
                <div className="text-right mt-4 border-t pt-4">
                    <button
                        onClick={() => {
                            onClose();
                            setCurrentPage(1); // Reset page on close
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
