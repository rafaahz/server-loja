const nodemailer = require("nodemailer");

function sendEmail(remetente, tabela, titulo, resposta){

	const transporter = nodemailer.createTransport({
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		},
		tls: { rejectUnauthorized: false }
	});
	
	const mailOptions = {
		from: "'Rafael' <rafael.ribeiro@vitoriadistribuidorarp.com.br>",
		to: remetente,
		subject: titulo,
		html: tabela
	};
	 
	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			resposta.status(500).send("Erro no servidor");
		} else {
			console.log('Email enviado: ' + info.response);
			resposta.status(200).send("Email enviado");
		}
	});

}

module.exports = function(){
	return sendEmail;
}