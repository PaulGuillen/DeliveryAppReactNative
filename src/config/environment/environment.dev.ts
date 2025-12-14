import { BASE_URL } from './baseUrl';
import { Environment } from './types';

export const environmentDev: Environment = {
    apiUserLogin: `${BASE_URL}/users`,
    apiCreateUser: `${BASE_URL}/users`,
    apiHome: `${BASE_URL}/home`,
    apiOrder: `${BASE_URL}/order`,
    apiPayment: `${BASE_URL}/payment`,
    apiPromotion: `${BASE_URL}/promotion`,
};
