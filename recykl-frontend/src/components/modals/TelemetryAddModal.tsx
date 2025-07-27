import type { FC } from 'react'
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';


interface TelemetryFormData {
    cpu: number;
    temperature: number;
    status: string;
}


interface TelemetryAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (data: TelemetryFormData) => Promise<void>;
}

export const TelemetryAddModal: FC<TelemetryAddModalProps> = ({ onClose, onRegister }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TelemetryFormData>();


    const onSubmit = async (data: TelemetryFormData) => {
        await onRegister(data);
        reset();
        onClose();
    };

    // if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add Telemetry Data</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
                </div>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">Health Status</label>
                        <select
                            id="status"
                            {...register('status', { required: true })}
                            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition">
                            <option value="">Select status</option>
                            <option value="healthy">Healthy</option>
                            <option value="unhealthy">Un-healthy</option>
                            <option value="warning">Warning</option>
                            <option value="critical">Critical</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-xs mt-1">Status is required.</p>}
                    </div>


                    <div className='gap-3 md:gap-4 justify-between flex md:flex-row flex-col'>
                        <div className="mb-2 md:mb-6 flex-1">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="cpu">CPU Temperature</label>
                            <input
                                id="cpu"
                                autoComplete='off'
                                type="number"
                                {...register('cpu', { required: true, min: 0, max: 5000, valueAsNumber: true })}
                                className="flex-1 w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition"
                                placeholder='30'
                            />
                            {errors.cpu && <p className="text-red-500 text-xs mt-1">CPU temp between 0 and 5000.</p>}
                        </div>


                        <div className='mb-2 md:mb-6 flex-1'>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="temperature">Machine Temperature</label>
                            <input
                                id='temperature'
                                type='number'
                                autoComplete='off'
                                {...register('temperature', { required: true, min: 0, max: 8000, valueAsNumber: true })}
                                className="flex-1 w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition"
                                placeholder='100'
                            />
                            {errors.temperature && <p className="text-red-500 text-xs mt-1">Temperature between 0 and 8000</p>}
                        </div>
                    </div>



                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-blue-400 transition flex items-center">
                            Add Telemetry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};