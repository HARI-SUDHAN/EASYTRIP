
(function () {
    const defaultPhone = localStorage.getItem('phone') || '+91 6385443419';
    const nameValue = document.getElementById('nameValue');
    const emailValue = document.getElementById('emailValue');
    const genderValue = document.getElementById('genderValue');
    const dobValue = document.getElementById('dobValue');
    const phoneEl = document.getElementById('phone');

    const avatarEl = document.getElementById('avatar');
    const initialsEl = document.getElementById('initials');
    const avatarInput = document.getElementById('avatarInput');

    const editToggle = document.getElementById('editToggle');
    const editForm = document.getElementById('editForm');

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const genderInput = document.getElementById('genderInput');
    const dobInput = document.getElementById('dobInput');

    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const deleteBtn = document.getElementById('deleteBtn');

    // Load from localStorage
    function loadProfile() {
        const username = localStorage.getItem('username') || '';
        const email = localStorage.getItem('email') || '';
        const gender = localStorage.getItem('gender') || '';
        const dob = localStorage.getItem('dob') || '';
        const phone = localStorage.getItem('phone') || defaultPhone;
        const avatar = localStorage.getItem('avatar') || '';

        nameValue.textContent = username || '—';
        emailValue.textContent = email || '—';
        genderValue.textContent = gender || '—';
        dobValue.textContent = dob || '—';
        phoneEl.textContent = phone;

        // fill edit inputs
        nameInput.value = username;
        emailInput.value = email;
        genderInput.value = gender;
        dobInput.value = dob;

        // avatar (data url) or initials
        if (avatar) {
            avatarEl.style.backgroundImage = `url(${avatar})`;
            avatarEl.style.backgroundSize = 'cover';
            avatarEl.innerHTML = '';
        } else {
            avatarEl.style.backgroundImage = '';
            const initials = (username || '').split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase() || 'U';
            initialsEl.textContent = initials;
            if (!avatarEl.contains(initialsEl)) {
                avatarEl.innerHTML = '';
                avatarEl.appendChild(initialsEl);
            }
        }
    }

    loadProfile();

    // toggle edit
    let editing = false;
    editToggle.addEventListener('click', function () {
        editing = !editing;
        editForm.style.display = editing ? 'block' : 'none';
        editToggle.innerHTML = editing ? '<i class="fa-solid fa-xmark"></i> Close' : '<i class="fa-solid fa-pen"></i> Edit';
        // if opening, focus
        if (editing) nameInput.focus();
    });

    // save profile
    saveBtn.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const gender = genderInput.value;
        const dob = dobInput.value;

        if (!name) { alert('Full name required'); nameInput.focus(); return; }
        // basic email check
        if (email && !/^\S+@\S+\.\S+$/.test(email)) { alert('Please enter a valid email'); emailInput.focus(); return; }

        localStorage.setItem('username', name);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
        localStorage.setItem('dob', dob);

        // reflect
        loadProfile();
        editing = false;
        editForm.style.display = 'none';
        editToggle.innerHTML = '<i class="fa-solid fa-pen"></i> Edit';
        alert('Profile updated');
    });

    cancelBtn.addEventListener('click', function () {
        editing = false;
        editForm.style.display = 'none';
        editToggle.innerHTML = '<i class="fa-solid fa-pen"></i> Edit';
        // reset form values to stored
        loadProfile();
    });

    // logout clears username (but keeps other data optional)
    logoutBtn.addEventListener('click', function () {
        localStorage.removeItem('username'); // clear only login identity
        // redirect to login page
        window.location.href = 'login.html';
    });

    // delete account: remove all related keys
    deleteBtn.addEventListener('click', function () {
        if (!confirm('Delete account? This will remove your stored profile data.')) return;
        const keys = ['username', 'email', 'gender', 'dob', 'phone', 'avatar'];
        keys.forEach(k => localStorage.removeItem(k));
        alert('Account data deleted');
        window.location.href = 'signup.html';
    });

    // avatar upload preview and save to localStorage as data URL
    avatarInput.addEventListener('change', function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            const dataUrl = ev.target.result;
            localStorage.setItem('avatar', dataUrl);
            loadProfile();
        };
        reader.readAsDataURL(file);
    });

    
})();