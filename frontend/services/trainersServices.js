import axios from "axios";

const URL = `${import.meta.env.VITE_BASE_URL}/trainers`;

export const getAllTrainers = async (page = 1, limit = 12, search = "") => {
  try {
    const trainers = await axios.get(URL, {
      params: { page, limit, search },
    });
    return trainers.data;
  } catch (err) {
    console.error("Couldn't get trainers data:", err);
    return [];
  }
};

export const getTrainer = async (id) => {
  try {
    const trainer = await axios.get(`${URL}/${id}`);
    return trainer.data;
  } catch (err) {
    console.error("Couldn't get trainer:", err);
  }
};

export const createTrainer = async (values) => {
  try {
    const createTrainer = await axios.post(URL, values);
    return createTrainer.data;
  } catch (err) {
    console.error("Couldn't create trainer:", err);
  }
};

export const editTrainer = async (id, values) => {
  try {
    const updateTrainer = await axios.put(`${URL}/${id}`, values);
    return updateTrainer.data;
  } catch (err) {
    console.error("Couldn't edit trainer:", err);
  }
};

export const deleteTrainer = async (id) => {
  try {
    const deletedTrainer = await axios.delete(`${URL}/${id}`);
    return deletedTrainer;
  } catch (err) {
    console.error("Couldn't delete trainer:", err);
  }
};
