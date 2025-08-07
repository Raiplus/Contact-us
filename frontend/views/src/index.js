document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopup');

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();//use to stop automatic refresing 


        const Name = document.getElementById('name').value.trim();
       

        const email = document.getElementById('email').value.trim();
        const question = document.getElementById('question').value.trim();
        const specialChars = /[`~!@#$%^&*()=+\-\/}{\]\[\'\"?,><;:]/;

        if (!Name || !email || !question) {
            alert('All fields are required.');
            return;
        }

        if (specialChars.test(Name)) {
            alert('Name contains invalid characters.');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }




        const data = {
            name: Name,
            email: email,
            query: question,
            
        };

        try {
            const response = await fetch('https://contact-us-7kco.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Response:', await response.json());
                successPopup.classList.remove('hidden');
                contactForm.reset();
            } else {
                alert(response.statusText)
                console.error('Server error:', response.statusText);
            }

        } catch (err) {
            
            console.error('Network or code error:', err);
            alert('network problem pless refresh your page or try to resolve internet problm')
        }
    });

    closePopupBtn.addEventListener('click', function () {
        successPopup.classList.add('hidden');
    });
});
