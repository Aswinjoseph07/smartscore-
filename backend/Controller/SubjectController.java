package Smartscore.cgpa_gpa_calculator.Controller;

import Smartscore.cgpa_gpa_calculator.model.Subject;
import Smartscore.cgpa_gpa_calculator.Service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173") // ✅ Correct frontend port
public class SubjectController {

    private final SubjectService subjectService;

    @Autowired
    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping("/{subjectCode}")
    public ResponseEntity<Subject> getSubjectByCode(@PathVariable String subjectCode) {
        List<Subject> subjects = subjectService.getSubjectsBySubjectCode(subjectCode);

        if (subjects.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            // ✅ Return only the first subject instead of a list
            return ResponseEntity.ok(subjects.get(0));
        }
    }
}
