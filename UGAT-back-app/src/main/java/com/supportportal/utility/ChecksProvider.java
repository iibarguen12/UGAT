package com.supportportal.utility;

public class ChecksProvider {

    public static Boolean stringIsNotNull(String inValue){
        String value = inValue.replace("\"","").trim();
        if (value instanceof String){
            if (value != null && !value.equals("null") && value!= "" && !value.equals("\"\"") && !value.isEmpty()){
                return true;
            }
        }
        return false;
    }

}
