import client from "../HHTP/client";

export default class SeoProvider {

    // teacher
    static async createDirector(body) {
        return await client.post("/seo/director/add", body);
    }
    static async getAllEmployees(page = 0, size = 10) {
        return await client.get(`/seo/get/employees?pageNum=${page}&pageSize=${size}`);
    }

    static async deleteXodim(id) {
        return await client.delete(`/seo/delete/user/${id}`);
    }
    static async updateTeacher(body) {
        return await client.put(`/seo/update/user`, body);
    }

    static async uploadImage(file) {
        return await client.post(`/seo/file/upload`, file, { headers: { "Content-Type": "multipart/form-data" } });
    }
    static async addProduct(body) {
        return await client.post(`/seo/product/add`, body);
    }
    static async createCategory(body) {
        return await client.post(`/seo/category/add?name=${body}`);
    }
    static async getAllCategory() {
        return await client.get(`/seo/category/getAll`);
    }
    static async getAllProducts(page = 0, size = 10, categoryId) {
        const params={categoryId, page, size};
        return await client.get(`/seo/get/all/product`, {params});
    }
    static async getAllOrders(page = 0, size = 10) {
        return await client.get(`/seo/order/getAll?pageNum=${page}&pageSize=${size}`);
    }
    static async imgPreview(hashId) {
        return await client.get(`/seo/file/preview/${hashId}`, { responseType: 'blob' })
            .then((response) => {
                console.log(response);
                return response;
                return Buffer.from(response.data, "binary").toString("base64")
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }

    static async deleteProduct(id) {
        return await client.delete(`/seo/product/delete/${id}`);
    }
    static async confirmOrder(id) {
        return await client.post(`/seo/order/confirm/${id}`);
    }

    static async addBall( studentId = 0, ball = 0) {
        return await client.post(`/seo/student/add/ball?studentId=${studentId}&ball=${ball}`);
    }
    static async getAllStudent(page = 0, size = 10) {
        return await client.get(`/seo/get/all/student?pageNum=${page}&pageSize=${size}`);
    }
    static async getAllGroup(page = 0, size = 10) {
        return await client.get(`/seo/get/groups?pageNum=${page}&pageSize=${size}`);
    }



    static async getAllNumber(){
        return await client.get(`/seo/all/amount/pred`)
    }
    
    static async updateProduct(body) {
        return await client.put(`/seo/product/update`, body);
    }


    static async getStudentBallHistory(pageNum = 0, pageSize = 20, studentId) {
        const params={studentId, pageNum, pageSize};
        return await client.get(`/seo/get/all/student/scores`, {params});
    }
    static async getPermitHistory(page = 0, size = 20) {
        const params={page, size};
        return await client.get(`/seo/get/week/permit/data`, {params});
    }
}
