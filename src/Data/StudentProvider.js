import client from "../HHTP/client";

export default class StudentProvider {

    
    static async getAllProducts(page = 0, size = 10, categoryId) {
        const params={categoryId, page, size};
        return await client.get(`/student/get/all/product`, {params});
    }
    static async getStudentInfo(id) {
        return await client.get(`/student/get/info/${id}`);
    }
    static async imgPreview(hashId) {
        return await client.get(`/student/file/preview/${hashId}`, { responseType: 'blob' })
        .then((response) => {
            return response;
            return Buffer.from(response.data, "binary").toString("base64")
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
        }
        
    static async createOrder(body) {
        return await client.post(`/student/create/order`, body);
    }

    static async getAllOrders() {
        return await client.get(`/student/get/order/info`);
    }
    static async exchangeCoin(ball) {
        return await client.post(`/student/create/transaction?ball=${ball}`);
    }
    
    static async getGroupOfStudent() {
        return await client.get(`/student/get/group/ids`);
    }
    static async getStudentGroupInfo(id) {
        return await client.get(`/student/get/${id}`);
    }

    static async getAllCategory() {
        return await client.get(`/student/category/getAll`);
    }
    
}
