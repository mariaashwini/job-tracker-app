import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { saveUserToLocalStorage } from "../utils/userStorage";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/layout/FormWrapper";

const validationSchema = Yup.object({
  fullname: Yup.string()
    .min(3, "Name must be atleast 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be atleast 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function generateId() {
  return (
    "id_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 8)
  );
}
export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.jpg')" }}
    >
      <FormWrapper title="Create an Account">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const newUser = {
              id: generateId(),
              name: values.fullname,
              email: values.email,
              password: values.password,
            };
            console.log("Registered:", newUser);
            setSubmitted(true);
            saveUserToLocalStorage(newUser);
            setTimeout(() => setSubmitted(false), 3000);
            resetForm();
            navigate("/login");
          }}
        >
          <Form className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <Field
                type="text"
                name="fullname"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
              />
              <ErrorMessage
                name="fullname"
                className="text-red-400 text-sm"
                component="div"
              />

              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                className="text-red-400 text-sm"
                component="div"
              />

              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                className="text-red-400 text-sm"
                component="div"
              />

              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                className="text-red-400 text-sm"
                component="div"
              />
              <div className="mx-auto mt-6 text-center">
                <button
                  type="submit"
                  className="w-[90%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                >
                  Sign Up
                </button>
              </div>
              {submitted && (
                <p className="success">✅ Registered Successfully</p>
              )}
            </div>
          </Form>
        </Formik>
      </FormWrapper>
    </div>
  );
}
