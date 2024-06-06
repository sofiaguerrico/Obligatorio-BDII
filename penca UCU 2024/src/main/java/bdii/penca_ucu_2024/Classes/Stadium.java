package bdii.penca_ucu_2024.Classes;

public class Stadium {
    int ID_estadio;
    String nombre_estadio;
    String direccion_estadio;

    public String getNombre_estadio() {
        return nombre_estadio;
    }

    public int getID_estadio() {
        return ID_estadio;
    }

    public void setNombre_estadio(String nombre_estadio) {
        this.nombre_estadio = nombre_estadio;
    }

    public void setID_estadio(int id_estadio) {
        this.ID_estadio = id_estadio;
    }

    public String getDireccion_estadio() {return direccion_estadio;}

    public void setDireccion_estadio(String direccion_estadio) { this.direccion_estadio = direccion_estadio; }
}
