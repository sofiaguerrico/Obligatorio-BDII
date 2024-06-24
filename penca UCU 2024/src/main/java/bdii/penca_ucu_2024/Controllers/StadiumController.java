package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Stadium;
import bdii.penca_ucu_2024.Services.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StadiumController {

    @Autowired
    StadiumService ss;

    @PostMapping("/stadium/")
    public boolean insertStadium(@RequestBody Stadium stadium) {
        boolean insertion = ss.insert(stadium);
        return insertion;
    }

    @GetMapping("/getStadiums")
    public ResponseEntity<List<Stadium>> getStadiums() {
        List<Stadium> stadiums = ss.findAll();
        if(stadiums == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok().body(stadiums);
    }
}
