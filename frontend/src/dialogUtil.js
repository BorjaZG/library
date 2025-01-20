import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const notifyError = function(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: {
            background: "red",
        },
    }).showToast();
};

export const notifyOk = function(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        style: {
            background: "green",
        },
    }).showToast();
};