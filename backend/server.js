import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());


// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para el envío de correos
app.post('/send-email', async (req, res) => {
    console.log('Datos recibidos:', req.body);

  const { name, email, service, message } = req.body;
  

  // Configurar el transporte de nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Si no lo has especificado
    port: 465, // Puerto para conexiones seguras
    secure: true, // Conexión segura (SSL/TLS)
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

  // Opciones del correo
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Cambia esto si deseas que los mensajes lleguen a otro correo
    subject: `Consulta de ${name} - ${service}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Servicio: ${service}
      Mensaje: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
