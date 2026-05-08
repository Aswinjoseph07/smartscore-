package Smartscore.cgpa_gpa_calculator.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subjects")
@Data   // Lombok: adds getters, setters, toString automatically
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private int semester;
    private String subjectCode;
    private String subjectName;
    private int credits;
}
