// Toggle function for yes/no buttons
function toggle(id, value) {
    const yesBtn = document.querySelector(`#${id} .yes`);
    const noBtn = document.querySelector(`#${id} .no`);
    const input = document.getElementById(`${id}Input`);
  
    if (value === 'yes') {
      yesBtn.classList.add('active');
      noBtn.classList.remove('active');
      input.value = 'yes';
    } else {
      noBtn.classList.add('active');
      yesBtn.classList.remove('active');
      input.value = 'no';
    }
  }
  
  // Calculate Mileage
  function calculateMileage() {
    const pickupMileage = parseFloat(document.getElementById('pickupMileage').value) || 0;
    const dropoffMileage = parseFloat(document.getElementById('dropoffMileage').value) || 0;
    const totalMileage = Math.abs(dropoffMileage - pickupMileage);
  
    document.getElementById('totalMileage').value = totalMileage;
    document.getElementById('totalMileageHidden').value = totalMileage;
  }
  