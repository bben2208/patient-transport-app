document.addEventListener('DOMContentLoaded', function() {
    // Handle create button
    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
      createBtn.addEventListener('click', function() {
        window.location.href = '/create';
      });
    }
    
    // Attach confirmation to delete forms
    const deleteForms = document.querySelectorAll('form.delete-form');
    deleteForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        const confirmed = confirm("Are you sure you want to delete the patient?");
        if (!confirmed) {
          e.preventDefault();
        }
      });
    });
  });
  console.log('Dashboard.js loaded');
