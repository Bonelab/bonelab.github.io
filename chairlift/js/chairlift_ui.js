// Allowed lift types
const LIFT_TYPES = ['gondola', 'chairlift', 't-bar', 'platter'];

// Lift Struct
class Lift {
    constructor(skihillName, liftName, numLifts, liftType, peoplePerLift, bottomElevation, topElevation, bullwheelOffset, chairSpacing, speedLiftPerSec) {
        if (!LIFT_TYPES.includes(liftType)) {
            throw new Error(`Invalid liftType "${liftType}". Must be one of: ${LIFT_TYPES.join(', ')}`);
        }
        this.skihillName = skihillName;
        this.liftName = liftName;
        this.numLifts = numLifts;
        this.liftType = liftType;
        this.peoplePerLift = peoplePerLift;
        this.bottomElevation = bottomElevation;
        this.topElevation = topElevation;
        this.bullwheelOffset = bullwheelOffset;
        this.chairSpacing = chairSpacing;
        this.speedLiftPerSec = speedLiftPerSec;
    }
}

// Array of lifts
const lifts = [
    new Lift("Sunshine Village", "Village Gondola", 42, "gondola", 6, 2100, 2450, 1.2, 3.5, 0.8),
    new Lift("Sunshine Village", "Teepee Town LX", 38, "chairlift", 4, 2100, 2600, 1.5, 4.0, 1.2),
    new Lift("Lake Louise", "Glacier Express", 50, "chairlift", 4, 1650, 2250, 1.0, 3.2, 0.9),
    new Lift("Lake Louise", "Summit", 72, "chairlift", 4, 1700, 2400, 1.0, 3.3, 0.92),
    new Lift("Lake Louise", "Paradise", 140, "chairlift", 3, 2100, 2450, 1.2, 3.5, 0.8),
    new Lift("Lake Louise", "Ptarmigan", 135, "chairlift", 4, 2100, 2450, 1.2, 3.5, 0.8),
    new Lift("Banff Norquay", "Mystic", 35, "chairlift", 2, 1650, 2130, 1.1, 3.4, 0.85),
    new Lift("Banff Norquay", "Cascade", 35, "chairlift", 2, 1650, 2130, 1.1, 3.4, 0.85),
    new Lift("Banff Norquay", "North American", 35, "chairlift", 2, 1650, 2130, 1.1, 3.4, 0.85),
    new Lift("Whistler Blackcomb", "Peak 2 Peak", 52, "gondola", 15, 675, 2182, 1.6, 4.2, 1.0),
    new Lift("Whistler Blackcomb", "Harmony 6 Express", 52, "chairlift", 15, 675, 2182, 1.6, 4.2, 1.0),
    new Lift("Kicking Horse", "Golden Eagle", 45, "gondola", 2, 1260, 2450, 1.3, 3.6, 0.95),
    new Lift("Kicking Horse", "Stairway to Heaven", 45, "chairlift", 2, 1260, 2450, 1.3, 3.6, 0.95)
];

// Current time display functions
function initClock() { 
  updateClock(); 
  setInterval(updateClock, 1000); 
}

function updateClock() { 
  var d = new Date(); 
  var s = d.toLocaleTimeString(); 
  var el = document.getElementById('time_display'); 
  if (el) el.textContent = s; 
  var pel = document.getElementById('plan_time_display'); 
  if (pel) pel.textContent = s; 
}

// Stopwatch variables
var _swInterval = null;
var _swStart = 0;
var _swElapsed = 0;

function formatStopwatch(ms) {
  var total = Math.max(0, ms);
  var hrs = Math.floor(total / 3600000);
  var mins = Math.floor((total % 3600000) / 60000);
  var secs = Math.floor((total % 60000) / 1000);
  var tenths = Math.floor((total % 1000) / 100);
  return String(hrs).padStart(2, '0') + ":" + String(mins).padStart(2, '0') + ":" + String(secs).padStart(2, '0') + "." + String(tenths);
}

function updateStopwatch() {
  _swElapsed = Date.now() - _swStart;
  var el = document.getElementById('stopwatch_display');
  if (el) el.textContent = formatStopwatch(_swElapsed);
}

function startStopwatch() {
  if (_swInterval) return;  // Already running
  _swStart = Date.now() - _swElapsed;
  _swInterval = setInterval(updateStopwatch, 100);
  updateStopwatch();  // Initial display update
}

function stopStopwatch() {
  if (!_swInterval) return;  // Not running
  clearInterval(_swInterval);
  _swInterval = null;
  _swElapsed = Date.now() - _swStart;
  updateStopwatch();
}

function resetStopwatch() {
  if (_swInterval) {
    clearInterval(_swInterval);
    _swInterval = null;
  }
  _swElapsed = 0;
  _swStart = Date.now();
  var el = document.getElementById('stopwatch_display');
  if (el) el.textContent = formatStopwatch(0);
}

function toggleStopwatch() {
  if (_swInterval) {
    stopStopwatch();
  } else {
    resetStopwatch();
    startStopwatch();
  }
}

