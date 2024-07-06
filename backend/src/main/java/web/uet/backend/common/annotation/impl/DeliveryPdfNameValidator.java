package web.uet.backend.common.annotation.impl;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import web.uet.backend.common.annotation.ValidateDeliveryPdfName;

import java.util.regex.Pattern;

@Aspect
@Component
public class DeliveryPdfNameValidator implements ConstraintValidator<ValidateDeliveryPdfName, String> {

    private static final String DELIVERY_ID_PATTERN = "^delivery_[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}\\.pdf";

    @Override
    public void initialize(ValidateDeliveryPdfName constraintAnnotation) {
        // No initialization needed
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        boolean isValid = value != null && Pattern.matches(DELIVERY_ID_PATTERN, value);
        if (!isValid) {
            throw new IllegalArgumentException("Invalid delivery pdf name format");
        }
        return true;
    }
}