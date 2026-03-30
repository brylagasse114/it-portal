const KINTONE_SUBDOMAIN = 'can-one';
const KINTONE_APP_ID    = '30';
const KINTONE_API_TOKEN = 'YOUR_API_TOKEN_HERE';

let currentPriority = 'Medium';
let currentFormType = '';

function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function openForm(type) {
  currentFormType = type;

  document.getElementById('form-panel').innerHTML = `
    <h2>Submit Ticket</h2>

    <input id="f_requester" placeholder="Your Name" required>
    <input id="f_email" placeholder="Email" required>
    <textarea id="f_desc" placeholder="Describe your issue" required></textarea>

    <button onclick="submitTicket()">Submit</button>
    <button onclick="goBack()">Cancel</button>
  `;

  document.getElementById('card-section').style.display = 'none';
  document.getElementById('form-panel').style.display = 'block';
}

function goBack() {
  document.getElementById('form-panel').style.display = 'none';
  document.getElementById('card-section').style.display = 'block';
}

async function submitTicket() {
  const record = {
    Requester_Name: { value: v('f_requester') },
    Requester_Email: { value: v('f_email') },
    Description: { value: v('f_desc') }
  };

  try {
    const res = await fetch(
      `https://${KINTONE_SUBDOMAIN}.kintone.com/k/v1/record.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cybozu-API-Token': KINTONE_API_TOKEN,
        },
        body: JSON.stringify({
          app: KINTONE_APP_ID,
          record: record
        })
      }
    );

    const data = await res.json();

    alert("Ticket submitted! ID: " + data.id);
    goBack();

  } catch (err) {
    alert("Error submitting ticket");
  }
}