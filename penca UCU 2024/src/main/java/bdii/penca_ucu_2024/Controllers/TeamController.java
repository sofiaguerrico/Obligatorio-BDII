package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Classes.Team;
import bdii.penca_ucu_2024.Services.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TeamController {

    @Autowired
    TeamService ts;


    @GetMapping("/getTeams")
    public List<Team> getAllTeams() {
        return ts.getAll();
    }

    @PostMapping("/team/")
    public boolean insert(@RequestBody Team team) {
        return ts.insert(team);
    }
}
