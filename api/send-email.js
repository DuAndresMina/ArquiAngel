import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Configurar CORS para permitir solicitudes desde dominios específicos
app.use(cors({
  origin: ['https://www.acarquitectura.com.co', 'https://acarquitectura.com.co'], // Permitir estos orígenes
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Encabezados permitidos
  credentials: true, // Permitir cookies y encabezados de autenticación
}));

app.options('*', cors()); // Manejar solicitudes preflight

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint para manejar solicitudes POST
app.post('/api/send-email', async (req, res) => {
  console.log('Solicitud recibida en /api/send-email');
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465, // Puerto SMTP fijo para conexiones seguras
      secure: true, // Asegura que se use SSL/TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const isARCO = req.body.formType === 'arco';

    let mailOptions;

    if (isARCO) {
      const { nombre, identificacion, tipo_solicitud, descripcion } = req.body;
      if (!nombre || !identificacion || !tipo_solicitud || !descripcion) {
        return res.status(400).json({ message: 'Faltan campos requeridos para la solicitud ARCO' });
      }

      mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `Solicitud ARCO - ${tipo_solicitud}`,
        text: `Solicitud ARCO recibida:\n
               Nombre: ${nombre}\n
               Identificación: ${identificacion}\n
               Tipo de Solicitud: ${tipo_solicitud}\n
               Descripción: ${descripcion}\n\n
               Fecha: ${new Date().toLocaleString()}`,
      };
    } else {
      const { name, email, service, message, number } = req.body;
      if (!name || !email || !service || !message) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
      }

      mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        subject: `Consulta de ${name} - ${service}`,
        text: `Nueva consulta recibida:\n
               Nombre: ${name}\n
               Email: ${email}\n
               Teléfono: ${number || 'No proporcionado'}\n
               Servicio: ${service}\n
               Mensaje: ${message}\n\n
               Fecha: ${new Date().toLocaleString()}`,
      };
    }

    // Enviar correo
    console.log('Enviando correo con las siguientes opciones:', mailOptions);
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: isARCO
        ? 'Solicitud ARCO enviada correctamente'
        : 'Consulta enviada correctamente',
    });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({
      message: isARCO
        ? 'Error al enviar la solicitud ARCO'
        : 'Error al enviar la consulta',
    });
  }
});

// Exporta el handler para que Vercel lo use
export default app;