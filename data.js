const puppeteer = require('puppeteer')

async function init() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html');

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

        const elements = {
            title: title,
            paragraph: paragraph,
            date: date,
            headers: headers,
            data: data
        }

        return elements
    })


    await browser.close();

    return principalElements

}

module.exports = {
    init
}