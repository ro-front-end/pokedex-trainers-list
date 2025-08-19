import { useFormik } from "formik";
import {
  createTrainerSchema,
  initialValues,
} from "../validations/createTrainer.form";
import { createTrainer, getAllTrainers } from "../services/trainersServices";
import { useState } from "react";

const inputStyle =
  "p-4 bg-blue-200 text-blue-950 outline-blue-300 rounded-xl w-full mb-6";

function CreateTrainerForm({ setTrainers }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createTrainerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formattedValues = {
          ...values,
          medals: values.medals
            ? values.medals.split(",").map((m) => m.trim())
            : [],
        };
        await createTrainer(formattedValues);

        const updatedList = await getAllTrainers();
        setTrainers(updatedList);
        formik.resetForm();
        setShowForm(false);

        return updatedList;
      } catch (err) {
        console.error("Error creating trainer:", err);
        setError("Error creating trainer");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleShowform = () => {
    setShowForm(true);
  };

  const handleCloseform = () => {
    setShowForm(false);
  };

  return showForm ? (
    <div className="flex flex-col max-w-2xl gap-8 w-full sm:w-[30%] bg-black/60 p-8 rounded-xl text-blue-500 mx-auto">
      <h2 className="uppercase font-semibold">Add or Create a Trainer!</h2>
      <form
        className="flex flex-col gap-6 mx-auto w-full"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputStyle}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}

            <input
              type="text"
              name="lastname"
              placeholder="Lastname..."
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputStyle}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="text-red-500">{formik.errors.lastname}</p>
            )}
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone..."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputStyle}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500">{formik.errors.phone}</p>
            )}

            <input
              type="text"
              name="medals"
              placeholder="Medals (comma separated)"
              value={formik.values.medals}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputStyle}
            />
            {formik.touched.medals && formik.errors.medals && (
              <p className="text-red-500">{formik.errors.medals}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="p-4 text-blue-50 font-semibold cursor-pointer bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out rounded-xl"
        >
          {loading ? "Creating..." : "Add Trainer"}
        </button>

        <button
          onClick={handleCloseform}
          className="p-4 text-gray-50 font-semibold cursor-pointer bg-gray-400 hover:bg-gray-500 transition duration-300 ease-in-out rounded-xl"
          type="button"
        >
          Cancel
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  ) : (
    <div className="flex justify-center">
      <button
        onClick={handleShowform}
        className="p-4 text-blue-50 font-semibold cursor-pointer bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out rounded-xl"
        type="button"
      >
        Add a new trainer
      </button>
    </div>
  );
}

export default CreateTrainerForm;
