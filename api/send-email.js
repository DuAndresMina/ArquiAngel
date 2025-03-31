import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import path from 'path'; // Importación añadida

dotenv.config();

const app = express();

app.use(cors());

// Habilita la compresión
app.use(compression());

// Configura los encabezados de caché para recursos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y', // Cachea los recursos estáticos por un año
  etag: false
}));

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { name, email, service, message, number } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT,
    secure: process.env.PORT === '465', // Asegura que secure sea true solo si el puerto es 465
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Consulta de ${name} - ${service}`,
    text: `Nombre: ${name}\nEmail: ${email}\nServicio: ${service}\nNúmero: ${number}\nMensaje: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ message: 'Error al enviar el correo.' });
  }
}