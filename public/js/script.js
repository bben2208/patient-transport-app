function toggle(toggleId, value) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(`${toggleId}Input`);
  
    // Remove active class from all options
    toggle.querySelectorAll('.option').forEach(option => option.classList.remove('active'));
  
    // Add active class to the clicked option
    const selectedOption = value === 'yes' 
      ? toggle.querySelector('.yes') 
      : toggle.querySelector('.no');
      
    selectedOption.classList.add('active');
  
    // Update hidden input value
    input.value = value;
  }
  function calculateMileage() {
    const pickupMileage = parseFloat(document.getElementById('pickupMileage').value) || 0;
    const dropoffMileage = parseFloat(document.getElementById('dropoffMileage').value) || 0;
  
    if (dropoffMileage >= pickupMileage) {
      const totalMileage = dropoffMileage - pickupMileage;
      document.getElementById('totalMileage').value = totalMileage;
    } else {
      document.getElementById('totalMileage').value = '';
    }
  }
  