import React, { useEffect, useState } from "react";
import "./style/MemberSignupApproval.css";
import axiosIns from "../../api/JwtConfig";
import MenuModal from "./MenuModal";
import { jwtHandleError } from "../../api/JwtHandleError";
import { useSnackbar } from "notistack";
import ToastAlert from "../../api/ToastAlert";

function MemberSignupApproval(props) {
  const { enqueueSnackbar } = useSnackbar();
  const toastAlert = ToastAlert(enqueueSnackbar);

  const [memberList, setMemberList] = useState([]);

  const photoUrl = process.env.REACT_APP_MEMBERURL + "checkphoto/";

  console.log(memberList);

  const list = async () => {
    const listUrl = "/api/member/D1";

    try {
      const response = await axiosIns.get(listUrl);
      setMemberList(response.data);
      console.log(response.data);
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  //처음 시작시 목록 가져오기
  useEffect(() => {
    list();
  }, []);

  const [selectedMemberImage, setSelectedMemberImage] = useState(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenuBar = (image) => {
    setSelectedMemberImage(image);
    setIsMenuOpen(true);
  };

  const handleApprove = async (memberId) => {
    try {
      await axiosIns.patch(`/api/member/D1`, {
        m_idx: memberId,
        type: "normal",
        sign: true,
      });
      list();
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  const handleReject = async (memberId) => {
    try {
      await axiosIns.patch(`/api/member/D1`, {
        m_idx: memberId,
        type: "normal",
        sign: false,
      });
      list();
    } catch (e) {
      jwtHandleError(e, toastAlert);
    }
  };

  return (
    <div className="memberApproval">
      <div className="content-memberApproval">
        <b className="text-constent-memberApproval">일반회원 가입 승인</b>
        <div
          className="text-before-memberApproval"
          style={{
            display: memberList.every((member) => member.m_filename === "no")
              ? "block"
              : "grid",
          }}
        >
          {memberList.every((member) => member.m_filename === "no") ? (
            <p className="p" style={{ width: "100%" }}>
              회원가입 승인을 요청한 회원이 없습니다.
            </p>
          ) : (
            memberList
              .filter((member) => member.m_filename !== "no")
              .map((item, idx) => (
                <div key={idx} className="memberApproval-box">
                  <img
                    alt=""
                    src={`${photoUrl}${item.m_filename}`}
                    onClick={() => openMenuBar(`${photoUrl}${item.m_filename}`)}
                  />
                  <div>{item.m_name}</div>
                  <div>{item.ai_name}</div>
                  <button onClick={() => handleApprove(item.m_idx)}>
                    승인
                  </button>
                  <button onClick={() => handleReject(item.m_idx)}>반려</button>
                </div>
              ))
          )}
        </div>
      </div>
      <MenuModal
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        selectedMemberImage={selectedMemberImage}
      />
    </div>
  );
}

export default MemberSignupApproval;
