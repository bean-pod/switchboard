export function saveToken(token){
    localStorage.setItem("authToken", token)
}

export function getAuthorizationHeader(){
    const token = localStorage.getItem("authToken")
    return {
        headers: {"Authorization" : `${token}`}
    };
}
