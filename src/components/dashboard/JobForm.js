import { Formik, Form, Field, ErrorMessage } from "formik";
// import "../../styles/main.css";
import StatusOptions from "./StatusOptions";
import FormWrapper from "../layout/FormWrapper";
import { useState } from "react";
import Modal from "../layout/Modal";

export default function JobForm({
  onFormSubmit,
  initialValues,
  enableReinitialize = false,
  submitText = "Add Job",
  showPopup,
  setShowPopup,
  title
}) {
  const defaultValues = {
    title: "",
    company: "",
    location: "",
    status: "pending",
    description: "",
    isRemote: false,
  };
  
  return (
    <Modal
      isOpen={showPopup}
      onClose={setShowPopup}
    >
      <FormWrapper title={title}>
        <Formik
          initialValues={initialValues || defaultValues}
          validate={(values) => {
            const errors = {};
            if (!values.title) errors.title = "Job title required";
            if (!values.company) errors.company = "Company required";
            if (!values.location) errors.location = "Location required";
            if (!values.description)
              errors.description = "Description required";

            return errors;
          }}
          enableReinitialize={enableReinitialize}
          onSubmit={(values, { resetForm }) => {
            onFormSubmit(values, resetForm);
          }}
        >
          <Form className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <Field
                type="text"
                name="title"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. React Developer"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-400 text-sm"
              />

              <Field
                type="text"
                name="company"
                placeholder="e.g. Google"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="company"
                component="div"
                className="text-red-400 text-sm"
              />

              <Field
                as="textarea"
                name="description"
                rows="4"
                cols="20"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-400 text-sm"
              />

              <Field
                type="text"
                name="location"
                placeholder="e.g. Chennai"
                className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-400 text-sm"
              />

              <StatusOptions name="status" label="Status" className="w-full px-4 py-2 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

              <div className="flex items-start justify-start">
                <Field
                  type="checkbox"
                  name="isRemote"
                  className="mr-2 h-5 w-5 text-blue-600 accent-blue-600"
                />
                <label htmlFor="isRemote">Remote Job</label>
              </div>
              <ErrorMessage
                name="isRemote"
                component="div"
                className="text-red-400 text-sm"
              />

               <div className="mx-auto mt-6 text-center">
                <button
                  type="submit"
                  className="w-[90%] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
                >
                 {submitText}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </FormWrapper>
    </Modal>
  );
}
