import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const userSignIn = async (userSignInInfo) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/member/login',
            data: JSON.stringify(userSignInInfo),
            headers: {'Content-type': 'application/json'}
        });

        if (res.status === 200) {
            let decodedToken = jwt_decode(res.headers.authorization);

            localStorage.setItem('accessToken', res.headers.authorization);
            localStorage.setItem('refreshToken', res.headers['authorization-refresh']);
            localStorage.setItem('expiredTime', decodedToken.exp);

            console.log(decodedToken.exp);
            console.log(Date.now() / 1000);

            // axios.defaults.headers.common['Authorization']=`Bearer ${localStorage.getItem('accessToken')}`;

            return res;
        }
    } catch (error) {
        throw error;
    }
}