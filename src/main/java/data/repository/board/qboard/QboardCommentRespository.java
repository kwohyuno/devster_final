package data.repository.board.qboard;

import data.entity.QboardCommentEntity;
import data.entity.QboardEntity;
import data.entity.QboardLikeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QboardCommentRespository extends JpaRepository<QboardCommentEntity, Integer> {
//    List<QboardCommentEntity> findAllByQBidxAndQBcrefEquals0(int qb_idx);
    List<QboardCommentEntity> findAllByQBidxAndQBcrefEquals(int QBidx, int QBcref);
    List<QboardCommentEntity> findAllByQBcref(int qb_idx);
    int countAllByQBidx(int qb_idx);
    int countAllByQBcref(int qbc_idx);
    void deleteAllByQBcref(int qbc_idx);
}