// Calculate seconds per lift from stopwatch time and number of lifts passing
function calculateSecondsPerLift() {
  const stopwatchEl = document.getElementById('stopwatch_display');
  const numLiftsEl = document.getElementById('num_lifts_passing');
  const resultEl = document.getElementById('lifts_per_second');
  
  if (!stopwatchEl || !numLiftsEl || !resultEl) return;
  
  // Get the elapsed time in milliseconds
  const elapsedMs = _swElapsed;
  const elapsedSeconds = elapsedMs / 1000;
  
  // Get number of lifts passing
  const numLifts = parseInt(numLiftsEl.value) || 0;
  
  if (elapsedSeconds <= 0 || numLifts <= 0) {
    alert('Please start the stopwatch and select number of lifts passing.');
    resultEl.textContent = '';
    return;
  }
  
    // Calculate seconds per lift (elapsed seconds divided by number of lifts)
    const secondsPerLift = elapsedSeconds / numLifts;
  
    // Display result with 3 decimal places
    resultEl.textContent = `${secondsPerLift.toFixed(3)} seconds/lift`;
}

// Lift management functions
function loadSkihillDropdown() {
    const dropdown = document.getElementById('skihill_dropdown');
    if (!dropdown) return;
    const uniqueSkihills = [...new Set(lifts.map(l => l.skihillName))].sort();
    dropdown.innerHTML = '<option value="">-- Select Ski Hill --</option>';
    uniqueSkihills.forEach(skihill => {
        const option = document.createElement('option');
        option.value = skihill;
        option.textContent = skihill;
        dropdown.appendChild(option);
    });
    // Clear dependent dropdowns
    const liftNameDropdown = document.getElementById('lift_name_dropdown');
    if (liftNameDropdown) liftNameDropdown.innerHTML = '<option value="">-- Select Lift --</option>';
    clearLiftDetails();
    // Set default skihill to 'Lake Louise' if present and try to prefer lift 'Paradise'.
    const defaultSkihill = 'Lake Louise';
    const preferredLift = 'Paradise';
    if (uniqueSkihills.includes(defaultSkihill)) {
        dropdown.value = defaultSkihill;
        // Populate lift names for this skihill and try to select preferred lift
        loadLiftNameDropdown();
        const liftNameDropdown = document.getElementById('lift_name_dropdown');
        if (liftNameDropdown) {
            // If preferred lift exists under Lake Louise, it will already be selected by loadLiftNameDropdown.
            let found = Array.from(liftNameDropdown.options).some(o => o.text.toLowerCase() === preferredLift.toLowerCase());
            if (!found) {
                // Search all lifts for preferredLift and switch skihill to that lift if found
                const liftAnywhere = lifts.find(l => l.liftName.toLowerCase() === preferredLift.toLowerCase());
                if (liftAnywhere) {
                    dropdown.value = liftAnywhere.skihillName;
                    loadLiftNameDropdown();
                    // select the preferred lift option
                    const lnd = document.getElementById('lift_name_dropdown');
                    if (lnd) {
                        for (let i = 0; i < lnd.options.length; i++) {
                            if (lnd.options[i].text.toLowerCase() === preferredLift.toLowerCase()) {
                                lnd.selectedIndex = i;
                                break;
                            }
                        }
                        displayLiftDetails();
                    }
                }
            }
        }
    }
}

function loadLiftNameDropdown() {
    const skihillDropdown = document.getElementById('skihill_dropdown');
    const liftNameDropdown = document.getElementById('lift_name_dropdown');
    if (!skihillDropdown || !liftNameDropdown) return;
    
    const selectedSkihill = skihillDropdown.value;
    if (!selectedSkihill) {
        liftNameDropdown.innerHTML = '<option value="">-- Select Lift --</option>';
        clearLiftDetails();
        return;
    }
    
    const liftsForSkihill = lifts.filter(l => l.skihillName === selectedSkihill);
    liftNameDropdown.innerHTML = '<option value="">-- Select Lift --</option>';
    liftsForSkihill.forEach((lift, index) => {
        const option = document.createElement('option');
        option.value = index + '_' + selectedSkihill; // unique key
        option.textContent = lift.liftName;
        liftNameDropdown.appendChild(option);
    });
    // Try to select default lift name 'Paradise' under the chosen skihill.
    const preferredLift = 'Paradise';
    let selectedValue = '';
    for (let i = 0; i < liftNameDropdown.options.length; i++) {
        const opt = liftNameDropdown.options[i];
        if (opt.text === preferredLift) {
            selectedValue = opt.value;
            break;
        }
    }
    // If preferred lift not found, select the first real lift (index 1)
    if (!selectedValue && liftNameDropdown.options.length > 1) {
        selectedValue = liftNameDropdown.options[1].value;
    }
    if (selectedValue) {
        liftNameDropdown.value = selectedValue;
    }
    // Update displayed details
    displayLiftDetails();
}

