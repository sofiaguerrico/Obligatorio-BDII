package bdii.penca_ucu_2024.JSONClasses;

import bdii.penca_ucu_2024.Classes.Administrador;
import bdii.penca_ucu_2024.Classes.Alumno;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserRequest implements UserDetails {

    private Alumno alumni;
    private Administrador administrador;
    private String password;
    private Role role;

    public Alumno getAlumni() {
        return alumni;
    }

    public Role getRole() {
        return role;
    }
    public void setAlumni(Alumno alumno) {
        this.alumni = alumno;
    }

    public Administrador getAdministrador() {
        return administrador;
    }

    public void setAdministrador(Administrador administrador) {
        this.administrador = administrador;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(Role role) {
        this.role = role;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        if (alumni != null) {
            return password; // Alumno tiene su contraseña en la tabla Login
        } else if (administrador != null) {
            return administrador.getPassword_Admin(); // Administrador tiene su contraseña en su clase Administrador
        }
        return null;
    }

    @Override
    public String getUsername() {
        if (alumni != null) {
            return alumni.getCorreo_estudiantil();
        } else if (administrador != null) {
            return administrador.getCorreo_Admin();
        }
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
