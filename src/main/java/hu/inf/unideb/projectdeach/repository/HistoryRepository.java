package hu.inf.unideb.projectdeach.repository;

import hu.inf.unideb.projectdeach.model.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface HistoryRepository  extends PagingAndSortingRepository<History, Long> {
    Page<History> findAll(Pageable pageable);
}
