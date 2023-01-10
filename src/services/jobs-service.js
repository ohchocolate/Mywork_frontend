import axios from "axios";

const BASE_URL = process.env.REACT_APP_HEROKU_URL || process.env.REACT_APP_API_BASE_URL
const API = `${BASE_URL}/api/jobs`;

export const findAllJobs = () =>
    axios.get(API)
    .then(response => response.data);

export const findJobById = (jid) =>
    axios.get(`${API}/${jid}`)
    .then(response => response.data);

export const findMyJobsById = (uid) =>
    axios.get(`${API}/users/${uid}`)
    .then(response => response.data);

export const createJob = (job) =>
    axios.post(`${API}`, job)
    .then(response => response.data);

export const updateJob = (jid, job) =>
    axios.put(`${API}/${jid}`, job)
    .then(response => response.data);

export const createMyJobs = (uid, myJobs) =>
    axios.post(`${API}/users/${uid}`, myJobs)
    .then(response => response.data);

export const updateMyJobs = (uid, myJobs) =>
    axios.put(`${API}/users/${uid}`, myJobs)
    .then(response => response.data);