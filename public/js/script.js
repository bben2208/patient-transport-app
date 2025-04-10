function toggle(id, value) {
    const toggleBtn = document.getElementById(id);
    const yesOption = toggleBtn.querySelector('.option.yes');
    const noOption = toggleBtn.querySelector('.option.no');
    const hiddenInput = document.getElementById(id + 'Input');
  
    if (value === 'yes') {
      yesOption.classList.add('active');
      noOption.classList.remove('active');
    } else {
      yesOption.classList.remove('active');
      noOption.classList.add('active');
    }
    
    hiddenInput.value = value;
  }
  
  // Example mileage calculation
  function calculateMileage() {
    const pickupMileage = Number(document.getElementById('pickupMileage').value);
    const dropoffMileage = Number(document.getElementById('dropoffMileage').value);
    const totalMileage = document.getElementById('totalMileage');
    const totalMileageHidden = document.getElementById('totalMileageHidden');
  
    if (!isNaN(pickupMileage) && !isNaN(dropoffMileage)) {
      const miles = Math.abs(dropoffMileage - pickupMileage);
      totalMileage.value = miles;
      totalMileageHidden.value = miles;
    }
  }
  document.addEventListener('DOMContentLoaded', function() {
    // Handle create button on dashboard
    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
      createBtn.addEventListener('click', function() {
        window.location.href = '/create';
      });
    }
    
    // Attach delete confirmation to delete forms on dashboard
    const deleteForms = document.querySelectorAll('form.delete-form');
    deleteForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        const confirmed = confirm("Are you sure you want to delete the patient?");
        if (!confirmed) {
          e.preventDefault();
        }
      });
    });
    
    // Function to calculate duration on the form page
    const pickupTimeInput = document.getElementById('pickupTime');
    const dropoffTimeInput = document.getElementById('dropoffTime');
    const durationInput = document.getElementById('duration');
  
    function calculateDuration() {
      if (pickupTimeInput && dropoffTimeInput && durationInput) {
        const pickupValue = pickupTimeInput.value;
        const dropoffValue = dropoffTimeInput.value;
        if (pickupValue && dropoffValue) {
          const pickupTime = new Date(pickupValue);
          const dropoffTime = new Date(dropoffValue);
          const diffMs = dropoffTime - pickupTime;
          const diffMinutes = Math.round(diffMs / (1000 * 60));
          durationInput.value = diffMinutes;
        }
      }
    }
  
    if (pickupTimeInput) {
      pickupTimeInput.addEventListener('change', calculateDuration);
    }
    if (dropoffTimeInput) {
      dropoffTimeInput.addEventListener('change', calculateDuration);
    }
  });
  