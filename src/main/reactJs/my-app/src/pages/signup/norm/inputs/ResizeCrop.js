import React, {useState, useRef} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import '../../style/ResizeCrop.css'
import axios from 'axios';
import {Slider} from "@mui/material";

function ResizeCrop({isCropOpen, setIsCropOpen, cropImg, setSavedImg}) {
    const cropperRef = useRef(null);
    const [zoomValue, setZoomValue] = useState(0);

    const closeCropModal = () => {
        setIsCropOpen(false);
    }

    if (!isCropOpen) {
        return null;
    }

    const onCrop = async () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        const croppedImg = cropper.getCroppedCanvas().toDataURL();

        if (croppedImg) {
            let splitCroppedImg = croppedImg.split(',');
            let byteStringCroppedImg = window.atob(splitCroppedImg[1]);
            let mimeString = splitCroppedImg[0].split(':')[1].split(';')[0];
            let arrayBuffer = new ArrayBuffer(byteStringCroppedImg.length);
            let ia = new Uint8Array(arrayBuffer);
            for (let i = 0; i < byteStringCroppedImg.length; i++) {
                ia[i] = byteStringCroppedImg.charCodeAt(i);
            }
            let croppedImgBlob = new Blob([ia], {type: mimeString});
            let fileName = `filename.${mimeString.split('/')[1]}`

            let formData = new FormData();
            formData.append('upload', croppedImgBlob, fileName);

            try {
                const res = await axios({
                    method: 'post',
                    url: '/api/member/D0/photo',
                    data: formData,
                    headers: {'Content-type': 'multipart/form-data'}
                });
                if (res.status === 200) {
                    await setSavedImg(res.data);
                    setZoomValue(0);
                    setIsCropOpen(false);
                }
            } catch (error) {
                alert('사진 업로드에 실패했습니다.\n잠시후 다시 시도해주세요.');
                console.error('사진 업로드 실패' + error.response?.status);
            }
        }
    }

    const handleZoomSliderChange = (e) => {
        setZoomValue(e.target.value);
    }

    return (
        <div className='sigup-crop-modal-box'>
            <div className="sigup-crop-modal">
                <div className="signup-crop-modal-crop">
                    <Cropper
                        ref={cropperRef}
                        style={{height: '100%', width: '100%'}}
                        zoomTo={zoomValue}
                        initialAspectRatio={1}
                        src={cropImg}
                        viewMode={2}
                        minCropBoxHeight={100}
                        minCropBoxWidth={100}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                        dragMode={'move'}
                        zoomOnTouch={false}
                        zoomOnWheel={false}
                        aspectRatio={1}
                    />
                </div>
                <b className="signup-crop-modal-x">
                    x {Number(zoomValue+1).toFixed(2)}
                </b>
                <div className="signup-crop-modal-scale">
                    <Slider
                        disabled={false}
                        value={zoomValue}
                        min={0}
                        max={2}
                        step={0.01}
                        color='secondary'
                        onChange={handleZoomSliderChange}
                    />
                </div>
                <div>
                    <div
                        className="signup-crop-modal-cancle"
                        onClick={closeCropModal}
                    >
                        <div className="signup-crop-modal-cancle-box"/>
                        <div className="signup-crop-modal-cancle-text">취소</div>
                    </div>
                    <div
                        className="signup-crop-modal-upload"
                        onClick={onCrop}
                    >
                        <div className="signup-guest-submit-upload-box"/>
                        <div className="signup-crop-modal-cancle-text">수정</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResizeCrop;