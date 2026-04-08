document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const formMessage = document.getElementById('form-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Minimal validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const service = document.getElementById('service').value;

            if (name && email && phone && date && service) {
                // Simulate an API call / successful submission
                bookingForm.style.display = 'none';

                formMessage.textContent = `Thank you, ${name}! Your appointment request for ${date} has been received. We will contact you at ${phone} or ${email} to confirm the details.`;
                formMessage.classList.remove('hidden');
                formMessage.classList.add('form-message', 'success');
            }
        });
    }
});
