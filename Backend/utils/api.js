import axios from 'axios';

export const postData = async (url, formData) => {
try {
    const response = await axios.post(url, formData);
} catch (error) {
    
}
}