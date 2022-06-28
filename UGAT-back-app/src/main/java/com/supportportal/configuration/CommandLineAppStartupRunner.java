package com.supportportal.configuration;

import com.supportportal.domain.User;
import com.supportportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.persistence.NonUniqueResultException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.supportportal.enumeration.Role.ROLE_SUPER_ADMIN;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User currentAdmin = null;
        try {
            currentAdmin = userRepository.findUserByUsername("admin");
        }catch (Exception ex){
            List<User> admins = userRepository
                    .findAll()
                    .stream()
                    .filter(user -> "admin".equals(user.getUsername()))
                    .collect(Collectors.toList());
            userRepository.deleteAll(admins);
        }

        if (currentAdmin == null){
            User newAdmin = new User();
            String password = "UGAT_admin_1";
            newAdmin.setUserId(String.valueOf(1));
            newAdmin.setFirstName("Admin site");
            newAdmin.setLastName(null);
            newAdmin.setJoinDate(new Date());
            newAdmin.setUsername("admin");
            newAdmin.setEmail(null);
            newAdmin.setPassword(encodePassword(password));
            newAdmin.setActive(true);
            newAdmin.setNotLocked(true);
            newAdmin.setRole(ROLE_SUPER_ADMIN.name());
            newAdmin.setAuthorities(ROLE_SUPER_ADMIN.getAuthorities());
            newAdmin.setProfileImageUrl(null);
            userRepository.save(newAdmin);
        }

    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }
}
