import axios from "axios";

const APP_URL = "http://localhost:8040/api/v1/phonebook";

class PhonebookService {
    getAllContacts(){
        return axios.get(APP_URL);
    }

    // Modify the createContact method to handle FormData
    createContact(contact) {
        return axios.post(APP_URL, contact, {
            headers: {
                'Content-Type': 'multipart/form-data', // Tell the server that you're sending a file
            }
        });
    }

    getContact(id) {
        return axios.get(`${APP_URL}/${id}`);
    }

    deleteContact(id) {
        return axios.delete(`${APP_URL}/${id}`);
    }

    updateContact(id, contact) {
        return axios.put(`${APP_URL}/${id}`,contact);
    }

}

//eslint-disable-next-line
export default new PhonebookService();