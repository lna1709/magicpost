package web.uet.backend.common.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import web.uet.backend.common.annotation.impl.DeliveryPdfNameValidator;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = DeliveryPdfNameValidator.class)
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidateDeliveryPdfName {
  String message() default "Invalid delivery pdf name format";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
