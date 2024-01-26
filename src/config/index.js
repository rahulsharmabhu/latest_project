const VITE_VIDEO_LIST_URL = import.meta.env.VITE_VIDEO_LIST_URL || "http://192.168.54.50:5173/assets/list-Items.json";
const VITE_SAMPLE_URL = import.meta.env.VITE_VIDEO_LIST_URL || "/assets/sample.txt" || "http://192.168.54.50:5173/assets/sample.txt";
const API_AUTH_URL = import.meta.env.VITE_APP_API_AUTH_URL || 'default url here'; // staging
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || 'default url here'; // staging

const DATE_FORMAT = "YYYY-MM-DD";

let config = {
    'sample': API_BASE_URL + '/sample',
    'auth_sample': API_AUTH_URL + '/auth_sample',
};

config.VITE_VIDEO_LIST_URL = VITE_VIDEO_LIST_URL;
config.VITE_SAMPLE_URL = VITE_SAMPLE_URL;
config.DATE_FORMAT = DATE_FORMAT;

export default config;
