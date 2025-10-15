package Smartscore.cgpa_gpa_calculator.Controller;

import Smartscore.cgpa_gpa_calculator.model.Subject;
import Smartscore.cgpa_gpa_calculator.Service.SubjectService;
import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:3000")  // allow React frontend
public class SubjectController {

    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    // GET /api/subjects/{semester}
    @GetMapping("/{semester}")
    public List<Subject> getSubjects(@PathVariable int semester) {
        return subjectService.getSubjectsBySemester(semester);
    }
}
