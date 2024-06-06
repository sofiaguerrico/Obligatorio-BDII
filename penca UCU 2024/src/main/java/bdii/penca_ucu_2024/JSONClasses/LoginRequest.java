package bdii.penca_ucu_2024.JSONClasses;

public class LoginRequest {
    String correo;
    String password;

    public String getCorreo() {return correo;}

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
