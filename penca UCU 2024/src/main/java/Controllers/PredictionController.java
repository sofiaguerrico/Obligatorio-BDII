
package Controllers;
import Repositories.PredictionRepository;

import Classes.Prediction;
import Repositories.PredictionRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"api/prediction"})
@CrossOrigin({"*"})


public class PredictionController {


    private final PredictionRepository predictionRepository;

    public PredictionController(PredictionRepository predictionRepository) {
        this.predictionRepository = predictionRepository;
    }

    @GetMapping({"/get"})
    public ResponseEntity<List<Prediction>> list() {
        System.out.println("PruebaController");
        List<Prediction> result = this.predictionRepository.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
