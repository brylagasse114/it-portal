// ─────────────────────────────────────────────
//  KINTONE CONFIGURATION — fill these in!
// ─────────────────────────────────────────────
const KINTONE_SUBDOMAIN = 'can-one';
const KINTONE_APP_ID    = 30;
const KINTONE_API_TOKEN = 'TpgvChluSwcEX8mxYcP53qFeqRZtVvRC7BzvhGED';
// ─────────────────────────────────────────────

let currentPriority = 'Medium';
let currentFormType = '';

const FORMS = {
  newhire: {
    icon: '🧑‍💼', title: 'New Hire Setup', sub: 'Complete all fields to provision a new employee',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>New Hire Full Name <span class="req">*</span></label><input id="f_newhire_name" placeholder="Employee's full name" required></div>
        <div class="field"><label>New Hire Job Title <span class="req">*</span></label><input id="f_newhire_title" placeholder="e.g. Sales Associate"></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Department</label><input id="f_dept" placeholder="e.g. Operations"></div>
        <div class="field"><label>Start Date <span class="req">*</span></label><input id="f_startdate" type="date" required></div>
      </div>
      <div class="field full"><label>Systems / Applications Needed</label><textarea id="f_systems" placeholder="List the software, systems, or access the new hire will need..."></textarea></div>
      <div class="field full"><label>Additional Notes</label><textarea id="f_notes" placeholder="Any other setup requirements..."></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':     { value: 'New Hire Setup' },
      'Requester_Name':  { value: v('f_requester') },
      'Requester_Email': { value: v('f_email') },
      'New_Hire_Name':   { value: v('f_newhire_name') },
      'New_Hire_Title':  { value: v('f_newhire_title') },
      'Department':      { value: v('f_dept') },
      'Start_Date':      { value: v('f_startdate') },
      'Systems_Needed':  { value: v('f_systems') },
      'Notes':           { value: v('f_notes') },
      'Priority':        { value: currentPriority },
    })
  },
  general: {
    icon: '🎫', title: 'General IT Request', sub: 'Describe your issue and we\'ll take it from there',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="field full"><label>Subject <span class="req">*</span></label><input id="f_subject" placeholder="Brief summary of your request" required></div>
      <div class="field full"><label>Description <span class="req">*</span></label><textarea id="f_desc" placeholder="Describe your issue or request in detail..." required></textarea></div>
      <div class="field full"><label>Additional Notes</label><textarea id="f_notes" placeholder="Anything else we should know?"></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':     { value: 'General IT Request' },
      'Requester_Name':  { value: v('f_requester') },
      'Requester_Email': { value: v('f_email') },
      'Subject':         { value: v('f_subject') },
      'Description':     { value: v('f_desc') },
      'Notes':           { value: v('f_notes') },
      'Priority':        { value: currentPriority },
    })
  },
  internet: {
    icon: '🌐', title: 'Internet / Connectivity Issue', sub: 'Report network or connection problems',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Issue Type <span class="req">*</span></label>
          <select id="f_issue_type" required>
            <option value="">Select...</option>
            <option>No internet connection</option>
            <option>Slow internet</option>
            <option>Wi-Fi dropping</option>
            <option>VPN not connecting</option>
            <option>Can't reach specific site/service</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field"><label>Your Location / Office</label><input id="f_location" placeholder="e.g. Building A, Desk 12"></div>
      </div>
      <div class="field full"><label>Description <span class="req">*</span></label><textarea id="f_desc" placeholder="What exactly is happening? When did it start?" required></textarea></div>
      <div class="field full"><label>Steps Already Tried</label><textarea id="f_tried" placeholder="e.g. Restarted router, tried another device..."></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':     { value: 'Internet / Connectivity' },
      'Requester_Name':  { value: v('f_requester') },
      'Requester_Email': { value: v('f_email') },
      'Issue_Type':      { value: v('f_issue_type') },
      'Location':        { value: v('f_location') },
      'Description':     { value: v('f_desc') },
      'Steps_Tried':     { value: v('f_tried') },
      'Priority':        { value: currentPriority },
    })
  },
  hardware: {
    icon: '🖥️', title: 'Hardware / Equipment', sub: 'Report broken or malfunctioning devices',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Device / Equipment Type <span class="req">*</span></label>
          <select id="f_device_type" required>
            <option value="">Select...</option>
            <option>Laptop / Desktop</option>
            <option>Monitor</option>
            <option>Printer / Scanner</option>
            <option>Keyboard / Mouse</option>
            <option>Phone</option>
            <option>Other peripheral</option>
          </select>
        </div>
        <div class="field"><label>Asset / Serial Number</label><input id="f_asset" placeholder="If known"></div>
      </div>
      <div class="field full"><label>Description of Issue <span class="req">*</span></label><textarea id="f_desc" placeholder="What is wrong with the device?" required></textarea></div>
      <div class="field full"><label>Additional Notes</label><textarea id="f_notes" placeholder="Any other details, like when it started..."></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':     { value: 'Hardware / Equipment' },
      'Requester_Name':  { value: v('f_requester') },
      'Requester_Email': { value: v('f_email') },
      'Device_Type':     { value: v('f_device_type') },
      'Asset_Number':    { value: v('f_asset') },
      'Description':     { value: v('f_desc') },
      'Notes':           { value: v('f_notes') },
      'Priority':        { value: currentPriority },
    })
  },
  software: {
    icon: '💾', title: 'Software / Application Help', sub: 'Request installs, licenses, or report app issues',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Application Name <span class="req">*</span></label><input id="f_app" placeholder="e.g. Microsoft Excel" required></div>
        <div class="field"><label>Request Type <span class="req">*</span></label>
          <select id="f_req_type" required>
            <option value="">Select...</option>
            <option>Install / Setup</option>
            <option>License needed</option>
            <option>App not working</option>
            <option>Error / Crash</option>
            <option>Update required</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div class="field full"><label>Description <span class="req">*</span></label><textarea id="f_desc" placeholder="Describe the issue or what you need..." required></textarea></div>
      <div class="field full"><label>Error Message (if any)</label><textarea id="f_error" placeholder="Paste any error messages here..."></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':      { value: 'Software / Application' },
      'Requester_Name':   { value: v('f_requester') },
      'Requester_Email':  { value: v('f_email') },
      'Application_Name': { value: v('f_app') },
      'Request_Type':     { value: v('f_req_type') },
      'Description':      { value: v('f_desc') },
      'Error_Message':    { value: v('f_error') },
      'Priority':         { value: currentPriority },
    })
  },
  password: {
    icon: '🔑', title: 'Password Reset', sub: 'Reset or recover access to a company system',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>System / Application <span class="req">*</span></label><input id="f_system" placeholder="e.g. Windows login, Kintone, email" required></div>
        <div class="field"><label>Username / Account</label><input id="f_username" placeholder="Your username for that system"></div>
      </div>
      <div class="field full"><label>Additional Notes</label><textarea id="f_notes" placeholder="Any extra context that may help IT..."></textarea></div>
    `,
    getData: () => ({
      'Ticket_Type':     { value: 'Password Reset' },
      'Requester_Name':  { value: v('f_requester') },
      'Requester_Email': { value: v('f_email') },
      'System':          { value: v('f_system') },
      'Username':        { value: v('f_username') },
      'Notes':           { value: v('f_notes') },
      'Priority':        { value: currentPriority },
    })
  },
  access: {
    icon: '🔐', title: 'Access & Permissions', sub: 'Request or modify access to systems and resources',
    fields: () => `
      <div class="form-row">
        <div class="field"><label>Your Name <span class="req">*</span></label><input id="f_requester" placeholder="Your full name" required></div>
        <div class="field"><label>Your Email <span class="req">*</span></label><input id="f_email" type="email" placeholder="you@can-one.com" required></div>
      </div>
      <div class="form-row">
        <div class="field"><label>System / Resource Needed <span class="req">*</span></label><input id="f_resource" placeholder="e.g. SharePoint folder, Salesforce" required></div>
        <div class="field"><label>Access Type</label>
          <select id="f_access_type">
            <option value="">Select...</option>
            <option>View only</option>
            <option>Edit / Contribute</option>
            <option>Full / Admin access</option>
            <option>Remove access</option>
          </select>
        </div>
      </div>
      <div class="field full"><label>Business Justification <span class="req">*</span></label><textarea id="f_reason" placeholder="Why do you need this access?" required></textarea></div>
      <div class="field full"><label>Manager Approval</label><input id="f_manager" placeholder="Manager's name (if pre-approved)"></div>
    `,
    getData: () => ({
      'Ticket_Type':        { value: 'Access & Permissions' },
      'Requester_Name':     { value: v('f_requester') },
      'Requester_Email':    { value: v('f_email') },
      'Resource_Requested': { value: v('f_resource') },
      'Access_Type':        { value: v('f_access_type') },
      'Business_Reason':    { value: v('f_reason') },
      'Manager_Approval':   { value: v('f_manager') },
      'Priority':           { value: currentPriority },
    })
  }
};

function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function openForm(type) {
  currentFormType = type;
  currentPriority = 'Medium';
  const f = FORMS[type];
  document.getElementById('fh-icon').textContent = f.icon;
  document.getElementById('fh-title').textContent = f.title;
  document.getElementById('fh-sub').textContent = f.sub;
  document.getElementById('form-body').innerHTML = `
    ${f.fields()}
    <hr class="divider">
    <div class="field full">
      <label>Priority</label>
      <div class="priority-row">
        <button class="priority-btn" data-p="Low" onclick="setPriority('Low',this)">🟢 Low</button>
        <button class="priority-btn active" data-p="Medium" onclick="setPriority('Medium',this)">🟡 Medium</button>
        <button class="priority-btn" data-p="High" onclick="setPriority('High',this)">🔴 High</button>
      </div>
    </div>
    <div class="form-footer">
      <button class="btn-cancel" onclick="goBack()">Cancel</button>
      <button class="btn-submit" id="submit-btn" onclick="submitTicket()">
        <span id="btn-label">Submit Ticket</span>
        <div class="spinner" id="btn-spinner"></div>
      </button>
    </div>
  `;
  document.getElementById('card-section').style.display = 'none';
  document.getElementById('success-panel').style.display = 'none';
  document.getElementById('form-panel').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setPriority(p, el) {
  currentPriority = p;
  document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function goBack() {
  document.getElementById('form-panel').style.display = 'none';
  document.getElementById('success-panel').style.display = 'none';
  document.getElementById('card-section').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function submitTicket() {
  const f = FORMS[currentFormType];
  const btn = document.getElementById('submit-btn');
  const spinner = document.getElementById('btn-spinner');
  const label = document.getElementById('btn-label');

  // Basic validation
  const requiredFields = document.querySelectorAll('#form-body [required]');
  for (const field of requiredFields) {
    if (!field.value.trim()) {
      field.focus();
      field.style.borderColor = 'var(--accent)';
      field.addEventListener('input', () => field.style.borderColor = '', { once: true });
      return;
    }
  }

  // Loading state
  btn.disabled = true;
  label.textContent = 'Submitting…';
  spinner.style.display = 'block';

  const record = f.getData();

  try {
    const targetUrl = `https://${KINTONE_SUBDOMAIN}.kintone.com/k/v1/record.json`;
    const response = await fetch(
      `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Cybozu-API-Token': KINTONE_API_TOKEN,
        },
        body: JSON.stringify({ app: KINTONE_APP_ID, record })
      }
    );

    const data = await response.json();

    if (response.ok && data.id) {
      document.getElementById('ticket-ref').textContent = `Ticket #${data.id} · ${FORMS[currentFormType].title}`;
      document.getElementById('form-panel').style.display = 'none';
      document.getElementById('success-panel').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    alert(`Error submitting ticket: ${err.message}\n\nPlease check that your Kintone App ID and API Token are correctly configured.`);
    btn.disabled = false;
    label.textContent = 'Submit Ticket';
    spinner.style.display = 'none';
  }
}