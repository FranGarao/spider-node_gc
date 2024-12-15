import Customer from "../db/models/customer.model.js"
export default class CustomerService {
    async getAll() {
        try {
            const customers = await Customer.findAll();
            
            return customers ? customers : [];
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            const customer = await Customer.findByPk(id);
            return customer ? customer : null;
        } catch (error) {
            console.log(error);
        }
    }
    async create(customer) {
        try {
            if (!customer) return null;
            const newCustomer = await Customer.create(customer);
            return newCustomer ? newCustomer : null;
        } catch (error) {
            console.log(error);
        }
    }
    async update(id, customer) {
        try {
            if (!customer || !id) return null;
            const updatedCustomer = await Customer.update(customer, { where: { id } });
            return updatedCustomer ? updatedCustomer : null;
        } catch (error) {
            console.log(error);
        }
    }
    async delete(id) {
        try {
            if (!id) return null;
            const deletedCustomer = await Customer.destroy({ where: { id } });
            return deletedCustomer ? deletedCustomer : null;
        } catch (error) {
            console.log(error);
        }
    }
}