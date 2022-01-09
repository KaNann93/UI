export const validateToken = async token => {
    if (!token) return false

    const isValid = await fetch("/validateToken", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token,
        }),
    });
    return isValid;
}