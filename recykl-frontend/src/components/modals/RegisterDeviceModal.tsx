import React, { useState, } from 'react';
import type { FC } from 'react'
import { X } from 'lucide-react';
import type { DeviceStatus, DeviceType, Location } from '../../types';

interface RegisterDeviceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (data: { type: DeviceType; location: Location, status: DeviceStatus, manufacturer: string, macAddress: string, firmwareVersion: string }) => Promise<void>;
}

export const RegisterDeviceModal: FC<RegisterDeviceModalProps> = ({ isOpen, onClose, onRegister }) => {
    const [type, setType] = useState<DeviceType>('RVM');
    const [location, setLocation] = useState<Location>('Mumbai');
    const [manufacturer, setManufacturer] = useState<string>('');
    const [macAddress, setMacAddress] = useState<string>('');
    const [firmwareVersion, setFirmwareVersion] = useState<string>('');
    const [status, setStatus] = useState<DeviceStatus>('deployed');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await onRegister({ type, location, status, manufacturer, macAddress, firmwareVersion });
        setLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Register New Device</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={24} /></button>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="device-type">Device Type</label>
                        <select id="device-type" value={type} onChange={e => setType(e.target.value as DeviceType)} className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition">
                            <option value="RVM">RVM</option>
                            <option value="Soundbox">Soundbox</option>
                            <option value="Def Line">Def Line</option>
                            <option value="Motor Sensor">Motor Sensor</option>
                            <option value="Recycle Sensor">Recycle Sensor</option>
                            <option value="RVM XXL">RVM XXL</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="location">Location</label>
                        <select id="location" value={location} onChange={e => setLocation(e.target.value as Location)} className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition">
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Kolkata</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Hyderabad">Hyderabad</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">Device Status</label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value as DeviceStatus)} className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition">
                            <option value="Deployed">Deployed</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Decommissioned">Decommissioned</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>



                    <div className='gap-3 md:gap-4 justify-between flex md:flex-row flex-col'>
                        <div className="mb-2 md:mb-6 flex-1">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="manufacturer">Manufacturer</label>
                            <input
                                id="manufacturer"
                                autoComplete='off'
                                type="text"
                                value={manufacturer}
                                onChange={e => setManufacturer(e.target.value)}
                                className="flex-1 w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition"
                                required
                                placeholder='Sony'
                            />
                        </div>


                        <div className='mb-2 md:mb-6 flex-1'>
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="macAddress">MAC Address</label>
                            <input
                                id='macAddress'
                                type='text'
                                autoComplete='off'
                                value={macAddress}
                                onChange={e => setMacAddress(e.target.value)}
                                className="flex-1 w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition"
                                required
                                placeholder='e.g. 00:1A:2B:3C:4D:5E'
                            />
                        </div>

                        <div className="mb-4 md:mb-6 flex-1">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="firmwareVersion">Firmware Version</label>
                            <input
                                id='firmwareVersion'
                                type='text'
                                autoComplete='off'
                                value={firmwareVersion}
                                onChange={e => setFirmwareVersion(e.target.value)}
                                className="flex-1 w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border focus:border-blue-500 focus:bg-white dark:focus:bg-gray-600 focus:outline-none transition"
                                required
                                placeholder='e.g. 1.0.0'
                            />
                        </div>
                    </div>



                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition">Cancel</button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-blue-400 transition flex items-center">
                            {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>}
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};