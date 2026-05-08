package Smartscore.cgpa_gpa_calculator.Repository;

import Smartscore.cgpa_gpa_calculator.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface SubjectRepository extends JpaRepository<Subject,Long> {
    List<Subject> findBySubjectCode(String subjectCode);
}
