package Smartscore.cgpa_gpa_calculator.Service;

import Smartscore.cgpa_gpa_calculator.model.Subject;
import  Smartscore.cgpa_gpa_calculator.Repository.SubjectRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getSubjectsBySubjectCode(String subjectCode) {
        return subjectRepository.findBySubjectCode(subjectCode);
    }
}
