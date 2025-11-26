import emailjs from '@emailjs/browser';

// Configuração do EmailJS
// Para usar, você precisa:
// 1. Criar uma conta em https://www.emailjs.com/
// 2. Criar um serviço de email (Gmail, Outlook, etc.)
// 3. Criar um template de email
// 4. Obter suas credenciais: Public Key, Service ID, Template ID
// 5. Substituir os valores abaixo ou usar variáveis de ambiente

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';

export interface EmailData {
  name: string;
  email: string;
  message: string;
}

// Inicializa o EmailJS uma única vez
let isInitialized = false;

const initializeEmailJS = () => {
  if (!isInitialized) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    isInitialized = true;
  }
};

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    // Inicializa o EmailJS (apenas uma vez)
    initializeEmailJS();

    // Envia o email usando o template configurado
    // Variáveis correspondem ao template: {{name}}, {{from_name}}, {{email}}, {{message}}
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: data.name,
        from_name: data.name,
        email: data.email,
        message: data.message,
      }
    );
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw new Error('Falha ao enviar email. Por favor, tente novamente.');
  }
};

