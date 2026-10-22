package com.clixcode.clixpractice;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudentService {

    private final StudentInterface st;

    public StudentService(StudentInterface st) {
        this.st = st;
    }

    public List<Student> getAllStudents()
    {
        return st.findAll();
    }

    public Student getStudentById(Integer id)
    {
        return st.findById(id).orElse(null);
    }

    public Student addStudent(Student student)
    {
        return st.save(student);
    }

    public Student updateStudent(Integer id, Student student)
    {
        student.setId(id);
        return st.save(student);
    }

    public void deleteStudent(Integer id)
    {
        st.deleteById(id);
    }
}