import { object, string } from "yup";

export const signinFormValidation = object({
    email: string().email().required("This field is required."),
    password: string()
        .required("No password provided.")
});
