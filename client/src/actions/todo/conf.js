export const getHeader = () => {
    return {
        headers: JSON.parse(localStorage.getItem('user_local')) && {Authorization: `Bearer ${JSON.parse(localStorage.getItem('user_local')).token}`}
    };
}
