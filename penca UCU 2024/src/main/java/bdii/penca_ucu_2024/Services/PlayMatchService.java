package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Plays_match;
import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.IPlayMatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class PlayMatchService implements IPlayMatchRepository {
    private JdbcTemplate dbConnection;
    @Autowired
    private AlumnService alumnService;
    @Autowired
    private PredictionService predictionService;
    public PlayMatchService(JdbcTemplate dbConnection) {
        this.dbConnection = dbConnection;
    }

    @Override
    public boolean insert(Plays_match match) {
        try{
            String sql = "INSERT INTO juega_partido VALUES (?,?,?,?,?,?,?)";
            this.dbConnection.update(sql,match.getEquipo1(),match.getEquipo2(),match.getFecha_hora_partido(),match.getGol_equipo1(),match.getGol_equipo2(),match.getEtapa(),match.getID_estadio());
            return true;
        }catch(Exception e){
            System.out.println(e);
            return false;
        }
    }

    @Override
    public List<Plays_match> findAll() {
        String sql = "SELECT * FROM juega_partido";
        List<Plays_match> lista = dbConnection.query(sql, new BeanPropertyRowMapper<>(Plays_match.class));
        for(Plays_match match : lista){
            if(Integer.getInteger(String.valueOf(match.getGol_equipo1())) == null)
            {
                match.setGol_equipo1(-1);
                match.setGol_equipo2(-1);
            }
        }
        return lista;
    }

    @Override
    public Plays_match findPlay(String equipo1, String equipo2, String fecha_hora_partido){
        String sql = "SELECT * FROM Juega_partido WHERE equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
        Object[] args = {equipo1, equipo2, fecha_hora_partido};
        List<Plays_match> matches = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Plays_match.class));
        return matches.isEmpty() ? null : matches.get(0);
    }

    @Override
    public Plays_match update(Plays_match match) {
        Plays_match existMatch = findPlay(match.getEquipo1(), match.getEquipo2(), match.getFecha_hora_partido());
        if(existMatch != null) {
            String sql = "UPDATE juega_partido SET gol_equipo1 = ?, gol_equipo2 = ? WHERE equipo1 = ? AND equipo2 = ? AND fecha_hora_partido = ?";
            int rowsAffected = this.dbConnection.update(sql,
                    match.getGol_equipo1(),
                    match.getGol_equipo2(),
                    match.getEquipo1(),
                    match.getEquipo2(),
                    match.getFecha_hora_partido());

            if (rowsAffected > 0) {
                existMatch.setGol_equipo1(match.getGol_equipo1());
                existMatch.setGol_equipo2(match.getGol_equipo2());
                modifyPoints(match.getEquipo1(), match.getEquipo2(), match.getFecha_hora_partido(), match.getGol_equipo1(), match.getGol_equipo2(), existMatch.getEtapa());
                return existMatch;
            } else {
                return new Plays_match();
            }
        }else{
            return null;
        }
    }

    @Override
    public List<Plays_match> findFixture(String stage){
        String sql = "SELECT * FROM Juega_partido WHERE etapa = ?";
        Object[] args = {stage};
        return dbConnection.query(sql, args , new BeanPropertyRowMapper<>(Plays_match.class));
    }

    @Override
    public boolean todayPlays(){
        String sql = "SELECT * FROM Juega_partido WHERE fecha_hora_partido = ?";
        Object[] args = {dateToday()};
        List<Plays_match> matches = dbConnection.query(sql, args, new BeanPropertyRowMapper<>(Plays_match.class));
        return !matches.isEmpty();
    }

    static Date dateToday(){
        LocalDate localDate = LocalDate.now();
        return Date.valueOf(localDate);
    }

    static Date dateTodayPlus1Hour(){
        LocalDateTime localDateTime = LocalDateTime.now().plusHours(1);
        return Date.valueOf(String.valueOf(localDateTime));
    }
  
    @Override
    public boolean modifyPoints(String equipo1, String equipo2, String fecha_hora_partido, int gol_equipo1, int gol_equipo2, String etapa){
        List<Prediction> listPredictions = predictionService.findPredictionForMatch(equipo1, equipo2, fecha_hora_partido);
        int winner = this.winner(gol_equipo1, gol_equipo2);
        int subWinner = (winner == 1) ? 2 : 1;
        boolean b = false;
        for(Prediction prediction : listPredictions) {
            String correo = prediction.getCorreo_estudiantil();
            int predictionWinner = this.winner(prediction.getGol_equipo1(), prediction.getGol_equipo2());
            int predictionSubWinner = (predictionWinner == 1) ? 2 : 1;
            if ("Final".equals(etapa)) {
                boolean stageFinal = pointFinalStage(winner, subWinner, predictionWinner, predictionSubWinner, correo);
            }
            int gol1 = prediction.getGol_equipo1();
            int gol2 = prediction.getGol_equipo2();
            if (gol1 == gol_equipo1 && gol2 == gol_equipo2) {
                b = alumnService.setPoint(4, correo);
            } else if (goodPrediction(gol_equipo1, gol_equipo2, prediction.getGol_equipo1(), prediction.getGol_equipo2())) {
                b = alumnService.setPoint(2, correo);
            }
        }
        return b;
    }

    private boolean pointFinalStage(int winner, int subWinner, int predictionWinner, int predictionSubWinner, String correo){
        if (predictionWinner == winner && subWinner == predictionSubWinner) {
            return alumnService.setPoint(15, correo);
        } else if (predictionWinner == winner) {
            return alumnService.setPoint(10, correo);
        } else if (subWinner == predictionSubWinner) {
            return alumnService.setPoint(5, correo);
        }
        return false;
    }

    private boolean goodPrediction(int gol1, int gol2, int golPrediction1, int golPrediction2){

        int winnerReal = Integer.compare(gol1, gol2);
        int winnerPrediction = Integer.compare(golPrediction1, golPrediction2);

        return winnerReal == winnerPrediction;
    }

    private int winner(int gol1, int gol2){
        if(gol1 > gol2){
            return 1;
        }
        return 2;
    }
}
