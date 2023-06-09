import client from "../HHTP/client";

export default class SundayEventProvider {
    
    static async createLesson() {
        return await client.post(`/sunday-event/create/independent/lesson`);
    }
    static async checkLesson(body) {
        return await client.post(`/sunday-event/save/independent/lesson`, body);
    }
    static async getAllCourse() {
        return await client.get(`/sunday-event/get/courses`);
    }
    static async getAllStudentsByCourse(page = 0, size = 10, id) {
        return await client.get(`/sunday-event/get/student/through/course?courseId=${id}&pageNum=${page}&pageSize=${size}`);
    }
    static async getAllLessons(page = 0, size = 10) {
        return await client.get(`/sunday-event/get/all/independent/lesson?pageNum=${page}&pageSize=${size}`);
    }
    static async getLessonInfo(page = 0, size = 10, id) {
        return await client.get(`/sunday-event/get/independent/lesson/?independentLessonId=${id}&pageNum=${page}&pageSize=${size}`);
    }
    static async deleteStudentGroup(independentLessonDetailId = 0, studentId = 0) {
        return await client.delete(`/sunday-event/delete/independent/lesson/detail?independentLessonDetailId=${independentLessonDetailId}&studentId=${studentId}`);
    }

    static async getAllStudent(pageNum = 0, pageSize = 20, studentId) {
        const params={studentId, pageNum, pageSize};
        return await client.get(`/sunday-event/get/all/student`, {params});
    }
  


    
}
