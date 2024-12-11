import Job from '../db/models/job.model.js';
export default class JobService {
    async getAll(){
        try {
            const jobs = Job.findAll();
            return jobs ? jobs : [];
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id){
        try {
            const job = await Job.findByPk(id);
            return job ? job : null;
        } catch (error) {
            console.log(error);
        }
    }
    async create(job){
        try {
            if (!job) return null;
            const newJob = await Job.create(job);
            return newJob ? newJob : null;
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, job){
        try {
            if (!job || !id) return null;
            const updatedJob = await Job.update(job, { where: { id } });
            return updatedJob ? updatedJob : null;
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id){
        try {
            if (!id) return null;
            const deletedJob = await Job.destroy({ where: { id } });
            return deletedJob ? deletedJob : null;
        } catch (error) { 
            console.log(error);
        }
    }
}