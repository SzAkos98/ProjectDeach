package hu.inf.unideb.projectdeach.dto;

import java.sql.Date;

public class HistoryDTO {

    private Long historyId;
    private String competitionName;
    private Date playDate;
    private String teamName;
    private String playersName;
    private String playersNickname;
    private String streamLink;
    private String leaderName;
    private Long place;

    public HistoryDTO() {}

    public HistoryDTO(Long historyId, String competitionName, Date playDate, String teamName,
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
