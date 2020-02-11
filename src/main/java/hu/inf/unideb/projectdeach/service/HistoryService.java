package hu.inf.unideb.projectdeach.service;

import hu.inf.unideb.projectdeach.dto.HistoryList;
import hu.inf.unideb.projectdeach.dto.ResponseDTO;
import hu.inf.unideb.projectdeach.model.History;
import hu.inf.unideb.projectdeach.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    public HistoryList getHistory(String page) {
        HistoryList historyList = new HistoryList();
        int i = Integer.parseInt(page);
        historyList.setData(historyRepository.findAll(PageRequest.of(i, 10)).getContent());
        return historyList;
    }

    public ResponseDTO addHistory(History res) {
        Long id = historyRepository.save(res).getId();
        return new ResponseDTO(id, "Verseny sikeresen hozzáadva.");
    }

    public ResponseDTO updateHistory(Long histroyId, History res) {
        if (historyRepository.existsById(histroyId)) {
            res.setId(histroyId);
            historyRepository.save(res);
            return new ResponseDTO(histroyId,"Verseny adatai sikeresen frissítve.");
        } else {
            return new ResponseDTO(histroyId, "Nincs verseny ilyen azonosítóval!");
        }
    }

    public ResponseDTO deleteHistory(Long id){
        if (historyRepository.existsById(id)) {
            historyRepository.deleteById(id);
            return new ResponseDTO(id, "Verseny sikeresen törölve.");
        } else {
            return new ResponseDTO(id, "Nincs verseny ilyen azonosítóval!");
        }
    }

    public Long getCount() {
        return historyRepository.count();
    }
}
