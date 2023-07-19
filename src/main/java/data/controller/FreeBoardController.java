package data.controller;

import data.dto.FreeBoardDto;
import data.entity.FreeBoardEntity;
import data.service.FreeBoardService;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/fboard")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    public FreeBoardController(FreeBoardService freeBoardService) {
        this.freeBoardService = freeBoardService;
    }

//    @GetMapping
//    public ResponseEntity<List<FreeBoardDto>> getAllFboard(){
//        return new ResponseEntity<List<FreeBoardDto>>(freeBoardService.getAllFboard(), HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPagedFboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(freeBoardService.getPagedFboard(page, size), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<FreeBoardDto> insertFreeBoard(@RequestBody FreeBoardDto dto, HttpSession session){
        return new ResponseEntity<FreeBoardDto>(freeBoardService.insertFreeBoard(dto,session), HttpStatus.OK);
    }

    @PostMapping("/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(freeBoardService.uploadPhoto(upload, session),HttpStatus.OK);
    }

    @PutMapping("/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        freeBoardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @GetMapping("/{fb_idx}")
//    public ResponseEntity<FreeBoardDto> getOneFboard(@PathVariable int fb_idx) {
//        return new ResponseEntity<FreeBoardDto>(freeBoardService.getOneFboard(fb_idx), HttpStatus.OK);
//    }
    @GetMapping("/{fb_idx}")
    public ResponseEntity<Map<String, Object>> getOneFboard(@PathVariable int fb_idx) {
        return new ResponseEntity<>(freeBoardService.getOneFboard(fb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/{fb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int fb_idx){
        freeBoardService.deleteById(fb_idx);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{fb_idx}")
    public ResponseEntity<FreeBoardDto> updateFreeBoard(@PathVariable int fb_idx, @RequestBody FreeBoardDto dto) {
        freeBoardService.updateFreeBoard(fb_idx, dto);
        return new ResponseEntity<FreeBoardDto>(HttpStatus.OK);
    }

    @PostMapping("/photo/{fb_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer fb_idx, @RequestBody MultipartFile upload) {
        freeBoardService.updatePhoto(fb_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public FreeBoardDto escapeDto(FreeBoardDto dto) {
        dto.setFb_subject(StringEscapeUtils.escapeHtml4(dto.getFb_subject()));
        dto.setFb_content(StringEscapeUtils.escapeHtml4(dto.getFb_content()));
        dto.setFb_photo(StringEscapeUtils.escapeHtml4(dto.getFb_photo()));
        return dto;
    }

}
