import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { URL, URLIMAGE } from './api';

export const sendInterest = async (matchId) => {
    if (!matchId) {
        toast.error('Match ID is required to send interest');
        return;
    }
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.post(
            `${URL}/api/send-intrest`,
            { matchId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Show success message
        toast.success(response.data.message || 'Interest sent successfully');
    } catch (err) {
        // Display the error message returned by the server
        const errorMessage = err.response?.data?.message || 'Error sending interest';
        toast.error(errorMessage);
        console.error('Error sending interest:', err);
    }
};


