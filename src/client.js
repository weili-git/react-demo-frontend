import fetch from 'unfetch'; // 4.2.0

export const getAllUsers = () => fetch('/users');