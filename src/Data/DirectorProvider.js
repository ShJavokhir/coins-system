import client from "../HHTP/client";

export default class DirectorProvider {

    // teacher
    static async createTeacher(body) {
        return await client.post("/director/teacher/add", body);
    }
    static async getAllTeacher(page = 0, size = 10) {
        return await client.get(`/director/get/all/teacher?pageNum=${page}&pageSize=${size}`);
    }
    static async getAllEmployees(page = 0, size = 10) {
        return await client.get(`/director/get/employees?pageNum=${page}&pageSize=${size}`);
    }
    static async deleteTeacher(id) {
        return await client.delete(`/director/delete/user/${id}`);
    }
    static async updateTeacher(body) {
        return await client.put(`/director/update/user`, body);
    }
    

    //admin
    static async createAdmin(body) {
        return await client.post("/director/admin/add", body);
    }
    static async createEducation(body) {
        return await client.post("/director/edu/department/add", body);
    }
    static async createEventSunday(body) {
        return await client.post("/director/create/event/employee", body);
    }
    static async createAddition(body) {
        return await client.post("/director/create/addition/employee", body);
    }


     // course
     static async createCourse(body) {
        return await client.post("/director/create/course", body);
    }
    static async getAllCourse() {
        return await client.get(`/director/get/courses`);
    }
    static async deleteCourse(id) {
        return await client.delete(`/director/delete/course/${id}`);
    }
    static async updateCourse(id, body) {
        return await client.put(`/director/update/course/${id}`, body);
    }
    
}
