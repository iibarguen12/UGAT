package com.supportportal.constant;

public class UserImplConstant {
    public static final String USERNAME_ALREADY_EXISTS = "Username already exists";
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists";
    public static final String NO_USER_FOUND_BY_USERNAME = "No user found by username: ";
    public static final String FOUND_USER_BY_USERNAME = "Returning found user by username: ";
    public static final String NO_USER_FOUND_BY_EMAIL = "No user found for email: ";
    public static final String PASSWORD_VALIDATION_REGEX ="^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z_\\d]{8,}$";
    public static final String PASSWORD_NOT_VALID = "Password must contain minimum eight characters, at least one letter and one number";
    public static final String PASSWORD_NOT_MATCH = "Current password doesn't match";
    public static final String PASSWORD_CHANGED= "Password changed";
    public static final String PASSWORD_CHANGED_ERROR= "Error changing password";
}
