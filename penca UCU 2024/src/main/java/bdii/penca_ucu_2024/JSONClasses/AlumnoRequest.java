package bdii.penca_ucu_2024.JSONClasses;

import bdii.penca_ucu_2024.Classes.Alumno;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class AlumnoRequest implements UserDetails {
    public Alumno alumni;
    public String password;


    public Alumno getAlumni() {
        return this.alumni;
    }
    public String getPassword() {
        return password;
    }

    public void setAlumni(Alumno alumni) {
        this.alumni = alumni;
    }
    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(("user")));
    }

    @Override
    public String getUsername() {
        return getAlumni().getCorreo_estudiantil();
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
