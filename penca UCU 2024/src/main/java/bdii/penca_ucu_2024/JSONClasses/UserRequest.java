package bdii.penca_ucu_2024.JSONClasses;

import bdii.penca_ucu_2024.Classes.Admin;
import bdii.penca_ucu_2024.Classes.Alumn;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserRequest implements UserDetails {

    private Alumn alumni;
    private Admin admin;
    private String password;
    private Role role;

    public Alumn getAlumni() {
        return alumni;
    }

    public Role getRole() {
        return role;
    }
    public void setAlumni(Alumn alumn) {
        this.alumni = alumn;
    }

    public Admin getAdministrador() {
        return admin;
    }

    public void setAdministrador(Admin admin) {
        this.admin = admin;
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
            return alumni.getPassword_alumno();
        } else if (admin != null) {
            return admin.getPassword_Admin();
        }
        return null;
    }

    @Override
    public String getUsername() {
        if (alumni != null) {
            return alumni.getCorreo_estudiantil();
        } else if (admin != null) {
            return admin.getCorreo_Admin();
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
