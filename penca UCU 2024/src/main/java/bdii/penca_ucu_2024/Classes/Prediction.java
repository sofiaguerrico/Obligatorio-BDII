package bdii.penca_ucu_2024.Classes;

import java.sql.Date;

public class Prediction {

    String correo_estudiantil;
    String equipo1;
    String equipo2;
    //importar Data sql o java Util
    Date fecha_hora_partido;
    int gol_equipo1;
    int gol_equipo2;

    public String getCorreo_estudiantil() {
        return correo_estudiantil;
    }

    public void setCorreo_estudiantil(String correo_estudiantil) {
        this.correo_estudiantil = correo_estudiantil;
    }

    public String getEquipo1() {
        return equipo1;
    }

    public void setEquipo1(String equipo1) {
        this.equipo1 = equipo1;
    }

    public String getEquipo2() {
        return equipo2;
    }

    public void setEquipo2(String equipo2) {
        this.equipo2 = equipo2;
    }

    public Date getFecha_hora_partido() {
        return fecha_hora_partido;
    }

    public void setFecha_hora_partido(Date fecha_hora_partido) {
        this.fecha_hora_partido = fecha_hora_partido;
    }

    public int getGol_equipo1() {
        return gol_equipo1;
    }

    public void setGol_equipo1(int gol_equipo1) {
        this.gol_equipo1 = gol_equipo1;
    }

    public int getGol_equipo2() {
        return gol_equipo2;
    }

    public void setGol_equipo2(int gol_equipo2) {
        this.gol_equipo2 = gol_equipo2;
    }
}
