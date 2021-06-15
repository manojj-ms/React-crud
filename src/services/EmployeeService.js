import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const get = EmpID => {
  return http.get(`/users/${EmpID}`);
};

const create = data => {
  return http.post("/create/users", data);
};

const update = (EmpID, data) => {
  return http.put(`/users/${EmpID}`, data);
};

const remove = EmpID => {
  return http.delete(`/users/${EmpID}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByName = First_name => {
  return http.get(`/users?First_name=${First_name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};