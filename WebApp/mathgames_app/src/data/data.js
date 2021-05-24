const urlAPI = process.env.NODE_ENV === "development" ? 'http://localhost:4000/' : 'http://138.68.191.32:4000/';
const urlWeb = process.env.NODE_ENV === "development" ? 'http://localhost:3000/' : 'http://138.68.191.32/'

export {urlAPI, urlWeb};
