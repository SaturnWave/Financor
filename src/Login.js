import React {useState} from "react";
import ProbTypes from 'prob-types';
import './login.css';

async function loginUser(credentials){
    return fetch('your local host',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
})
.then(data=> data.json())
 
export default function Login(){
    return(
        <form>
            <label>
                <p>Username</p>
                <inputy type="text" />
            </label>
            <label>
                <p>password</p>
<input type ="password" />          
  </label>
  <button type = "submit">Submit</button>
        </form>
    )}

Login.probTypes = {
    setToken: ProbTypes.func.isRequired
}