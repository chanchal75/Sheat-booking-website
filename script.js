const desksGrid = document.getElementById('desksGrid');
const selectedDesksSpan = document.getElementById('selectedDesks');
const bookBtn = document.getElementById('bookBtn');
const resetBtn = document.getElementById('resetBtn');

let bookedDesks = [2, 5, 8, 14]; // example: some are already booked
let selectedDesks = [];

const totalDesks = 30;

function renderDesks() {
  desksGrid.innerHTML = '';
  for (let i = 1; i <= totalDesks; i++) {
    const desk = document.createElement('div');
    desk.classList.add('desk');
    desk.textContent = i;

    if (bookedDesks.includes(i)) {
      desk.classList.add('booked');
    } else {
      desk.addEventListener('click', () => toggleSelectDesk(i, desk));
    }
    desksGrid.appendChild(desk);
  }
}

function toggleSelectDesk(deskNum, deskEl) {
  if (selectedDesks.includes(deskNum)) {
    selectedDesks = selectedDesks.filter(n => n !== deskNum);
    deskEl.classList.remove('selected');
  } else {
    selectedDesks.push(deskNum);
    deskEl.classList.add('selected');
  }
  updateSelectedDisplay();
}

function updateSelectedDisplay() {
  selectedDesksSpan.textContent = selectedDesks.length > 0 ? selectedDesks.join(', ') : 'None';
}

bookBtn.addEventListener('click', () => {
  const name = document.getElementById('userName').value.trim();
  const team = document.getElementById('userTeam').value.trim();
  const date = document.getElementById('bookingDate').value;

  if (!name || !team || !date) {
    alert('Please fill Name, Team, and Date');
    return;
  }
  if (selectedDesks.length === 0) {
    alert('Please select at least one desk');
    return;
  }

  // Here you would send data to backend. For now show alert
  alert(`Booking Confirmed!\nName: ${name}\nTeam: ${team}\nDate: ${date}\nDesk(s): ${selectedDesks.join(', ')}`);

  // After booking, mark desks booked
  bookedDesks = bookedDesks.concat(selectedDesks);
  resetSelection();
  renderDesks();
});

resetBtn.addEventListener('click', () => {
  resetSelection();
});

function resetSelection() {
  selectedDesks = [];
  updateSelectedDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
  renderDesks();
});

