package bdii.penca_ucu_2024.Security.jwt;

import bdii.penca_ucu_2024.Classes.Admin;
import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.JSONClasses.Role;
import bdii.penca_ucu_2024.JSONClasses.UserRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${jwt.secret.key}")
    private String secretKey;

    @Value("${jwt.time.expiration}")
    private String timeExpiration;

    //Generar token de acceso
    public String generateAccessToken(String email, String role) {
        return Jwts.builder()
                .claim("role", role)
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(timeExpiration)))
                .signWith(getSignatureKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //Obtener firma del token
    public Key getSignatureKey() {
        byte[] keyBytes = secretKey.getBytes();
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
    }


    //Validar token de acceso
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        try{
//            Jwts.parser()
//                    .setSigningKey(getSignatureKey())
//                    .build()
//                    .parseClaimsJws(token)
//                    .getBody();
//            return true;
//        }catch(Exception e){
//            System.out.println("Token invalido");
//            return false;
//        }
//    }

    // Obtener el mail del token
//    public String getEmail(String token) {
//        return getClaim(token, Claims::getSubject);
//    }
    public String getUsernameFromToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserRequest userRequest) {
        final String username=getUsernameFromToken(token);
        Alumn alumn = userRequest.getAlumni();
        Admin admin = userRequest.getAdministrador();
        Role role = getClaim(token, claims -> Role.valueOf((String) claims.get("role")));

        if (role == null || !role.equals(userRequest.getRole())) {
            return false;
        }

        if(alumn !=null){
            boolean alumnoExiste = username.equals(alumn.getCorreo_estudiantil())&& !isTokenExpired(token);
            return alumnoExiste;
        }
        if(admin!=null){
            boolean adminExiste = username.equals(admin.getCorreo_Admin())&& !isTokenExpired(token);
            return adminExiste;
        }

        return false;
    }

    // se puede hacer otra clase UserRequest para ver si es Admin o Alumno entonces  ahi comparar el correo con el token expired

    private Claims getAllClaims(String token)
    {
        return Jwts
                .parser()
                .setSigningKey(getSignatureKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T getClaim(String token, Function<Claims,T> claimsResolver)
    {
        final Claims claims=getAllClaims(token);
        return claimsResolver.apply(claims);
    }


    private Date getExpiration(String token)
    {
        return getClaim(token, Claims::getExpiration);
    }
    private boolean isTokenExpired(String token)
    {
        return getExpiration(token).before(new Date());
    }
}
