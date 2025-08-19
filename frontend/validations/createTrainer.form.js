import * as yup from "yup";

export const initialValues = {
  name: "",
  lastname: "",
  phone: "",
  medals: [],
};

export const createTrainerSchema = yup.object({
  name: yup.string().required("Name is required"),
  lastname: yup.string().required("Lastname is required"),
  phone: yup.string().required("Phone is required"),
  medals: yup
    .mixed()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean);
      }
      return value;
    })
    .test(
      "is-array",
      "At least one medal is required",
      (value) => Array.isArray(value) && value.length > 0
    ),
});
