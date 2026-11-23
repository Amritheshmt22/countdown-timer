(function () {
  'use strict';

  var display = document.getElementById('display');
  var timeEl = document.getElementById('time');
  var stateEl = document.getElementById('state');
  var minutesInput = document.getElementById('minutes');
  var secondsInput = document.getElementById('seconds');
  var startPauseBtn = document.getElementById('startPause');
  var resetBtn = document.getElementById('reset');
  var messageEl = document.getElementById('message');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));

  var durationMs = 0;
  var remainingMs = 0;
  var running = false;
  var finished = false;
  var timerId = null;
  var endAt = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function format(ms) {
    var total = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(total / 60);
    var s = total % 60;
    return pad(m) + ':' + pad(s);
  }

  function render() {
    timeEl.textContent = format(remainingMs);
  }

  function readInputs() {
    var m = parseInt(minutesInput.value, 10);
    var s = parseInt(secondsInput.value, 10);
    if (isNaN(m) || m < 0) m = 0;
    if (isNaN(s) || s < 0) s = 0;
    if (m > 999) m = 999;
    if (s > 59) s = 59;
    return (m * 60 + s) * 1000;
  }

  function setInputsEnabled(enabled) {
    minutesInput.disabled = !enabled;
    secondsInput.disabled = !enabled;
    chips.forEach(function (c) { c.disabled = !enabled; });
  }

  function setState(text, cls) {
    stateEl.textContent = text;
    display.classList.remove('running', 'finished');
    if (cls) display.classList.add(cls);
  }

  function loadFromInputs() {
    durationMs = readInputs();
    remainingMs = durationMs;
    render();
  }

  function tick() {
    remainingMs = endAt - Date.now();
    if (remainingMs <= 0) {
      remainingMs = 0;
      render();
      stopTimer();
      running = false;
      finished = true;
      setState('Done', 'finished');
      startPauseBtn.textContent = 'Start';
      messageEl.textContent = "Time's up!";
      messageEl.classList.add('done');
      return;
    }
    render();
  }

  function startTimer() {
    endAt = Date.now() + remainingMs;
    timerId = setInterval(tick, 200);
  }

  function stopTimer() {
    clearInterval(timerId);
    timerId = null;
  }

  function onStartPause() {
    if (running) {
      stopTimer();
      running = false;
      setState('Paused', null);
      startPauseBtn.textContent = 'Resume';
      messageEl.textContent = '';
      return;
    }
    if (finished || remainingMs <= 0) {
      loadFromInputs();
      finished = false;
      messageEl.classList.remove('done');
      messageEl.textContent = '';
    }
    if (remainingMs <= 0) {
      messageEl.textContent = 'Set a duration first.';
      return;
    }
    running = true;
    setState('Running', 'running');
    startPauseBtn.textContent = 'Pause';
    messageEl.textContent = '';
    setInputsEnabled(false);
    startTimer();
  }

  function onReset() {
    stopTimer();
    running = false;
    finished = false;
    setInputsEnabled(true);
    setState('Ready', null);
    startPauseBtn.textContent = 'Start';
    messageEl.textContent = '';
    messageEl.classList.remove('done');
    loadFromInputs();
  }

  minutesInput.addEventListener('input', function () { if (!running) loadFromInputs(); });
  secondsInput.addEventListener('input', function () { if (!running) loadFromInputs(); });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (running) return;
      minutesInput.value = chip.dataset.min;
      secondsInput.value = '0';
      finished = false;
      messageEl.textContent = '';
      messageEl.classList.remove('done');
      setState('Ready', null);
      startPauseBtn.textContent = 'Start';
      loadFromInputs();
    });
  });

  startPauseBtn.addEventListener('click', onStartPause);
  resetBtn.addEventListener('click', onReset);

  loadFromInputs();
})();
