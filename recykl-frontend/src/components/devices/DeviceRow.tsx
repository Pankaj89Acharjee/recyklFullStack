import type { FC } from 'react'
import type { Device, DeviceStatus } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface DeviceRowProps {
    device: Device;
    onDecommission: (deviceId: string) => void;
    onViewHealth: (device: Device) => void;
}

export const DeviceRow: FC<DeviceRowProps> = ({ device, onDecommission, onViewHealth }) => {
    const { user } = useAuth();
    const getRole = localStorage.getItem('role');

    const getStatusColor = (status: DeviceStatus) => {
        if (status === 'deployed') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        if (status === 'manufacturing') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    };

    return (
        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{device.id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{device.type}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{device.location}</td>
            <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(device.status)}`}>{device.status}</span></td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{device.createdAt?.substring(0, 10)}</td>

            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(device.created).toLocaleDateString()}</td> */}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <button onClick={() => onViewHealth(device)} className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                    View Health
                </button>
                {(user?.role === 'Admin' || getRole === 'Admin') && device.status !== 'decommissioned' && (
                    <button onClick={() => onDecommission(device.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                        Decommission
                    </button>
                )}
            </td>
        </tr>
    );
};