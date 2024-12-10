import CustomerService from "../services/customer.services.js";
const customerService = new CustomerService();
export default class CustomerController {
    async getAll(req,res){
            try {
                const customers = await customerService.getAll();
                if (!customers || customers.length === 0) {
                    res.status(500).json({ message: "No se encontraron usuarios" });
                    return;
                }
                res.status(200).json({ message: "Listado de usuarios", customers  });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Error CON-CUS-ALL" });
            }
        }
    async getById(req,res){
        try {
            const id = req.params.id;
            const customer = await customerService.getById(id);
            if (!customer) {
                res.status(500).json({ message: "No se encontraron usuarios" });
                return;
            }
            res.status(200).json({ message: "Usuario encontrado", customer  });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-CUS-GET" });
        }
    }

    async create(req,res){
        try {
            if (!req.body.name || !req.body) return;             
            
            const newCustomer = await customerService.create({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address
            });
            if (!newCustomer) {
                res.status(500).json({ message: "No se pudo crear el usuario" });
                return;
            }
            res.status(200).json({ message: "Usuario creado", newCustomer });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-CUS-CRE" });
        }
    }

    async update(req,res){
        try {
            if (!req.body || !req.params.id) return;
            const id = req.params.id;
            const customer = await customerService.update(id, req.body);
            if (!customer) {
                res.status(500).json({ message: "No se pudo actualizar el usuario" });
                return;
            }
            res.status(200).json({ message: "Usuario actualizado", customer });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error CON-CUS-UPD" });
        }
    }
}
