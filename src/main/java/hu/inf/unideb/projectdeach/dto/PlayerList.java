package hu.inf.unideb.projectdeach.dto;

import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.model.Player;
import hu.inf.unideb.projectdeach.views.Views;

import java.util.List;

public class PlayerList {

    @JsonView(Views.FromPlayer.class)

    private List<Player> data;
    private Long count;

    public List<Player> getData() {
        return data;
    }

    public void setData(List<Player> data) {
        this.data = data;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
