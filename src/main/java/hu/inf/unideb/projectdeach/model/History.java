package hu.inf.unideb.projectdeach.model;


import ch.qos.logback.core.net.HardenedObjectInputStream;
import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.views.Views;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "history")
public class History {

    @Id
    @Column(name="id")
    @JsonView(Views.Base.class)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    @JsonView(Views.Base.class)
    @Column
    private String competitionName;

    @JsonView(Views.Base.class)
    @Column
    private Date playDate;

    @JsonView(Views.Base.class)
    @Column
    private String teamName;

    @JsonView(Views.Base.class)
    @Column
    private String playersName;

    @JsonView(Views.Base.class)
    @Column
    private String playersNickname;

    @JsonView(Views.Base.class)
    @Column
    private String streamLink;

    @JsonView(Views.Base.class)
    @Column
    private String leaderName;

    @JsonView(Views.Base.class)
    @Column
    private Long place;

    public History() {}

    public History(Long historyId, String competitionName, Date playDate, String teamName,
                   String playersName, String playersNickname, String streamLink,
                   String leaderName, Long place) {
        this.historyId=historyId;
        this.competitionName=competitionName;
        this.playDate=playDate;
        this.teamName=teamName;
        this.playersName=playersName;
        this.playersNickname=playersNickname;
        this.streamLink=streamLink;
        this.leaderName=leaderName;
        this.place=place;
    }

    public Long getId() {
        return historyId;
    }

    public void setId(Long id) {
        this.historyId = id;
    }

    public History(Long historyId) {
        this.historyId=historyId;
    }

    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
    }

    public String getCompetitionName() {
        return competitionName;
    }

    public void setCompetitionName(String competitionName) {
        this.competitionName = competitionName;
    }

    public Date getPlayDate() {
        return playDate;
    }

    public void setPlayDate(Date playDate) {
        this.playDate = playDate;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getPlayersName() {
        return playersName;
    }

    public void setPlayersName(String playersName) {
        this.playersName = playersName;
    }

    public String getPlayersNickname() {
        return playersNickname;
    }

    public void setPlayersNickname(String playersNickname) {
        this.playersNickname = playersNickname;
    }

    public String getStreamLink() {
        return streamLink;
    }

    public void setStreamLink(String streamLink) {
        this.streamLink = streamLink;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    public Long getPlace() {
        return place;
    }

    public void setPlace(Long place) {
        this.place = place;
    }
}
