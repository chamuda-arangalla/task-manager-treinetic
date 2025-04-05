package com.example.task_manager.service;

import com.example.task_manager.exception.NotFoundException;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailService {

    UserDetails loadUserByUsername(String username) throws NotFoundException;
}
