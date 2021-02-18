import axios from "axios";

var token = null;
var username = null;
var password = null;

export function getAuthorizationHeader(){
    if (token == null) {
        fetchNewToken();
    }
    return buildHeader();
}

function buildHeader(){
    return {
        headers: {"Authorization" : `Bearer ${this.token}`}
    };
}

export function fetchNewToken(){
    axios.get(process.env.REACT_APP_TOKEN,{
            auth: {
                username: username,
                password: password
            }
    }
    ).then( response =>
        token = response.data.headers["Authorization"]
    );
}

export function setUsername(user){
    username = user;
}

export function setPassword(pass){
    password = pass;
}
