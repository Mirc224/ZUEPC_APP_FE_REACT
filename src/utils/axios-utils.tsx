import axios from 'axios';
import config from '../config';

export const axiosClient = axios.create({baseURL: config.apiUrl});

export const axiosPrivateClient = axios.create({ 
    baseURL: config.apiUrl,
    headers: {'Content-Type': 'application/json'},
 });