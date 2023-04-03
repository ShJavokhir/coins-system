import client from "../HHTP/client";

export default class AdditionProvider {
    
    static async createLesson(courseId) {
        return await client.post(`/addition-lesson/create/${courseId}`);
    }
    static async checkLesson(body) {
        return await client.post(`/addition-lesson/save/addition/lesson`, body);
    }
    static async getAllCourse() {
        return await client.get(`/addition-lesson/get/courses`);
    }
    static async getAllStudents(page = 0, size = 10, id) {
        return await client.get(`/addition-lesson/get/student/through/course?courseId=${id}&pageNum=${page}&pageSize=${size}`);
    }
    static async getAllLessons(page = 0, size = 10) {
        return await client.get(`/addition-lesson/get/all/addition/lesson?pageNum=${page}&pageSize=${size}`);
    }
    static async getLessonInfo(page = 0, size = 10, id) {
        return await client.get(`/addition-lesson/get/lesson/detail?additionLessonId=${id}&pageNum=${page}&pageSize=${size}`);
    }
    static async deleteStudentGroup(additionLessonDetailId  = 0, studentId = 0) {
        return await client.delete(`/addition-lesson/delete/addition/lesson/detail?additionLessonDetailId=${additionLessonDetailId}&studentId=${studentId}`);
    }


    
}
