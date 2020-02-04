package hu.inf.unideb.projectdeach.dto;

public class PlayerDTO {

    private Long playerId;
    private String playerName;
    private String playerAddress;
    private String playerMail;
    private Long playerBirthDate;
    private String guardianName;
    private String guardianMail;
    private String gameName;
    private String inGameNickname;
    private String playerState;

    public PlayerDTO() {
    }

    public PlayerDTO(Long playerId, String playerName, String playerAddress,
                     String playerMail, Long playerBirthDate,
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

    public Long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Long playerId) {
        this.playerId = playerId;
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

    public Long getPlayerBirthDate() {
        return playerBirthDate;
    }

    public void setPlayerBirthDate(Long playerBirthDate) {
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
