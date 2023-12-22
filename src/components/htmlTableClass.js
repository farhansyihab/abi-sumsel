export class tableGenerator {
    #tableData ;
    constructor(arrayData) {
        this.#tableData = arrayData
    }

    generateTable() {
        if (!this.#tableData || !Array.isArray(this.#tableData) || this.#tableData.length === 0) {
            console.error('Invalid or empty JSON data.');
            return '';
        }

        const headers = Object.keys(this.#tableData[0]);
        const headerRow = `<tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>`;

        const bodyRows = this.#tableData.map(row => `
            <tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>
        `).join('');

        const tableHtml = `
            <table>
                <thead>${headerRow}</thead>
                <tbody>${bodyRows}</tbody>
            </table>
        `;

        return tableHtml;
    }
}

