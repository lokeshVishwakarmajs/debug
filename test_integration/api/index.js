const soapRequest = require('easy-soap-request');
const router = require("express").Router();
const fs = require('fs');
const path = require("path");

router.get("/test", async(req, res) => {
    try {
        const url = 'http://netconnect.bluedart.com/Ver1.9/Demo/ShippingAPI/Finder/ServiceFinderQuery.svc';
        const sampleHeaders = {
        // 'user-agent': 'sampleTest',
        'Content-Type': 'text/xml;charset=UTF-8',
        // 'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
        };
        const xml = fs.readFileSync(path.join(__dirname, 'test/ServiceFinderQuery.xml'), 'utf-8');
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
        const { headers, body, statusCode } = response;
        res.status(200).json({ data: { headers, body, statusCode }})
    } catch (error) {
        console.log(error.message || error);
    }
});

module.exports = router;
