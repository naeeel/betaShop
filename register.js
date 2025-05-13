// Fungsi untuk menangani respons registrasi
function handleRegisterResponse(response) {
    if (response.status === 'success') {
        alert('Registrasi berhasil!');
        // ...redirect atau reset form...
    } else if (response.status === 'email_exists') {
        alert('Email sudah terpakai!');
    } else {
        alert('Registrasi gagal. Silakan coba lagi.');
    }
}

// Contoh pemanggilan setelah submit form:
function submitRegisterForm(formData) {
    // Kirim data ke backend
    fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(handleRegisterResponse)
    .catch(() => alert('Terjadi kesalahan jaringan.'));
}