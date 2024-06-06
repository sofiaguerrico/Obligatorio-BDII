package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Plays_match;
import bdii.penca_ucu_2024.Services.PlayMatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Plays_matchController {

    @Autowired
    PlayMatchService pm;

    @PostMapping("/playmatch/")
    public boolean insert(@RequestBody Plays_match match) {
        return pm.insert(match);
    }
}
