
package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.Repositories.PredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PredictionController {

    @Autowired
    PredictionRepository pr;

    @GetMapping({"/get"})
    public ResponseEntity<List<Prediction>> list() {
        System.out.println("PruebaController");
        List<Prediction> result = pr.getAll();
        return new ResponseEntity(result, HttpStatus.OK);
    }
}
