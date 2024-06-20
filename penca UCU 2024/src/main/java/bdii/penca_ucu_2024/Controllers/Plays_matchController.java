package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Plays_match;
import bdii.penca_ucu_2024.Services.PlayMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class Plays_matchController {

    @Autowired
    PlayMatchService pm;

    @PostMapping("/playmatch/")
    public boolean insert(@RequestBody Plays_match match) {
        return pm.insert(match);
    }

    @GetMapping("/playmatch/")
    public List<Plays_match> getAll() {
        return pm.findAll();
    }

    @GetMapping("/playmatch/fixture/")
    public List<Plays_match> getFixtureStage(@RequestHeader("stage") String stage) {
        return pm.findFixture(stage);
    }

    @GetMapping("/admin/playmatch/find/")
    public ResponseEntity<Plays_match> get(@RequestHeader("equipo1") String equipo1,
                                           @RequestHeader("equipo2") String equipo2,
                                           @RequestHeader("fecha_hora_partido") String fechaHeader) {

        Plays_match foundMatch = pm.findPlay(equipo1, equipo2, fechaHeader);
        if (foundMatch != null) {
            return ResponseEntity.ok(foundMatch);
        } else {
            System.out.println("No se encontro el registro");
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/playmatch/modify/")
    public boolean update(@RequestBody Plays_match match) {
        return pm.update(match);
    }

}
