import { environmentDev } from './environment.dev';
import { environmentProd } from './environment.prod';

const isProd = false;

export const environment = isProd
    ? environmentProd
    : environmentDev;
