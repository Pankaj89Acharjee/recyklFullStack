import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';
import { useEffect, type FC } from 'react';
import type { HealthData, HealthRecord } from '../../types';
import { toast } from 'react-toastify';

interface DeviceHealthModalProps {
    device: HealthData | null;
    onClose: () => void;
}




export const DeviceHealthModal: FC<DeviceHealthModalProps> = ({ device, onClose }) => {

    const getStatusColor = (status: string) => {
        if (status === 'healthy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        if (status === 'warning') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };


    useEffect(() => {
        if (device && !device.current) {
            toast.error("No current health data available for this device.");
            console.log("No health history available for this device.");
        }
    }, [device]);



    if (!device?.current) {
        return null;
    }

    console.log("Device Health Data:", device);


    // Prepare chart data: use history, or fallback to current as a single entry
    const chartData: HealthRecord[] = device.history.length > 0
        ? device.history
        : device.current
            ? [device.current]
            : [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    {device?.current && (
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Health History: <span className={`${getStatusColor(device.current.status)} px-2 py-1 rounded-full mr-2 text-center`}>{device.current.status.toUpperCase()} </span> ({device.current.temperature}°C, {device.current.cpu}% CPU)
                        </h2>
                    )}

                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
                </div>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="timestamp" stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'} />
                            <YAxis stroke={document.documentElement.classList.contains('dark') ? '#9ca3af' : '#6b7280'} />
                            <Tooltip contentStyle={{ backgroundColor: document.documentElement.classList.contains('dark') ? '#1f2937' : '#ffffff', border: '1px solid #374151' }} />
                            <Legend />
                            <Bar dataKey="cpu" name="CPU (%)" fill="#3b82f6" />
                            <Bar dataKey="temperature" name="Temp (°C)" fill="#f59e42" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};