import type { FC } from 'react';
import type { Device, DeviceStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface DeviceCardProps {
    device: Device;
    onDecommission: (deviceId: string) => void;
    onViewHealth: (device: Device) => void;
}

export const DeviceCard: FC<DeviceCardProps> = ({ device, onDecommission, onViewHealth }) => {

    const { user } = useAuth();
    const getUserRole = localStorage.getItem('role')


    const getStatusColor = (status: DeviceStatus) => {
        if (status === 'deployed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        if (status === 'manufacturing') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    return (
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="p-6 flex-grow bg-gray-800 rounded-tr-full">
                <div className="flex justify-between items-center">
                    <p className="bg-gray-700 px-3 py-1 rounded-tl-2xl rounded-br-3xl text-sm font-medium text-blue-400 dark:text-blue-400 uppercase tracking-wide">{device?.type}</p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>{device?.status?.toUpperCase()}</span>
                </div>
                <div className='w-1/5 justify-center items-center'>
                    <h3 className="px-2 py-1 rounded-tr-3xl text-center bg-gray-700 mt-1 text-xl font-semibold text-gray-100 dark:text-white">{device.id}</h3>
                </div>
                <div className='w-1/2 justify-center items-center'>
                    <p className={`pl-3 py-1 rounded-bl-4xl rounded-tr-lg font-mono font-bold ${getStatusColor(device.status)}`}>{device.location}</p>
                </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <button onClick={() => onViewHealth(device)} className="bg-gray-600 hover:bg-gray-700 text-sm text-white font-bold py-2 px-3 rounded-lg transition-all duration-300">View Health</button>
                {(user?.role === 'Admin' || getUserRole === 'Admin') && device.status !== 'decommissioned' && (
                    <button onClick={() => onDecommission(device.id)} className="bg-gray-600 hover:bg-gray-700 text-sm text-white font-bold py-2 px-3 rounded-lg transition-all duration-300">Decommission</button>
                )}
            </div>
        </div>
    );
};