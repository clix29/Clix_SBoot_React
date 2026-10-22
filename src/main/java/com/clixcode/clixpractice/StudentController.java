package com.clixcode.clixpractice;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    private final StudentService st;

    public StudentController(StudentService st) {
        this.st = st;
    }

    @GetMapping
    public List<Student> getAllStudents()
       {
           return st.getAllStudents();
       }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Integer id)
    {
        return st.getStudentById(id);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student)
    {
         return st.addStudent(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Integer id, @RequestBody Student student)
    {
        student.setId(id);
        return st.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Integer id)
    {
        st.deleteStudent(id);
    }
}
