import express from 'express';
import GoogleSheetsController from '../controllers/googleSheets.controller.js';

const route = express.Router();
const googleSheetsController = new GoogleSheetsController();

// Ruta para actualizar Google Sheets
route.post('/update-sheet', googleSheetsController.updateSheet);

// Ruta para leer datos desde Google Sheets
route.get('/read-sheet', googleSheetsController.readSheet);

// Ruta para monitorizar cambios en Google Sheets
route.post('/monitor-changes', googleSheetsController.monitorChanges);

export default route;
