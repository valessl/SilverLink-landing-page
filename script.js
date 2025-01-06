
  document.getElementById('subscribe-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;

    const response = await fetch('save_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}`
    });

    if (response.ok) {
        const text = await response.text();
        if (text === "success") {
            alert("Grazie per esserti iscritto!");
        } else {
            alert("Email non valida. Riprova.");
        }
    } else {
        alert("Errore durante l'iscrizione.");
    }
});
  // Importa Supabase (se usi un module bundler come Vite, Webpack ecc.)
import { createClient } from '@supabase/supabase-js';

// Oppure usa il CDN se non hai un bundler
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

// URL e API Key dal tuo progetto Supabase
const SUPABASE_URL = 'https://<https://ymezoyexyuqmhhqzfsfv.supabase.co>.supabase.co';
const SUPABASE_API_KEY = '<eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZXpveWV4eXVxbWhocXpmc2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMTgyMTUsImV4cCI6MjA1MTY5NDIxNX0.6CCY_2eRTgSg9RO96n_2NC-VuVis2gWTS9RZnqUzzUA>';

// Inizializza Supabase Client
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

// Ora puoi usare il client `supabase` per interagire con il database!
async function saveEmailToSupabase(email) {
    // Salva l'email nella tabella
    const { data, error } = await supabase
      .from('emails') // Nome della tabella
      .insert([{ email: email }]); // Dati da salvare
  
    if (error) {
      console.error('Errore nel salvataggio dell\'email:', error.message);
      alert('Si è verificato un errore. Riprova.');
    } else {
      console.log('Email salvata con successo:', data);
      alert('Grazie! La tua email è stata registrata con successo.');
    }
  }
// Aggiungi un event listener al form
document.getElementById('email-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene il ricaricamento della pagina
  
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
  
    if (email) {
      await saveEmailToSupabase(email);
      emailInput.value = ''; // Pulisci il campo email
    } else {
      alert('Per favore, inserisci una email valida.');
    }
  });
    