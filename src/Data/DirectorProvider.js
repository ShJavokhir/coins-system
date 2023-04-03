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



    //shop
    static async getAllCategory() {
        return await client.get(`/director/category/getAll`);
    }
    static async getAllProducts(page = 0, size = 10, categoryId) {
        const params={categoryId, page, size};
        return await client.get(`/director/get/all/product`, {params});
    }
    static async getAllOrders(page = 0, size = 10) {
        return await client.get(`/director/order/getAll?pageNum=${page}&pageSize=${size}`);
    }
    static async imgPreview(hashId) {
        return await client.get(`/director/file/preview/${hashId}`, { responseType: 'blob' })
            .then((response) => {
                console.log(response);
                return response;
                return Buffer.from(response.data, "binary").toString("base64")
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }

    
    static async confirmOrder(id) {
        return await client.post(`/director/order/confirm/${id}`);
    }


    static async getAllNumber(){
        return await client.get(`/director/all/amount/pred`)
    }

    //lesson

     static async getAllLessons(page = 0, size = 10) {
        return await client.get(`/director/lesson/getAll?pageNum=${page}&pageSize=${size}`);
    }
     static async getAllAdditionLesson(page = 0, size = 10) {
        return await client.get(`/director/get/all/addition/lesson?pageNum=${page}&pageSize=${size}`);
    }
     static async getAllSundayLesson(page = 0, size = 10) {
        return await client.get(`/director/get/all/independent/lesson?pageNum=${page}&pageSize=${size}`);
    }



    //reyting
    static async getAllStudent(page = 0, size = 10) {
        return await client.get(`/director/get/all/student?pageNum=${page}&pageSize=${size}`);
    }
    static async getAllGroup(page = 0, size = 10) {
        return await client.get(`/director/get/groups?pageNum=${page}&pageSize=${size}`);
    }

    static async getStudentBallHistory(pageNum = 0, pageSize = 20, studentId) {
        const params={studentId, pageNum, pageSize};
        return await client.get(`/director/get/all/student/scores`, {params});
    }
}
