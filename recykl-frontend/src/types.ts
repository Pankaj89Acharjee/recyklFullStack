import { z } from 'zod';

export const registrationSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lower letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one upper letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string(),
    role: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export type RegistrationData = z.infer<typeof registrationSchema>;


export const loginSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(50, { message: "Password must be at most 50 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lower letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one upper letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character" }),
})

export type LoginData = z.infer<typeof loginSchema>;




export interface HealthRecord {
    timestamp: string | null;
    cpu: number;
    temperature: number;
    status: string;
}

export interface HealthData {
    cached: boolean;
    current: HealthRecord;
    history: HealthRecord[];
}

export type DeviceType = 'RVM' | 'Soundbox' | 'Def Line' | 'RVM XXL' | 'Recycle Sensor' | 'Motor Sensor';
export type DeviceStatus = 'deployed' | 'manufacturing' | 'decommissioned' | 'active';
export type DeviceHealthStatus = 'healthy' | 'unhealthy' | 'critical' | 'warning';
export type Location = 'Mumbai' | 'Delhi' | 'Bangalore' | 'Chennai' | 'Kolkata' | 'Hyderabad';
export type Role = 'admin' | 'user';

export interface Device {
    id: string;
    type: DeviceType;
    location: Location;
    status: DeviceStatus;
    manufacturer: string;
    macAddress: string;
    firmwareVersion: string;
    healthData?: HealthData | null;
    createdAt: string | null;
}

export interface User {
    email: string | null;
    role: string | null;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}