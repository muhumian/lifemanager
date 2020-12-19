export default function dispatchWrapper (type, payload) {
    return {
        type: type,
        payload: payload
    }
};
