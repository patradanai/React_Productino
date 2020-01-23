import axios from "axios";

export const getList = async () => {
  try {
    const res = await axios.get("/api/brt/");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addList = async data => {
  try {
    const res = await axios.post("/api/brt/", data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateList = async (id, data) => {
  return await axios
    .put(`/api/brt/${id}`, data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const deleteList = async id => {
  try {
    const res = await axios.delete(`/api/brt/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
