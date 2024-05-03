package bdii.penca_ucu_2024.Classes;

public class Administrador {
    int CI;
    String correo_Admin;
    String nombre_Admin;
    String apellido_Admin;
    String genero_Admin;
    int celular_Admin;
    String password_Admin;

    public void setCI(int CI) {
        this.CI = CI;
    }

    public void setCorreo_Admin(String correo_Admin) {
        this.correo_Admin = correo_Admin;
    }

    public void setNombre_Admin(String nombre_Admin) {
        this.nombre_Admin = nombre_Admin;
    }

    public void setApellido_Admin(String apellido_Admin) {
        this.apellido_Admin = apellido_Admin;
    }

    public void setGenero_Admin(String genero_Admin) {
        this.genero_Admin = genero_Admin;
    }

    public void setCelular_Admin(int celular_Admin) {
        this.celular_Admin = celular_Admin;
    }

    public void setPassword_Admin(String password_Admin) {
        this.password_Admin = password_Admin;
    }

    public String getPassword_Admin() {
        return password_Admin;
    }

    public int getCI() {
        return CI;
    }

    public String getCorreo_Admin() {
        return correo_Admin;
    }

    public String getNombre_Admin() {
        return nombre_Admin;
    }

    public String getApellido_Admin() {
        return apellido_Admin;
    }

    public String getGenero_Admin() {
        return genero_Admin;
    }

    public int getCelular_Admin() {
        return celular_Admin;
    }


}
