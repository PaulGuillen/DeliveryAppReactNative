import { environment } from '../../../config/environment';

export const LoginService = {
    login: async (email: string, password: string) => {
        try {
            const response = await fetch(
                `${environment.apiUserLogin}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error:
                        data?.message ??
                        'Credenciales de inicio de sesión incorrectas',
                };
            }

            return {
                success: true,
                data,
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: 'Error en la solicitud',
            };
        }
    },
};
