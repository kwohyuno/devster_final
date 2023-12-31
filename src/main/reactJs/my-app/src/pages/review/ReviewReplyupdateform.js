import React, {useState} from 'react';
import axiosIns from "../../api/JwtConfig";
import {useSnackbar} from "notistack";
import ToastAlert from "../../api/ToastAlert";
import {checkToken} from "../../api/checkToken";

function ReviewReplyupdateform({rbc_idx,rb_idx,currentContent,rbc_ref}) {
    const [rbc_content, setRbc_content] = useState(currentContent); // 상태를 정의합니다.
    const { enqueueSnackbar } = useSnackbar();
    const toastAlert = ToastAlert(enqueueSnackbar);

    let de = checkToken();

    const onSubmitEvent = (e) => {
        e.preventDefault();

        const dto = {
            rbc_content: rbc_content,
            rb_idx :rb_idx,
            rbc_idx:rbc_idx,
            m_idx :de.idx
        };
        if (rbc_ref !== 0) { // rbc_ref 값이 필요한 경우에만 추가
            dto.rbc_ref = rbc_ref;
        }

        // PUT 요청으로 수정
        axiosIns.put(`/api/review/D1/comment/${rbc_idx}`, dto)
            .then(res => {
                // 성공적으로 등록된 경우, 목록으로 이동
                window.location.reload();

            })
            .catch(error => {
                toastAlert('등록 실패', 'warning');
            });
    }

    return (
        <div>
            <form className="r-detail-commnets-form" onSubmit={onSubmitEvent}>
                <div className="r-detail-commnets-form-bo" />
                <img
                    className="r-detail-commnets-form-im-icon"
                    alt=""
                    src=""
                />
                <textarea className="r-detail-reply-form-te"
                          placeholder="내용을 입력해주세요"
                          required value={rbc_content} // reviewComment state 사용
                          onChange={(e)=>setRbc_content(e.target.value)}
                />
                <div className="r-detail-reply-form-su">
                    <button type='submit' className="r-detail-reply-form-su-text">답글수정</button>
                </div>
            </form>
        </div>
    );
}

export default ReviewReplyupdateform;
