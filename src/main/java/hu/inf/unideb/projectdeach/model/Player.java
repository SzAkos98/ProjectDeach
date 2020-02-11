package hu.inf.unideb.projectdeach.model;

import com.fasterxml.jackson.annotation.JsonView;
import hu.inf.unideb.projectdeach.views.Views;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @Column(name="id")
    @JsonView(Views.Base.class)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playerId;

    @JsonView(Views.Base.class)
    @Column
    private String playerName;

    @JsonView(Views.Base.class)
    @Column
    private String playerAddress;

    @JsonView(Views.Base.class)
    @Column
    private String playerMail;

    @JsonView(Views.Base.class)
    @Column
    private Date playerBirthDate;

    @JsonView(Views.Base.class)
    @Column
    private String guardianName;

    @JsonView(Views.Base.class)
    @Column
    private String guardianMail;

    @JsonView(Views.Base.class)
    @Column
    private String gameName;

    @JsonView(Views.Base.class)
    @Column
    private String inGameNickname;

    @JsonView(Views.Base.class)
    @Column
    private String playerState;

    public Player() {

    }

    public Player(Long playerId, String playerName, String playerAddress,
                      String playerMail, Date playerBirthDate,
                      String guardianName, String guardianMail, String gameName,
                      String inGameNickname, String playerState) {
        this.playerId = playerId;
        this.playerName = playerName;
        this.playerAddress = playerAddress;
        this.playerBirthDate = playerBirthDate;
        this.playerMail = playerMail;
        this.guardianMail = guardianMail;
        this.guardianName = guardianName;
        this.gameName = gameName;
        this.inGameNickname = inGameNickname;
        this.playerState = playerState;
    }

    public Player(Long playerId){
        this.playerId = playerId;
    }

    public Long getPlayerId() {
        return playerId;
    }

    public long getId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
    }

    public void setId(Long id) {
        this.playerId = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayerAddress() {
        return playerAddress;
    }

    public void setPlayerAddress(String playerAddress) {
        this.playerAddress = playerAddress;
    }

    public String getPlayerMail() {
        return playerMail;
    }

    public void setPlayerMail(String playerMail) {
        this.playerMail = playerMail;
    }

    public Date getPlayerBirthDate() {
        return playerBirthDate;
    }

    public void setPlayerBirthDate(Date playerBirthDate) {
        this.playerBirthDate = playerBirthDate;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getGuardianMail() {
        return guardianMail;
    }

    public void setGuardianMail(String guardianMail) {
        this.guardianMail = guardianMail;
    }
    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
    }

    public String getInGameNickname() {
        return inGameNickname;
    }

    public void setInGameNickname(String inGameNickname) {
        this.inGameNickname = inGameNickname;
    }

    public String getPlayerState() {
        return playerState;
    }

    public void setPlayerState(String playerState) {
        this.playerState = playerState;
    }
}

