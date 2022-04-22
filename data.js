// Se importa la biblioteca a utilizar
const puppeteer = require('puppeteer')

async function init() {

    // Se le indica a Puppeteer que trabajaremos con una nueva página
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html')

    // Se evalua el documento html, devolviendo la información solicitada
    const principalElements = await page.evaluate(() => {
        const title = document.getElementsByClassName('title')[0].textContent.split(')')[1].trim()
        const paragraph = document.getElementsByTagName('p')[1].textContent.replace(/\s+/g, ' ').trim()
        const date = document.getElementById('fechaActualizacion').textContent
        const headers = Array.from(document.getElementsByTagName('th')).map(function (cell) {
            return cell.textContent
        })
        const data = Array.from(document.getElementsByTagName('td')).map(function (cell) {
            return cell.textContent
        })

        // Se le da un formato adecuado a la información obtenida
        const elements = {
            title: title,
            paragraph: paragraph,
            date: date,
            headers: headers,
            data: data
        }

        // Se retorna el resultado de la evaluación
        return elements
    })


    // Se le indica a Puppeteer que finalize el proceso
    await browser.close()

    // Se retorna el objeto con la información obtenida en un formato adecuado
    return principalElements

}

// Se exporta la función, para ser utilizada en el archivo principal
module.exports = {
    init
}