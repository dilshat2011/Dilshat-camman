document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const tableContainer = document.getElementById('tableContainer');
    const userTableBody = document.getElementById('userTableBody');
    let userCount = 0;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get values
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Elements for error messages
        const firstNameError = document.getElementById('firstNameError');
        const lastNameError = document.getElementById('lastNameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Reset errors
        firstNameError.classList.add('hidden');
        lastNameError.classList.add('hidden');
        emailError.classList.add('hidden');
        passwordError.classList.add('hidden');

        let isValid = true;

        // Validation logic
        if (!firstName) {
            firstNameError.classList.remove('hidden');
            isValid = false;
        }

        if (!lastName) {
            lastNameError.classList.remove('hidden');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
             emailError.classList.remove('hidden');
             isValid = false;
        }

        if (!password || password.length < 6) {
             passwordError.classList.remove('hidden');
             isValid = false;
        }

        // If validation passes, add to table
        if (isValid) {
            userCount++;
            // Add row
            const tr = document.createElement('tr');
            tr.className = 'border-b border-dark-border hover:bg-slate-700/50 transition fade-in';
            tr.innerHTML = `
                <td class="py-3 px-4 font-medium text-gray-400">${userCount}</td>
                <td class="py-3 px-4">${escapeHTML(firstName)}</td>
                <td class="py-3 px-4">${escapeHTML(lastName)}</td>
                <td class="py-3 px-4">${escapeHTML(email)}</td>
            `;

            userTableBody.appendChild(tr);

            // Show table
            tableContainer.classList.remove('hidden');

            // Reset form
            form.reset();
        }
    });

    // Simple HTML escaper to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
