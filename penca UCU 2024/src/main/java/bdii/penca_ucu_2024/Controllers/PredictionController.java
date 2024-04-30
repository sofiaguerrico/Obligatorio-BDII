
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Prediction;
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

    @GetMapping("/get")
    public ResponseEntity<List<Prediction>> list() {
        System.out.println("PruebaController");
        List<Prediction> result = pr.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<Integer> insertPrediction(@RequestBody Integer predictionId) {
        System.out.println("PruebaControllerInsert");
        Integer resultado = pr.setId(predictionId);
        return new ResponseEntity(resultado, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<List<Prediction>> deletePrediction(@RequestBody int predictionId) {
        System.out.println("PruebaControllerDelete");
        List<Prediction> result = pr.deletePrediction(predictionId);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
