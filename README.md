# Countdown Timer

A small browser countdown timer with custom duration, quick presets, and a clear finish signal. Built with plain HTML, CSS and JavaScript, with no build step, server or external dependency.

## Features

- Set any duration in minutes and seconds
- Quick presets: 1, 5, 10 and 25 minutes
- Start, pause, resume and reset controls
- Live MM:SS display with a large, easy-to-read face
- Inputs lock while the timer runs so the target time cannot change mid-countdown
- Pulsing finish state and "Time's up!" message when the countdown reaches zero
- Responsive layout that works on desktop and mobile

## How to run

Open `index.html` in any modern browser. There is nothing to install or build.

## How to use

1. Enter minutes and seconds, or tap a preset chip.
2. Press **Start**. The display counts down and the inputs lock.
3. Press **Pause** to hold the remaining time, then **Resume** to continue.
4. Press **Reset** to stop the timer and reload the duration from the inputs.
5. When the countdown finishes, the display pulses and shows **Done**.

## Files

- `index.html` - page structure, display, inputs and controls
- `styles.css` - layout, display states, finish pulse and responsive rules
- `script.js` - timer logic: countdown, pause/resume, presets and finish state

## Credit

Created with AI assistance as part of a daily practice project series.
