package hu.inf.unideb.projectdeach.service;

import hu.inf.unideb.projectdeach.dto.PlayerDTO;
import hu.inf.unideb.projectdeach.dto.PlayerList;
import hu.inf.unideb.projectdeach.dto.ResponseDTO;
import hu.inf.unideb.projectdeach.model.Player;
import hu.inf.unideb.projectdeach.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {

    @Autowired
    PlayerRepository playerRepository;

    public PlayerList getPlayers(String page) {
        PlayerList playerList = new PlayerList();
        int i = Integer.parseInt(page);
        playerList.setData(playerRepository.findAll(PageRequest.of(i, 10)).getContent());
        return playerList;
    }

    public ResponseDTO addPlayer(Player res) {
        Long id = playerRepository.save(res).getId();
        return new ResponseDTO(id, "Játékos sikeresen hozzáadva.");
    }

    public ResponseDTO updatePlayer(Long playerId, Player res) {
        if (playerRepository.existsById(playerId)) {
            res.setId(playerId);
            playerRepository.save(res);
            return new ResponseDTO(playerId,"Játékos adatai sikeresen frissítve.");
        } else {
            return new ResponseDTO(playerId, "Nincs játékos ilyen azonosítóval!");
        }
    }

    public ResponseDTO deletePlayer(Long id){
        if (playerRepository.existsById(id)) {
            playerRepository.deleteById(id);
            return new ResponseDTO(id, "Játékos sikeresen törölve.");
        } else {
            return new ResponseDTO(id, "Nincs játékos ilyen azonosítóval!");
        }
    }

    public Long getCount() {
        return playerRepository.count();
    }
}
