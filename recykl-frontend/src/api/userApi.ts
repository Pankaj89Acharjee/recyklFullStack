const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const usrApi = {
    loginAPI: async (email: string, password: string) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        return response.json();
    },


    registerNewUser: async (email: string, password: string, role: string) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, role }),
            });

            if (response.status === 404) {
                return null;
            }
            return response.json();
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }

    },
}