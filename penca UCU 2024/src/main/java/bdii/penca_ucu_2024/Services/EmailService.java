package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Alumn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PredictionService predictionService;

    @Autowired
    private PlayMatchService playsMatchService;

    @Scheduled(cron = "0 0 9 * * ?", zone = "America/Montevideo")
    public void sendingEmail() {
        if(playsMatchService.todayPlays()) {
            List<Alumn> alumnos = predictionService.noPrediction();
            int countEmails = 0;
            for (Alumn alumno : alumnos) {
                countEmails += sendPersonalizedEmail(alumno);
            }
            System.out.println(countEmails + " Emails enviados");
        }else System.out.println("No hay partidos hoy");
    }

    @Async
    public int sendPersonalizedEmail(Alumn alumno) {
        String template = """
                Hola, ${nombre}!

                Hoy hay partido y no has cargado tu predicción aún.

                No pierdas la oportunidad de sumar puntos!

                Saludos,
                La organización de la Penca UCU""";
            String personalizedTemplate = template.replace("${nombre}", alumno.getNombre_alumno());
            String subject = "¡Predicción del alumno " + alumno.getNombre_alumno() + "!";
            return sendEmail(alumno.getCorreo_estudiantil(), subject, personalizedTemplate);
    }

    public int sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        return 1;
    }
}
