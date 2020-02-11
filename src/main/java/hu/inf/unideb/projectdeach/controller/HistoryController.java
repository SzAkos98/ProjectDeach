package hu.inf.unideb.projectdeach.controller;


import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.dto.*;
import hu.inf.unideb.projectdeach.model.History;
import hu.inf.unideb.projectdeach.service.HistoryService;
import hu.inf.unideb.projectdeach.views.Views;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value ="/history", produces = "application/json")
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @Autowired
    private ModelMapper modelMapper;

    @JsonView(Views.FromHistory.class)
    @GetMapping(value = "/history")
    public @ResponseBody
    HistoryList fetchAllHistory(@RequestParam String page) {
        return historyService.getHistory(page);
    }

    @GetMapping(value = "/historycount")
    public @ResponseBody long getCount() {
        return historyService.getCount();
    }

    @PostMapping(value = "/history", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseDTO addNewHistory(@RequestBody HistoryDTO res) {
        return historyService.addHistory(modelMapper.map(res, History.class));
    }

    @PutMapping(value = "history/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO update(@PathVariable("id") Long id, @RequestBody HistoryDTO res) {
        return historyService.updateHistory(id, modelMapper.map(res, History.class));
    }

    @DeleteMapping(value = "history/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseDTO delete(@PathVariable("id") Long id) {
        return historyService.deleteHistory(id);
    }
}
