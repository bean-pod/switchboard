import axios from "axios";
import UserModel from "../model/UserModel";

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
    axios.post(
        new UserModel(
            null,
            username,
            password
        )
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
