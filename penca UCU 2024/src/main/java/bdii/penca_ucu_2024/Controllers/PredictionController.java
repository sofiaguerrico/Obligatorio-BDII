
package bdii.penca_ucu_2024.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PredictionController {



    public PredictionController() {
    }

    @GetMapping("/get")
    public ResponseEntity<String> list() {
        return  ResponseEntity.ok("1");
    }
}
