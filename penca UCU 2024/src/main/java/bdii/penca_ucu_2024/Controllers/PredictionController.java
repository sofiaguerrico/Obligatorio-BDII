package bdii.penca_ucu_2024.Controllers;

import bdii.penca_ucu_2024.Classes.Prediction;
import bdii.penca_ucu_2024.JSONClasses.AuthResponse;
import bdii.penca_ucu_2024.Services.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
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

    @PutMapping("/prediction/modify/")
    public ResponseEntity<String> modifyPrediction(@RequestBody Prediction prediction) {
        if(pr.modifyPrediction(prediction)){
            return ResponseEntity.status(HttpStatus.OK).body("Modificación exitosa");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No existe prediccion");
        }
    }

    @GetMapping("/prediction/user/")
    public ResponseEntity<Prediction> getPrediction(@RequestHeader("correo_estudiantil") String correo_estudiantil,
                                    @RequestHeader("equipo1") String equipo1,
                                    @RequestHeader("equipo2") String equipo2,
                                    @RequestHeader("fecha_hora_partido") Date fecha_hora_partido) {
        Prediction prediction = new Prediction();
        prediction.setCorreo_estudiantil(correo_estudiantil);
        prediction.setEquipo1(equipo1);
        prediction.setEquipo2(equipo2);
        prediction.setFecha_hora_partido(fecha_hora_partido);
        prediction = pr.findPrediction(prediction);
        if(prediction != null){
            return ResponseEntity.ok(prediction);
        }else{
            return ResponseEntity.notFound().build();
        }

    }
}
