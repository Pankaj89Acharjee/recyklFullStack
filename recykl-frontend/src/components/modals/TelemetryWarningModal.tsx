import { useState, type FC } from 'react'
import { X } from 'lucide-react';
import { TelemetryAddModal } from './TelemetryAddModal';
import { deviceApi } from '../../api/deviceApi';
import { toast } from 'react-toastify';


interface TelemetryModalProps {
    deviceId: string | null;
    onClose: () => void;
}



export const TelemetryModal: FC<TelemetryModalProps> = ({ deviceId, onClose }) => {

    const [showTelemetAddModal, setShowTelemetAddModal] = useState<boolean>(false);

    const handleTeletryAdd = async (data: { cpu: number, temperature: number, status: string }) => {
        try {
            const response = await deviceApi.createNewTelemetry(deviceId!, data);
            console.log("Telemetry Data Created:", response);

            if (response && response.status === 201) {
                toast.success("Telemetry data added successfully!");
            } else {
                toast.error("Failed to add telemetry data!");
                throw new Error("Failed to create telemetry data");
            }
            setShowTelemetAddModal(false);          
        } catch (error) {
            setShowTelemetAddModal(false);
            console.error("Error creating telemetry data:", error);
            throw error;
        }
    }



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No Health Data</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
                </div>
                <p className="mb-6 text-gray-700 dark:text-gray-300">No health data available for this device. Please add telemetry data to view health history.</p>
                <div className="flex justify-end">
                    <button onClick={() => setShowTelemetAddModal(!showTelemetAddModal)} className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition">
                        Add Telemetry
                    </button>
                </div>
            </div>

            {showTelemetAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add Telemetry Data</h2>
                        <TelemetryAddModal
                            isOpen={showTelemetAddModal}
                            onClose={() => { setShowTelemetAddModal(false); onClose(); }}
                            onRegister={async (data) => {
                                // Handle telemetry data registration logic here
                                handleTeletryAdd(data);
                                console.log('Telemetry Data:', data);
                                console.log('Typepf CPU Data:', typeof data.cpu);

                                setShowTelemetAddModal(false);
                            }}
                        />
                        <p className="text-gray-700 dark:text-gray-300">Form to add telemetry data will go here.</p>
                    </div>
                </div>
            )}
        </div>
    );
};