package com.clixcode.clixpractice;

import org.springframework.data.jpa.repository.JpaRepository;


public interface StudentInterface extends JpaRepository<Student, Integer> {

}
