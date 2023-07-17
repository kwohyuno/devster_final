package data.controller;

import java.util.List;
import java.util.Map;

import data.dto.CompanyInfoDto;
import data.dto.ReviewDto;
import data.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    private final Logger logger = LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPagedReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return new ResponseEntity<>(reviewService.getPagedReviews(page, size), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<ReviewDto> insertReview(@RequestBody ReviewDto dto) {
        return new ResponseEntity<ReviewDto>(reviewService.insertReview(dto),HttpStatus.OK);
    }

    @GetMapping("/{rb_idx}")
    public ResponseEntity<Map<String, Object>> getOneReview(@PathVariable int rb_idx) {
        return new ResponseEntity<>(reviewService.getOneReview(rb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/{rb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int rb_idx) {
        reviewService.deleteById(rb_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{rb_idx}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable int rb_idx, @RequestBody ReviewDto dto){
        reviewService.updateReview(rb_idx, dto);
        return new ResponseEntity<ReviewDto>(HttpStatus.OK);
    }

    @PostMapping("/{m_idx}/like/{rb_idx}")
    public ResponseEntity<ReviewDto> likeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.like(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @PostMapping("/{m_idx}/dislike/{rb_idx}")
    public ResponseEntity<ReviewDto> dislikeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.dislike(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @GetMapping("/{m_idx}/checkGood/{rb_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int m_idx, @PathVariable int rb_idx) {
        boolean isGood = reviewService.isAlreadyAddGoodRp(m_idx, rb_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/{m_idx}/checkBad/{rb_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int m_idx, @PathVariable int rb_idx) {
        boolean isBad = reviewService.isAlreadyAddBadRp(m_idx, rb_idx);
        return ResponseEntity.ok(isBad);
    }


    @GetMapping("/search")
    public ResponseEntity<List<CompanyInfoDto>> searchCompany(@RequestParam String keyword) {
//        System.out.println(keyword+"key");
        return new ResponseEntity<List<CompanyInfoDto>>(reviewService.getsearchCompanyname(keyword),HttpStatus.OK);
    }



}
