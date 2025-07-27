import type { DeviceType, Location, DeviceStatus } from '../types';



const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


export const deviceApi = {
    getAllDeviceList: async () => {
        const response = await fetch(`${BASE_URL}/devices/allDevices`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        return response.json();
    },


    registerNewDevice: async (deviceData: { type: DeviceType, location: Location, status: DeviceStatus }) => {
        try {
            const res = await fetch(`${BASE_URL}/devices/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceData),
            });

            if (res.status === 404) {
                return null;
            }
            return await res.json();
        } catch (error) {
            console.error("Error registering device:", error);
            throw error;

        }

    },


    getDeviceSummary: async (page: number, limit: number) => {
        const response = await fetch(`${BASE_URL}/devices/summary?page=${page}&limit=${limit}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    decommissionDevice: async (deviceId: string) => {
        const res = await fetch(`${BASE_URL}/devices/${deviceId}/decommission`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await res.json();
    },


    createNewTelemetry: async (deviceId: string, telemetryData: { temperature: number; cpu: number; status: string }) => {
        try {
            const res = await fetch(`${BASE_URL}/devices/${deviceId}/telemetry`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(telemetryData),
            });
            return await res.json();
        } catch (error) {
            console.error("Error creating telemetry data:", error);
            throw error;
        }
    },


    healthStatus: async (deviceId: string) => {
        try {
            const res = await fetch(`${BASE_URL}/devices/${deviceId}/health`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 404) {
                return null;
            }
            return await res.json();
        } catch (error) {
            console.error("Error fetching health status:", error);
            throw error;

        }
    }


};