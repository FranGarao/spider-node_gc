import JobService from "../services/job.services.js";
const jobService = new JobService();
export default class  JobController {
    async getAll(req, res){
        try {
            const jobs = await jobService.getAll();
            jobs ? res.status(200).json({ message: "Listado de trabajos", jobs }) :
            res.status(500).json({ message: "No se encontraron trabajos" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-ALL" });
        }
    }
    async getById(req, res){
        try {
            const id = req.params.id;
            const job = await jobService.getById(id);
            job ? res.status(200).json({ message: "Trabajo encontrado", job }) :
            res.status(500).json({ message: "No se encontraron trabajos" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-GET" });
        }
    }
    async create(req, res){
        try {
            if (!req.body) return;
            const newJob = await jobService.create(req.body);
            newJob ? res.status(200).json({ message: "Trabajo creado", newJob }) :
            res.status(500).json({ message: "No se pudo crear el trabajo" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-CRE" });
        }
    }
    async update(req, res){
        try {
            if (!req.body || !req.params.id) return;
            const id = req.params.id;
            const job = await jobService.update(id, req.body);
            job ? res.status(200).json({ message: "Trabajo actualizado", job }) :
            res.status(500).json({ message: "No se pudo actualizar el trabajo" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-UPD" });
        }
    }
    async delete(req, res){
        try {
            if (!req.params.id) return;
            const id = req.params.id;
            const job = await jobService.delete(id);
            job ? res.status(200).json({ message: "Trabajo eliminado", job }) :
            res.status(500).json({ message: "No se pudo eliminar el trabajo" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-JOB-DEL" });
        }
    }

}
