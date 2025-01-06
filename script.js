// Configurazione Supabase
const supabaseUrl = 'https://ymezoyexyuqmhhqzfsfv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZXpveWV4eXVxbWhocXpmc2Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxMTgyMTUsImV4cCI6MjA1MTY5NDIxNX0.6CCY_2eRTgSg9RO96n_2NC-VuVis2gWTS9RZnqUzzUA';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized:', supabase);
supabase
  .from('emails')
  .select('*')
  .then((response) => {
    console.log('Database test:', response);
  });



// Funzione per salvare l'email
async function saveEmailToSupabase(email) {
    try {
        const { data, error } = await supabase
            .from('emails')
            .insert([{ email }]);

        if (error) {
            console.error('Errore nel salvataggio dell\'email:', error.message);
            alert('Si è verificato un errore. Riprova.');
        } else {
            console.log('Email salvata con successo:', data);
            alert('Grazie! La tua email è stata registrata con successo.');
        }
    } catch (err) {
        console.error('Errore inatteso:', err);
        alert('Si è verificato un errore imprevisto. Riprova.');
    }
}

// Listener per il form
document.getElementById('email-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previeni il comportamento predefinito del form

    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();

    if (email) {
        await saveEmailToSupabase(email); // Salva l'email nel database
        emailInput.value = ''; // Pulisci il campo email
    } else {
        alert('Per favore, inserisci un\'email valida.');
    }
});
