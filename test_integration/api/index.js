const soapRequest = require('easy-soap-request');
const router = require("express").Router();
const fs = require('fs');
const path = require("path");

router.get("/ourendpoint", async(req, res) => {
    try {
        const url = 'https://netconnect.bluedart.com/Ver1.9/Demo/ShippingAPI/Finder/ServiceFinderQuery.svc';
        const sampleHeaders = {
            'Content-Type': 'application/soap+xml;charset=UTF-8',
            'SOAPAction': 'http://tempuri.org/IServiceFinderQuery/GetServicesforPincode'
        };
        const xml = fs.readFileSync(path.join(__dirname, 'test/ServiceFinderQuery.xml'), 'utf-8');
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
        const { headers, body, statusCode } = response;
        res.status(200).json({ data: { headers, body, statusCode }})
    } catch (error) {
        console.log(error.message || error);
        res.status(200).json({ data: { error: error.message || error }})
    }
});

router.get("/w3schoolendpoint", async(req, res) => {
    try {
        const url = 'https://www.w3schools.com/xml/tempconvert.asmx';
        const sampleHeaders = {
            'Content-Type': 'text/xml',
        };
        const xml = fs.readFileSync(path.join(__dirname, 'test/tempconvert.xml'), 'utf-8');
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml });
        const { headers, body, statusCode } = response;
        res.status(200).json({ data: { headers, body, statusCode }})
    } catch (error) {
        console.log(error.message || error);
        res.status(200).json({ data: { error: error.message || error }})
    }
});

module.exports = router;
