import { useState } from "react";
import { useFormik } from "formik";
import {
  createTrainer,
  editTrainer,
  getAllTrainers,
} from "../services/trainersServices";
import { createTrainerSchema } from "../validations/createTrainer.form";

const inputStyle =
  "p-4 bg-blue-200 text-blue-950 outline-blue-300 rounded-xl w-full mb-6";

function TrainerForm({ trainer, setTrainers, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: trainer
      ? { ...trainer, medals: trainer.medals.join(", ") }
      : { name: "", lastname: "", phone: "", medals: "" },
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

        if (trainer?.id) {
          await editTrainer(trainer.id, formattedValues);
        } else {
          await createTrainer(formattedValues);
        }

        const updatedList = await getAllTrainers();
        setTrainers(updatedList);
        formik.resetForm();
        if (onClose) onClose();
      } catch (err) {
        console.error("Error saving trainer:", err);
        setError("Error saving trainer");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex flex-col max-w-2xl m-8 gap-8 w-full md:w-[50%] bg-black/60 p-8 rounded-xl text-blue-500 mx-auto">
      <h2 className="uppercase font-semibold">
        {trainer ? "Edit Trainer" : "Add Trainer"}
      </h2>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="p-4 bg-blue-400 text-white rounded-xl"
          >
            {loading ? "Saving..." : trainer ? "Update Trainer" : "Add Trainer"}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-4 bg-gray-400 text-white rounded-xl"
            >
              Cancel
            </button>
          )}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default TrainerForm;
