import client from "../HHTP/client";

export default class SeoProvider {

    // teacher
    static async createDirector(body) {
        return await client.post("/seo/director/add", body);
    }
    static async getAllEmployees(page = 0, size = 10) {
        return await client.get(`/seo/get/employees?pageNum=${page}&pageSize=${size}`);
    }
    
    static async deleteTeacher(id) {
        return await client.delete(`/director/delete/user/${id}`);
    }
    static async updateTeacher(body) {
        return await client.put(`/director/update/user`, body);
    }
    
    
}
