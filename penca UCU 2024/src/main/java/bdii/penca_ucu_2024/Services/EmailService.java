package bdii.penca_ucu_2024.Services;

import bdii.penca_ucu_2024.Classes.Alumn;
import bdii.penca_ucu_2024.Classes.Plays_match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private AlumnService alumnService;
    @Autowired
    private PlayMatchService playsMatchService;

    @Scheduled(cron = "0 0 8 * * ?", zone = "America/Montevideo")
    public void sendingEmail() {
        if(playsMatchService.todayPlays()) {
            String template = "Hello, ${firstName}!\n\n"
                    + "Remember to enter your plays for today's games\n\n"
                    + "We hope you're having a great day!\n\n"
                    + "Best regards,\n"
                    + "The pencaUCU team";

            List<String> correos = alumnService.getCorreos();
            for (String correo : correos) {
                sendPersonalizedEmail(correo);
            }
            System.out.println("EMAILs ENVIADO");
        }else System.out.println("No hay partidos hoy");
    }

    @Async
    public void sendPersonalizedEmail(String correo) {
        String template = "Hello, ${firstName}!\n\n"
                + "Remember to enter your plays for today's games.\n\n"
                + "We hope you're having a great day!\n\n"
                + "Best regards,\n"
                + "The pencaUCU team";
        Alumn alumn = alumnService.findByEmail(correo);
        if (alumn != null) {
            String personalizedTemplate = template.replace("${firstName}", alumn.getNombre_alumno());
            String subject = "Hello, " + alumn.getNombre_alumno() + "!";
            sendEmail(correo, subject, personalizedTemplate);
        }
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
}
