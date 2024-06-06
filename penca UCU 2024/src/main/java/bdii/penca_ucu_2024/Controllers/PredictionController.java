package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PredictionController {

    @Autowired
    PredictionService pr;

    @GetMapping("/prediction/")
    public ResponseEntity<List<Prediction>> list() {
        List<Prediction> result = pr.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }


    @PostMapping("/prediction/")
    public boolean insertPrediction(@RequestBody Prediction prediction) {
        boolean insertion = pr.insert(prediction);
        return insertion;
    }

}
