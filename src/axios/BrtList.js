import axios from "axios";

export const getList = () => {
  return axios
    .get("/api/")
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

export const addList = async data => {
  return await axios
    .post("/api/", data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const updateList = async (id, data) => {
  return await axios
    .put(`/api/${id}`, data)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export const deleteList = async id => {
  return await axios
    .delete(`/api/${id}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
