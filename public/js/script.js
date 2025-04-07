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
  