package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Stadium;
import bdii.penca_ucu_2024.Services.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StadiumController {

    @Autowired
    StadiumService ss;

    @PostMapping("/stadium/")
    public boolean insertStadium(@RequestBody Stadium stadium) {
        boolean insertion = ss.insert(stadium);
        return insertion;
    }
}
