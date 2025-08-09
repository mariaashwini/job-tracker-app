import { ErrorMessage, Field, Form, Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { getUserFromLocalStorage } from "../utils/userStorage";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import FormWrapper from "../components/layout/FormWrapper";


const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
export default function Login() {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login } = useContext(UserContext);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.jpg')" }}
    >
      <FormWrapper title="Log In">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            setTimeout(() => {
              const users = getUserFromLocalStorage();
              const matchedUser = users.find(
                (user) =>
                  user.email === values.email &&
                  user.password === values.password
              );
              if (matchedUser) {
                console.log(matchedUser);
                login(matchedUser);
                setLoginSuccess(true);
                setTimeout(() => navigate("/dashboard/jobs"), 1000);
              } else {
                setErrors({ password: "Invalid email or password" });
                setLoginSuccess(false);
              }
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col justify-between h-full">
              <div className="space-y-4">
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
                <div className="mx-auto mt-6 text-center py-2 border-b border-white">
                  <button
                    type="submit"
                    className="w-[90%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in ..." : "Login"}
                  </button>
                </div>
                <p class="text-center">
                  New User ?{" "}
                  <Link
                    to="/register"
                    className="text-blue-400 hover:underline"
                  >
                    Sign Up here
                  </Link>
                </p>
                {/* <a href="#" class="text-blue-700 font-bold mx-2">Sign Up here</a> */}

                {isSubmitting && <div className="spinner"></div>}

                {loginSuccess && (
                  <div className="success">✅ Login Successful</div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </div>
  );
}
