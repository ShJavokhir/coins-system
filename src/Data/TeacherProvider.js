import client from "../HHTP/client";

export default class TeacherProvider {

    // group
    static async getTeacherGroup() {
        return await client.get(`/teacher/get/groups/of`);
    }
    static async getOneGroup(id) {
        return await client.get(`/teacher/student/get/${id}`);
    }
    static async getOneGroupInfo(id) {
        return await client.get(`/teacher/get/group/info/${id}`);
    }
    static async createLesson(id) {
        return await client.post(`/teacher/create/lesson/${id}`);
    }
    
    static async checkLesson(body) {
        return await client.post(`/teacher/lesson/detail`, body);
    }
    static async getAllLesson(page = 0, size = 10) {
        return await client.get(`/teacher/get/lessons?pageNum=${page}&pageSize=${size}`);
    }
    static async getOneLessonInfo(id) {
        return await client.get(`/teacher/get/lesson/info/${id}`);
    }
    
    static async detailLesson(body) {
        return await client.post(`/teacher/lesson/detail`, body);
    }

    //exam

    static async getAllExam(page = 0, size = 10) {
        return await client.get(`/teacher/get/weekly/exam?pageNum=${page}&pageSize=${size}`);
    }
    static async getOneExamInfo(quizId) {
        return await client.get(`/teacher/get/weekly/quiz/${quizId}`);
    }
    
    
    
    static async createExam(id) {
        return await client.post(`/teacher/create/weekly/quiz/${id}`);
    }
    static async detailExam(body) {
        return await client.post(`/teacher/create/weekly/quiz/detail`, body);
    }
    


}
