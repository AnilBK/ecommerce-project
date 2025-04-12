import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const fetchServerStatus = () => api.get("/status");

export const fetchAllCategories = () => api.get("/get-category-names");

export const saveCategoryName = (categoryNameData) => api.post("/save-category-name", categoryNameData);

export const fetchAllGiftData = () => api.get("/get-all-gift-data");

export const saveGiftData = (giftData) => api.post("/save-gift-data", giftData);

export const deleteGiftData = (giftId) => api.delete(`/delete-gift/${giftId}`);

export const getTotalGifts = () => api.get("/total-gifts");

export const saveProduct = (productData) => api.post("/save-product", productData);

export const fetchAllProductsByCategory = () => api.get("/products-by-category");