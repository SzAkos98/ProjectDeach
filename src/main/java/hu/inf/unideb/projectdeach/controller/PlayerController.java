package hu.inf.unideb.projectdeach.controller;

import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.dto.PlayerDTO;
import hu.inf.unideb.projectdeach.dto.PlayerList;
import hu.inf.unideb.projectdeach.dto.ResponseDTO;
import hu.inf.unideb.projectdeach.model.Player;
import hu.inf.unideb.projectdeach.service.PlayerService;
import hu.inf.unideb.projectdeach.views.Views;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/players", produces = "application/json")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private ModelMapper modelMapper;

    @JsonView(Views.FromPlayer.class)
    @GetMapping(value = "/players")
    public @ResponseBody
    PlayerList fetchAll(@RequestParam String page) {
        return playerService.getPlayers(page);
    }

    @GetMapping(value = "/playercount")
    public @ResponseBody long getCount() {
        return playerService.getCount();
    }

    @PostMapping(value = "/players", consumes = "applicaton/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO addNewPlayer(@RequestBody PlayerDTO res) {
        return playerService.addPlayer(modelMapper.map(res, Player.class));
    }

    @PutMapping(value = "players/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO update(@PathVariable("id") Long id, @RequestBody PlayerDTO res) {
        return playerService.updatePlayer(id, modelMapper.map(res, Player.class));
    }

    @DeleteMapping(value = "players/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO delete(@PathVariable("id") Long id) {
        return playerService.deletePlayer(id);
    }
}
