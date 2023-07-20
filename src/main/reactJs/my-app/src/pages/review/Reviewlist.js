import React, {useEffect,useState} from 'react';
import './style/Reviewlist.css';
import axiosIns from "../../api/JwtConfig";
import {Link, NavLink} from "react-router-dom";
import StarRating from "./StarRating";


    function Reviewlist(props) {
        const [inputKeyword, setInputKeyword] = useState(''); // 사용자가 입력하는 검색어
        const [finalKeyword, setFinalKeyword] = useState(''); // 최종 검색어 (검색 버튼
        const [reviews, setReviews] = useState([]);
        const [currentPage,setCurrentPage] = useState(1);
        const [totalPages,setTotalPages]=useState(1);


        const handleRefresh = () => {
            window.location.reload();
        };

        //검색 기능
        const handleSearchButtonClick = () => {
            // 검색 버튼을 눌렀을 때 '최종 검색어'를 업데이트합니다.
            const searchKeyword = inputKeyword;
            setFinalKeyword(searchKeyword);
            // 첫 페이지의 검색 결과를 가져옵니다.
            setCurrentPage(1);
            // fetchReviews(1,searchKeyword);
         };


        useEffect(() => {
            fetchReviews(finalKeyword);
        }, [currentPage,finalKeyword]);

        //controller 에 page,keyword를 보내는 것
        const fetchReviews = async (page, keyword) => {
            const searchKeyword = finalKeyword && finalKeyword.trim() !== '' ? finalKeyword.trim() : null;

            try {
                const response = await axiosIns.get('/api/review/D0', { params: { page: currentPage - 1, keyword: searchKeyword } });
                console.log(finalKeyword);
                setReviews(response.data.reviews);
                console.log(setReviews)
                setTotalPages(response.data.totalPages);
                console.log(response.data.reviews)
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };


        const goToPreviousPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };

        const goToNextPage = () => {
            if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
            }
        };


        const reviewTypes = {
            1: '면접',
            2: '코딩',
            3: '합격',
        };


        const timeForToday = (value) => {
            if (!value) {
                return '';
            }

            const valueConv = value.slice(0, -10);
            const today = new Date();
            const timeValue = new Date(valueConv);

            // timeValue를 한국 시간대로 변환
            const timeValueUTC = new Date(timeValue.toISOString());
            const offset = timeValue.getTimezoneOffset() * 60 * 1000; // 분 단위를 밀리초 단위로 변환
            const timeValueKST = new Date(timeValueUTC.getTime() - offset);


            const betweenTime = Math.floor((today.getTime() - timeValueKST.getTime()) / 1000 / 60);
            if (betweenTime < 1) return '방금 전';
            if (betweenTime < 60) {
                return `${betweenTime}분 전`;
            }
            //console.log(betweenTime);

            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간 전`;
            }

            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay < 8) {
                return `${betweenTimeDay}일 전`;
            }

            const year = String(timeValue.getFullYear()).slice(0, 4);
            const month = String(timeValue.getMonth() + 1).padStart(2, '0');
            const day = String(timeValue.getDate()).padStart(2, '0');

            const formattedDateWithoutTime = `${year}-${month}-${day}`;

            return formattedDateWithoutTime;
        };


        return (
            <div className="review">
                <div className="review-advertise">
                    <div className="review-advertise-main"/>
                    <b className="review-advertise-text">광고</b>
                </div>
                <div className="review-name">
                    <div className="review-list-box-rec"/>
                    <div className="review-name-rec"/>
                    <b className="review-goat">Review</b>
                    <div className="review-sub-goat">
                        코딩테스트 / 면접 / 합격 후기 게시판
                    </div>
                </div>
                <NavLink to={`/review/form`}>
                    <button className="review-headerbar-btn">
                        <div className="review-headerbar-rec"/>
                        <div className="review-headerbar-btn-text">{`후기작성 `}</div>
                        <img
                            className="review-headerbar-btn-icon"
                            alt=""
                            src={require('./assets/review_headerbar_btn_icon.svg').default}
                        />
                    </button>
                </NavLink>
                <div className="review-function-search-input">
                    <input className="review-function-search-input1"
                         value={inputKeyword}
                         placeholder='검색어를 입력해주세요'
                         onChange={(e) => setInputKeyword(e.target.value)}
                    />
                    <img
                        className="review-list-search-icon"
                        alt=""
                        src={require('./assets/review-search-icon.svg').default}
                        onClick={handleSearchButtonClick}
                    />
                </div>
                <div className="rboard-function-sort">
                    <div className="rboard-function-sort-box"/>
                    <div className="rboard-function-sort-time">최신순</div>
                    <div className="rboard-function-sort-view">조회순</div>
                    <div className="rboard-function-sort-like">인기순</div>
                    <img
                        className="rboard-function-sort-bar2-icon"
                        alt=""
                        src={require('./assets/rboard_function_sort_bar2.svg').default}
                    />
                    <img
                        className="rboard-function-sort-bar-icon"
                        alt=""
                        src={require('./assets/rboard_function_sort_bar.svg').default}
                    />
                </div>
                <img
                    className="review-pages-reload-icon"
                    alt=""
                    src={require('./assets/review_pages_reload_icon.svg').default}
                    onClick={handleRefresh}
                />
                <div className="review-top-page-text">{`${currentPage} / ${totalPages} 페이지`}</div>
                <img
                    className="review-top-pages-next-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_forwardicon.svg').default}
                    onClick={() => goToNextPage(finalKeyword)}
                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                />
                <img
                    className="rboard-top-pages-back-icon"
                    alt=""
                    src={require('./assets/rboard-top_pages_back.svg').default}
                    onClick={() => goToPreviousPage(finalKeyword)}

                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                />
                <div className="review-child"/>

                {reviews.map((review)=>(
                    <Link to={`/review/detail/${review.review.rb_idx}/${currentPage}`} key={review.review.rb_idx}>
                    <div className="review-list-box">
                <img
                    className="review-list-box-img-icon"
                    alt=""
                    src={review.ciPhoto}
                />
                <div className="review-list-subject-text">
                    <p className="p">{review.review.rb_subject}</p>
                </div>
                <img className="logo-icon" alt="" src={review.mPhoto}/>
                <div className="review-list-user-time">{review.mNicname} ·
                    {timeForToday(review.review.rb_writeday)}</div>
                <div className="review-list-rb-type">
                    <p className="p1">{`리뷰 종류 : `}{reviewTypes[review.review.rb_type]}</p>
                </div>
                <b className="review-list-companyname">{review.ciName}</b>
                <div className="review-list-box-star-text">{review.review.rb_star}.0</div>
                <div className="review-list-box-star-icons">
                    <StarRating rating={review.review.rb_star} />
                </div>

                <div className="review-bottom-bar"/>
                <div className="review-list-box-icons">
                <div className="review-list-box-header-comment-parent">
                    <div className="review-list-box-header-comment">9.9k</div>
                    <img
                        className="review-list-box-header-comment-icon"
                        alt=""
                        src={require('./assets/review_list_box_header_comments_icon.svg').default}
                    />
                </div>
                <div className="review-list-box-header-likes-t-parent">
                    <div className="review-list-box-header-likes-t">{review.review.rb_like}</div>
                    <img
                        className="review-ist-box-header-like-icon"
                        alt=""
                        src={require('./assets/review_list_box_header_likes_icon.svg').default}
                    />
                </div>
                <div className="review-list-box-header-views-t-parent">
                    <div className="review-list-box-header-comment">{review.review.rb_readcount}</div>
                    <img
                        className="review-list-box-header-view-icon"
                        alt=""
                        src={require('./assets/review_list_box_header_views_icon.svg').default}
                    />
                </div>
                </div>
                    </div>
                    </Link>
                ))}:

                <div className="review-bottom-page-text">{`${currentPage} / ${totalPages} 페이지`}</div>
                <img
                    className="review-bottom-page-next-icon"
                    alt=""
                    src={require('./assets/review_pages_paging_forwardicon.svg').default}
                    onClick={() => goToNextPage(finalKeyword)}

                    style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
                />
                <img
                    className="review-bottom-page-pre-icon"
                    alt=""
                    src={require('./assets/rboard-top_pages_back.svg').default}
                    onClick={() => goToPreviousPage(finalKeyword)}

                    style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
                />
            </div>
        );
    };


export default Reviewlist;