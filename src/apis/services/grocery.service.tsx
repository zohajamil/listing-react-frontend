import { GroceryItem } from "../../Common/Interfaces/Interfaces";
import axios, { AxiosResponse } from "axios";
import { addNotificationToApp, apiUrl, isSuccessCode } from "../../Common/Common";

export const getAllGroceryItems = async (
    startAfter = "",
    endBefore = ""
): Promise<GroceryItem[]> => {
    try {
        var data = [] as GroceryItem[];
        const path = `grocery-items?startAfter=${startAfter}&endBefore=${endBefore}`;
        const res = await axios.get(apiUrl + path);
        if (isSuccessCode(res.status)) {
            data = res.data;
        } else {
            addNotificationToApp("Error", "Failed to get data", "danger");
        }
        return data;
    } catch (e) {
        addNotificationToApp("Error", "Failed to get data", "danger");
        return [];
    }
};



export const postItem = async (item: any): Promise<AxiosResponse> => {
    try {
        const res = await axios.post(apiUrl + "grocery-items", item);
        if (isSuccessCode(res.status)) {
            addNotificationToApp("Success", "Added Successfully!", "success");
        } else {
            addNotificationToApp("Error", "Failed to add data", "danger");
        }
        return res as AxiosResponse;
    } catch (e) {
        addNotificationToApp("Error", "Failed to add data", "danger");
        return {} as AxiosResponse;
    }
};


export const updateItem = async (
    itemId: string,
    item: any
): Promise<AxiosResponse> => {
    try {
        const res = await axios.put(apiUrl + `grocery-items/${itemId}`, item);
        if (isSuccessCode(res.status)) {
            addNotificationToApp("Success", "Updated Successfully!", "success");
        } else {
            addNotificationToApp("Error", "Failed to update data", "danger");
        }
        return res as AxiosResponse;
    } catch (e) {
        addNotificationToApp("Error", "Failed to update data", "danger");
        return {} as AxiosResponse;
    }
};


export const deleteItem = async (
    itemId: string
): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(apiUrl + `grocery-items/${itemId}`);
        if (isSuccessCode(res.status)) {
            addNotificationToApp("Success", "Deleted Successfully!", "success");
        } else {
            addNotificationToApp("Error", "Failed to delete data", "danger");
        }
        return res as AxiosResponse;
    } catch (e) {
        addNotificationToApp("Error", "Failed to delete data", "danger");
        return {} as AxiosResponse;
    }
};
