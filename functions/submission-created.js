const postmark = require("postmark");
const moment = require('moment');
const sanityClient = require('@sanity/client')
const promo = "x-2NHZnEah"

const client = new postmark.ServerClient(
	process.env.POSTMARK_API_KEY
);

const sanity = sanityClient({
  projectId: '1oy8cb2q',
  dataset: 'event',
  token: process.env.SANITY_API_KEY
})

const entrada_general_qr = process.env.ENTRADA_GENERAL_QR
const entrada_kong_qr = process.env.ENTRADA_KONG_QR
const entrada_kubernetes_qr = process.env.ENTRADA_KUBERNETES_QR

exports.handler = async function (event, context, callback) {
	const { payload } = JSON.parse(event.body);

	console.log(payload);

	// setting up the date
	moment.locale('es')
	const registration_date = moment().format("DD") + " de " + moment().format("MMMM, YYYY");

	var registration_cost = "";
	var registration_qr = "";

	switch (payload.data.ticket) {
		case "Entrada General":
			registration_cost = "70 Bs.";
			registration_qr = entrada_general_qr;
			break;
		case "Entrada General + Taller de Kubernetes y TensorFlow":
			registration_cost = "150 Bs.";
			registration_qr = entrada_kubernetes_qr;
			break;
		case "Entrada General + Taller de APIs con Kong":
			registration_cost = "120 Bs.";
			registration_qr = entrada_kong_qr;
			break;
	}

	// Validate code here
	if (payload.data.promo == promo) {
		var templateId = 14110948;
	} else {
		var templateId = 13748320;
	}

	// Send the email here
	client.sendEmailWithTemplate({
		TemplateId: templateId,
		From: "devfest@lapazcloud.com",
		To: payload.email,
		TemplateModel: {
			"registration_date": registration_date,
			"registration_cost": registration_cost,
			"registration_name": payload.name,
			"registration_company": payload.company,
			"registration_ticket": payload.data.ticket,
			"registration_qr": registration_qr
		}
	});

	// Save to Sanity here
	sanity.create({ _type: 'registered', ...payload.data }).then(res => {
		console.log(`New registration! ID is ${res._id}`)
	})

	callback(null, {
		statusCode: 200,
		body: "Thanks!"
	});
	return 1;
}