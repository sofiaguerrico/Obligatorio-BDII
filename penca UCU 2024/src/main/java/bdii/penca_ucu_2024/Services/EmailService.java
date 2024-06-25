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
    private AlumnService alumnService;

    @Autowired
    private PlayMatchService playsMatchService;

    @Scheduled(cron = "0 0/1 * * * ?", zone = "America/Montevideo")
    public void sendingEmail() {
        if(playsMatchService.todayPlays()) {
            List<Alumn> alumnos = PredictionService.noPrediction();
            for (Alumn alumno : alumnos) {
                sendPersonalizedEmail(alumno);
            }
            System.out.println("EMAILs ENVIADO");
        }else System.out.println("No hay partidos hoy");
    }

    @Async
    public void sendPersonalizedEmail(Alumn alumno) {
        String template = """
                Hola, ${nombre}!

                En 1 hora comienza un partido y no has cargado tu predicción aún.

                No pierdas la oportunidad de sumar puntos!

                Saludos,
                La organización de la Penca UCU""";
            String personalizedTemplate = template.replace("${nombre}", alumno.getNombre_alumno());
            String subject = "¡Predicción del alumno " + alumno.getNombre_alumno() + "!";
            sendEmail(alumno.getCorreo_estudiantil(), subject, personalizedTemplate);
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
