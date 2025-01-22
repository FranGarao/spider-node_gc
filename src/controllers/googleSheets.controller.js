import GoogleSheetsService from '../services/googleSheets.services.js';

const googleSheetsService = new GoogleSheetsService();

export default class GoogleSheetsController {
    // Método para escribir o agregar datos a la hoja
    async updateSheet(req, res) {
        const { range, values } = req.body;

        // Validar los datos de entrada
        if (!range || !values || !Array.isArray(values)) {
            return res.status(400).json({ error: 'El rango y los valores (en formato de matriz) son obligatorios.' });
        }

        try {
            // Llama al método de servicio para escribir en la hoja
            await googleSheetsService.writeToSheet(range, values);
            res.status(200).json({ message: 'Datos actualizados correctamente en Google Sheets.' });
        } catch (error) {
            console.error('Error al actualizar Google Sheets:', error);
            res.status(500).json({ error: 'No se pudieron actualizar los datos en la hoja.' });
        }
    }

    // Método para leer datos desde la hoja
    async readSheet(req, res) {
        const { range } = req.query;
        
        // Validar los datos de entrada
        if (!range) {
            return res.status(400).json({ error: 'El rango es obligatorio para leer datos.' });
        }

        try {
            // Llama al método de servicio para leer datos desde la hoja
            const data = await googleSheetsService.readFromSheet(range);
            res.status(200).json({ message: 'Datos leídos correctamente.', data });
        } catch (error) {
            console.error('Error al leer Google Sheets:', error);
            res.status(500).json({ error: 'No se pudieron leer los datos de la hoja.' });
        }
    }

    // Método para verificar y manejar cambios en la hoja
    async monitorChanges(req, res) {
        const { range, interval } = req.body;

        // Validar los datos de entrada
        if (!range || !interval) {
            return res.status(400).json({ error: 'El rango y el intervalo son obligatorios.' });
        }

        try {
            // Inicia el polling para detectar cambios
            googleSheetsService.startPolling(range, interval);
            res.status(200).json({ message: `Monitorización iniciada para el rango ${range} cada ${interval}ms.` });
        } catch (error) {
            console.error('Error al iniciar la monitorización de cambios:', error);
            res.status(500).json({ error: 'No se pudo iniciar la monitorización de cambios.' });
        }
    }
}
