package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.Services.AlumnService;
import bdii.penca_ucu_2024.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    UserService userService;
    @Autowired
    AlumnService as;

    @GetMapping("/admin/getAll")
    public ResponseEntity<Object> getAll() {
        if(userService.isAdmin()){
            List<Alumn> alumns = as.findAll();
            return ResponseEntity.ok(alumns);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permiso para acceder a este recurso.");
    }

    @GetMapping("/isadmin")
    public boolean get() {
        return userService.isAdmin();
    }
}
