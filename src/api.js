import axios from "axios";
import * as config from "./config";
const { API } = config;
import FormData from "form-data";
export const login = async data => {
  const { data: result } = await axios.post(`${API}/auth`, data);
  return result;
};

export const getPosts = async () => {
  const { data: posts } = await axios.get(`${API}/posts`);
  return posts;
};
export const sendPost = async data => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("body", data.body);
  formData.append("image", data.image);

  const { data: post } = await axios.post(`${API}/posts`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return post;
};
export const deletePost = async data => {
  const { data: result } = await axios.delete(`${API}/posts`, { data });
  return result;
};
export const updatePost = async data => {
  const { data: result } = await axios.put(`${API}/posts`, data);
  return result;
};
export const getProduct = async name => {
  const { data: product } = await axios.get(`${API}/products/${encodeURI(name)}`);
  return product;
};
export const getProducts = async () => {
  const { data: products } = await axios.get(`${API}/products`);
  return products;
};
export const sendProduct = async data => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("image", data.image);

  const { data: product } = await axios.post(`${API}/products`, formData);
  return product;
};
export const sendType = async data => {
  const { data: type } = await axios.post(`${API}/types`, data);
  return type;
};
export const updateTypes = async data => {
  const { data: result } = await axios.put(`${API}/types`, data);
  return result;
};
