import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    setCm_email,
    setCpChk,
    setCpIsValid,
    setCpRegChk, setCpRegInput,
    setIsCpSent,
    setSeconds
} from "../../../../redux/compMemberSlice";

function CpReset(props) {
    const dispatch = useDispatch();
    const isCpSent = useSelector(state => state.comp.isCpSent);
    const handleResetEmail = () => {
        const resetConfirm = window.confirm('이메일을 변경하시겠습니까?\n변경후 재인증을 받으셔야합니다.')
        if (resetConfirm) {
            dispatch(setCpRegChk(false));
            dispatch(setSeconds(null));
            dispatch(setIsCpSent(false));
            dispatch(setCpChk(false));
            dispatch(setCpIsValid(false));
            dispatch(setCpRegInput(''));
            dispatch(setCm_email(''));
        }
    }

    return (
        <img
            className='signup-comp-email-reset-icon'
            alt=''
            hidden={!isCpSent}
            src={require('../../assets/signup_guest_email_reset_icon.svg').default}
            onClick={handleResetEmail}
        />
    );
}

export default CpReset;