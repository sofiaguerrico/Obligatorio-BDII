const getToken = async () => {
    try {
        return localStorage.getItem("token");
    } catch (error) {
        console.error("error", error);
        throw error;
    }
}

export { getToken }