function displayLiftDetails() {
    const skihillDropdown = document.getElementById('skihill_dropdown');
    const liftNameDropdown = document.getElementById('lift_name_dropdown');
    if (!skihillDropdown || !liftNameDropdown) return;
    
    const selectedSkihill = skihillDropdown.value;
    const liftValue = liftNameDropdown.value;
    
    if (!selectedSkihill || !liftValue) {
        clearLiftDetails();
        return;
    }
    
    const liftsForSkihill = lifts.filter(l => l.skihillName === selectedSkihill);
    const [indexStr] = liftValue.split('_');
    const liftIndex = parseInt(indexStr);
    
    if (liftIndex < 0 || liftIndex >= liftsForSkihill.length) {
        clearLiftDetails();
        return;
    }
    
    const lift = liftsForSkihill[liftIndex];
    
    const fields = {
        'lift_num_lifts': lift.numLifts,
        'lift_type': lift.liftType,
        'lift_people_per_lift': lift.peoplePerLift,
        'lift_bottom_elevation': lift.bottomElevation,
        'lift_top_elevation': lift.topElevation,
        'lift_bullwheel_offset': lift.bullwheelOffset,
        'lift_chair_spacing': lift.chairSpacing,
        'lift_speed_per_sec': lift.speedLiftPerSec
    };
    
    Object.entries(fields).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
    // expose current lift for other UI pieces
    window.currentLift = lift;
    // populate chair selection dropdowns for planning
    if (typeof populateChairDropdowns === 'function') populateChairDropdowns();
}

function clearLiftDetails() {
    const fields = [
        'lift_num_lifts', 'lift_type', 'lift_people_per_lift', 'lift_bottom_elevation',
        'lift_top_elevation', 'lift_bullwheel_offset', 'lift_chair_spacing', 'lift_speed_per_sec'
    ];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}

// Populate my/passing chair dropdowns based on current lift
function populateChairDropdowns() {
    const myEl = document.getElementById('my_chair_dropdown');
    const passEl = document.getElementById('passing_chair_dropdown');
    if (!myEl || !passEl) return;
    const lift = window.currentLift;
    if (!lift || !lift.numLifts) {
        myEl.innerHTML = '';
        passEl.innerHTML = '';
        return;
    }
    const n = Number(lift.numLifts) || 0;
    myEl.innerHTML = '';
    passEl.innerHTML = '';
    for (let i = 1; i <= n && i <= 200; i++) {
        const o1 = document.createElement('option'); o1.value = i; o1.textContent = i; myEl.appendChild(o1);
        const o2 = document.createElement('option'); o2.value = i; o2.textContent = i; passEl.appendChild(o2);
    }
    // sensible defaults
    myEl.value = 1;
    passEl.value = n >= 2 ? 2 : 1;
}

// Calculate arrival time based on chairlift information and chair selections
// Takes: myChair (int), passingChair (int), liftSpeed (lifts/sec), numLifts (total chairs)
// Returns: object with { arrivalTime (Date), seconds (elapsed time), timeString (formatted time) }
function calculateArrivalTime(myChair, passingChair, liftSpeed, numLifts) {
    if (!myChair || !passingChair || !liftSpeed || !numLifts) {
        return null;
    }
    
    const my = parseInt(myChair) || 0;
    const pass = parseInt(passingChair) || 0;
    const speed = Number(liftSpeed) || 0;
    const total = Number(numLifts) || 0;
    
    if (my <= 0 || pass <= 0 || speed <= 0 || total <= 0) {
        return null;
    }
    
    // Calculate chairs between my and passing (forward direction)
    let chairsBetween = pass - my;
    if (chairsBetween < 0) chairsBetween = (pass + total) - my;
    // If same chair, treat as full loop
    if (chairsBetween === 0) chairsBetween = total;
    
    const seconds = chairsBetween / speed;
    const arrivalTime = new Date(Date.now() + Math.round(seconds * 1000));
    
    return {
        arrivalTime: arrivalTime,
        seconds: seconds,
        timeString: arrivalTime.toLocaleTimeString()
    };
}

// Compute ETA based on chair difference and lift speed
function computeETAGo() {
    const myEl = document.getElementById('my_chair_dropdown');
    const passEl = document.getElementById('passing_chair_dropdown');
    const resultEl = document.getElementById('eta_result');
    if (!myEl || !passEl) return;
    const my = parseInt(myEl.value) || 0;
    const pass = parseInt(passEl.value) || 0;
    const lift = window.currentLift;
    if (!lift) { alert('No lift selected.'); if(resultEl) resultEl.textContent=''; return; }
    const total = Number(lift.numLifts) || 0;
    const speed = Number(lift.speedLiftPerSec) || 0;
    if (total <= 0 || speed <= 0) { alert('Lift data incomplete (num lifts or speed).'); if(resultEl) resultEl.textContent=''; return; }
    
    // Use the new calculateArrivalTime function
    const result = calculateArrivalTime(my, pass, speed, total);
    if (result && resultEl) {
        resultEl.textContent = `ETA: ${result.timeString} (in ${result.seconds.toFixed(2)}s)`;
    }
}
