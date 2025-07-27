import { Search, PlusCircle, Filter, List, LayoutGrid } from 'lucide-react';
import { RegisterDeviceModal } from '../components/modals/RegisterDeviceModal';
import { DeviceHealthModal } from '../components/modals/DeviceHealthModal';
import { TelemetryModal } from '../components/modals/TelemetryWarningModal';
import { DeviceRow } from '../components/devices/DeviceRow';
import { DeviceCard } from '../components/devices/DeviceCard';
import { Header } from '../components/Header';
import { useState, useEffect, } from 'react';
import type { FC } from 'react';
import { deviceApi } from '../api/deviceApi';
import type { Device, DeviceType, DeviceStatus, Location, HealthData } from '../types';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';







interface Filters {
    type: 'all' | DeviceType;
    status: 'all' | DeviceStatus;
}

export const DashboardPage: FC = () => {

    const { user } = useAuth();

    const [devices, setDevices] = useState<Device[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({ type: 'all', status: 'all' });
    const [isRegisterModalOpen, setRegisterModalOpen] = useState<boolean>(false);
    const [selectedDeviceForHealth, setSelectedDeviceForHealth] = useState<HealthData | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showTelemetryModal, setShowTelemetryModal] = useState(false)
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

    const fetchDevices = async () => {
        setLoading(true);
        const data = await deviceApi.getAllDeviceList();
        console.log('Fetched all devices:', data);
        setDevices(Array.isArray(data.devices) ? data.devices : []);
        setLoading(false);
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleRegister = async (deviceData: { type: DeviceType; location: Location, status: DeviceStatus, manufacturer: string, macAddress: string, firmwareVersion: string }) => {
        const saveNewDevice = await deviceApi.registerNewDevice(deviceData);
        if (saveNewDevice.status === false) {
            toast.error(saveNewDevice.message || "Failed to register device");
            setRegisterModalOpen(false);
            return;
        }
        fetchDevices();
    };

    const handleDecommission = async (deviceId: string) => {
        if (window.confirm('Are you sure you want to decommission this device? This action cannot be undone.')) {
            await deviceApi.decommissionDevice(deviceId);
            fetchDevices();
        }
    };

    const handleViewHealth = async (device: Device) => {
        if (showTelemetryModal) return;

        try {
            const healthData = await deviceApi.healthStatus(device.id);
            console.log("Health Data:", healthData);

            setSelectedDeviceId(device.id);
            if (healthData === null) {
                //console.log("No health data found for this device");
                setSelectedDeviceForHealth(null);
                setShowTelemetryModal(true)
            } else {
                setShowTelemetryModal(false)
                setSelectedDeviceForHealth(healthData);
            }
        } catch (error) {
            console.log("Error", error)
            setShowTelemetryModal(true) //Showing to Add Telemetry even there is an error
            setSelectedDeviceForHealth(null)
            setSelectedDeviceId(device.id);
        }

    };



    const filteredDevices = devices.filter(device => {
        const searchMatch = device.location.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = filters.type === 'all' || device.type === filters.type;
        const statusMatch = filters.status === 'all' || device.status === filters.status;
        return searchMatch && typeMatch && statusMatch;
    });

    //console.log("Filtered Devices:", filteredDevices);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Header />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">

                    {/* For Seraching */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search by location..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    {/* For Filtering Records */}
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
                        <div className="flex items-center gap-2">
                            <Filter size={16} className="text-gray-500 dark:text-gray-400" />
                            <select onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | DeviceType })} className="rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="all">All Types</option>
                                <option value="RVM">RVM</option>
                                <option value="Soundbox">Soundbox</option>
                                <option value="Def Line">Def Line</option>
                                <option value="RVM XXL">RVM XXL</option>
                                <option value="Recycle Sensor">Recycle Sensor</option>
                                <option value="Motor Sensor">Motor Sensor</option>
                            </select>
                            <select onChange={(e) => setFilters({ ...filters, status: e.target.value as 'all' | DeviceStatus })} className="rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="all">All Statuses</option>
                                <option value="deployed">Deployed</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="decommissioned">Decommissioned</option>
                                <option value="active">Active</option>
                            </select>
                        </div>

                        {/* For Grid View and Tabular View */}
                        <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-lg flex items-center">
                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600' : ''}`}><LayoutGrid size={18} /></button>
                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white dark:bg-gray-600' : ''}`}><List size={18} /></button>
                        </div>

                        {/* For Registering New Device */}
                        <button disabled={user?.role === 'user'} onClick={() => setRegisterModalOpen(true)} className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            <PlusCircle size={20} /><span className="hidden sm:inline">Register Device</span><span className="sm:hidden">Register</span>
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div><p className="mt-4 text-gray-500 dark:text-gray-400">Loading devices...</p></div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredDevices.map(device =>
                                    <DeviceCard
                                        key={device.id}
                                        device={device}
                                        onDecommission={handleDecommission}
                                        onViewHealth={handleViewHealth}
                                    />)}
                            </div>
                        ) : (
                            // For Tabular View
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Device ID</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredDevices.map(device => <DeviceRow key={device.id} device={device} onDecommission={handleDecommission} onViewHealth={handleViewHealth} />)}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {filteredDevices.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-10">No devices match your criteria.</p>}
                    </>
                )}
            </main>
            <RegisterDeviceModal
                isOpen={isRegisterModalOpen}
                onClose={() => setRegisterModalOpen(false)}
                onRegister={handleRegister}
            />
            <DeviceHealthModal
                device={selectedDeviceForHealth}
                onClose={() => setSelectedDeviceForHealth(null)}
            />

            {showTelemetryModal && (
                <TelemetryModal
                    deviceId={selectedDeviceId}
                    onClose={() => {
                        setShowTelemetryModal(false);
                        setSelectedDeviceForHealth(null);
                    }}
                />
            )}
        </div>
    );
};

export default DashboardPage;