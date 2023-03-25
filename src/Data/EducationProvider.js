import client from "../HHTP/client";

export default class EducationProvider {
    
    static async getAllGroups(page = 0, size = 10) {
        return await client.get(`/education-department/get/groups?pageNum=${page}&pageSize=${size}`);
    }
    
    static async detailExam(body) {
        return await client.post(`/education-department/save/quiz/detail`, body);
    }
    static async createExam(id) {
        return await client.post(`/education-department/create/quiz/${id}`);
    }
    static async getOneGroup(id) {
        return await client.get(`/education-department/student/get/${id}`);
    }
    
    static async getAllExam(page = 0, size = 10) {
        return await client.get(`/education-department/get/all/exam?pageNum=${page}&pageSize=${size}`);
    }
    static async getOneExamInfo(quizId) {
        return await client.get(`/education-department/get/quiz/detail/${quizId}`);
    }
}
