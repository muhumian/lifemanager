import axios from 'axios';

export const AddUserDB = async (user) => {
    // const response = await axios.post('/api/user/add', user);
    // return !!response.data.result;

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('user_local')}` }
    };

    return await axios.post('/api/user/add', user, config);
};

export const UserAuthorization = async (user) => {
    // const response = await axios.post('/api/user/add', user);
    // return !!response.data.result;

    // console.log(user);

    return await axios.post('/api/user/login', user);
};
