import { google } from 'googleapis';
import path from 'path';
import {parse, format, isValid, compareDesc} from 'date-fns';
import { es } from 'date-fns/locale';
import { filterLatestProducts } from '../helpers/filterLatestServices.helper.js';

// Ruta al archivo JSON de credenciales
// const CREDENTIALS_PATH = path.resolve('src/config/google-credentials.json');


const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// ID de la hoja de cálculo (de la URL de Google Sheets)
const SPREADSHEET_ID = '1WFS2goouwv4aPxsZgIApvLBWw_OfnGvk3KZabVWQYM8';

export default class GoogleSheetsService {
  constructor() {
    this.authClient = null;
    this.previousData = []; // Para guardar el estado previo de los datos
  }

  async authenticate(CREDENTIALS) {
    if (!this.authClient) {
      const auth = new google.auth.GoogleAuth({
        credentials: CREDENTIALS,
        scopes: SCOPES,
      });
      this.authClient = await auth.getClient();
    }
    return this.authClient;
  }

  async writeToSheet(range, values) {
    const authClient = await this.authenticate();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const resource = { values };

    try {
      const result = await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: range, // Ejemplo: 'Hoja1!A1'
        valueInputOption: 'RAW', // Opción: 'RAW' para texto plano o 'USER_ENTERED' para fórmulas
        resource,
      });

      console.log(`Se actualizaron ${result.data.updatedCells} celdas.`);
    } catch (error) {
      console.error('Error al escribir en Google Sheets:', error);
    }
  }

  async readFromSheet() {
    const CREDENTIALS = {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    };
    const authClient = await this.authenticate(CREDENTIALS);
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            // range: range,
            range: `5. Pricing!A2:M`
        });

        const allData = response.data.values || [];

        // Filtrar solo la columna A (índice 0) y la columna M (índice 12)
        const filteredData = allData.map(row => [row[0],row[1], row[12]]); 

        const sortedData = this.filterLatestProducts(filteredData);

        return sortedData;
    } catch (error) {
        console.error('Error al leer Google Sheets:', error);
        return [];
    }
}

  filterLatestProducts(data) {
    if (!data || data.length === 0) return [];
    const productsServices = new Map();
    data.reverse().forEach(d => {
        const productName = d[1];  // Columna B (nombre del producto)
        // Si el producto aún no está en el mapa, lo agregamos
        if (!productsServices.has(productName)) {
            productsServices.set(productName,  {
              name: d[1],
              // price: d[2]
              price:parseFloat(d[2].replace(/[$,]/g, ''))
          });
        }
    });
    return Array.from(productsServices.values());
  }

  async checkForChanges(range) {
    const currentData = await this.readFromSheet(range);

    if (JSON.stringify(currentData) !== JSON.stringify(this.previousData)) {
      console.log('Cambios detectados en Google Sheets:', currentData);
      this.previousData = currentData;

      // Aquí puedes llamar a una función para actualizar tu base de datos
      this.updateDatabase(currentData);
    } else {
      console.log('No hay cambios en Google Sheets.');
    }
  }

  async updateDatabase(data) {
    // Ejemplo: lógica para actualizar tu base de datos
    console.log('Actualizando la base de datos con:', data);
    // Aquí puedes procesar los datos y sincronizarlos con tu base de datos
  }

  startPolling(range, interval = 5000) {
    console.log(`Iniciando polling para detectar cambios en el rango ${range}. Intervalo: ${interval}ms`);
    setInterval(() => {
      this.checkForChanges(range);
    }, interval);
  }
}
