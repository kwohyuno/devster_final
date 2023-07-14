import React, {useEffect} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import axiosIns from "../../api/JwtConfig";
import ResizeCrop from "../../api/ResizeCrop";
import jwt_decode from "jwt-decode";


function JwtTest(props) {
    const navi = useNavigate();
    if(localStorage.getItem('accessToken')) {
        let de = jwt_decode(localStorage.getItem('accessToken'));
    }
    const jwtTest = () => {
        const idx = 69;
        axiosIns.get(`/member/${idx}`)
            .then(res => {
                console.log(res);
            });
    }

    const axiosTest=() =>{
        const idx = 69;
        axios.get(`/member/${idx}`)
            .then(res =>{
                console.log(res + "from axios")
            })
    }
    return (
        <div>
            <button onClick={jwtTest} style={{width: '500px', height: '500px'}}>Jwt - Test</button>
            <button onClick={axiosTest} style={{width: '500px', height: '500px'}}>Axios - Test</button>
            <ResizeCrop/>
        </div>
    );
}

export default JwtTest;