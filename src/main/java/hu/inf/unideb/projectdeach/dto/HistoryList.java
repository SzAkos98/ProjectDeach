package hu.inf.unideb.projectdeach.dto;

import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.model.History;
import hu.inf.unideb.projectdeach.views.Views;

import java.util.List;

public class HistoryList {

    @JsonView(Views.FromHistory.class)

    private List<History> data;
    private Long count;

    public List<History> getData() {
        return data;
    }

    public void setData(List<History> data) {
        this.data = data;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
