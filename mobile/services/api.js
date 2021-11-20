import axios from "axios";

axios.defaults.baseURL = 'http://94.41.65.26/';

export const getEvents = async (params) => {
    return await axios.get('events/list', {...params})
}

export const getEventById = async (id) => {
    return await axios.get(`events/${id}`)
}