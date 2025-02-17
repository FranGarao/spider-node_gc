export function filterLatestProducts(data) {
    if (!data || data.length === 0) return [];

    // Suponiendo que la columna A (índice 0) tiene la fecha,
    // la columna B (índice 1) tiene el nombre del producto,
    // y la columna M (índice 12) tiene el precio final.

    const parsedData = data.map(row => {
        const dateStr = row[0]; // Fecha en la columna A
        const productName = row[1]; // Nombre del producto en la columna B
        const productPrice = row[12]; // Precio final en la columna M

        // Convertir fecha a un objeto Date
        const parsedDate = dateStr ? new Date(dateStr) : null;
        console.log(parsedDate);
        
        return { parsedDate, productName, productPrice, rawData: row };
    });

    // Filtrar filas con fechas válidas
    const validData = parsedData.filter(item => item.parsedDate instanceof Date && !isNaN(item.parsedDate));

    // Ordenar de más reciente a más antiguo
    validData.sort((a, b) => b.parsedDate - a.parsedDate);

    const uniqueProducts = new Map();

    for (const item of validData) {
        if (!uniqueProducts.has(item.productName)) {
            uniqueProducts.set(item.productName, {
                productName: item.productName,
                productPrice: item.productPrice,
                date: item.parsedDate.toISOString().split("T")[0] // Opcional: Formatear fecha
            });
        }
    }

    return Array.from(uniqueProducts.values());
}
