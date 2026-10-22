# Far From Home — editable multimodal website

Project 3, ENGL 1301 — working draft with one interview.

## How to view
1. Extract the whole ZIP (do not open the HTML while it is still inside the archive).
2. Open `index.html` in Chrome or Edge. Internet is not needed.
3. Keep all files together so the styling, interactions, and audio can load.

## Project files
- `index.html` — webpage structure, written content, participant transcript. Edit text and sections here.
- `styles.css` — typography, colors, layouts, responsiveness, audio panel. Colors are near the top under `:root`.
- `script.js` — interactive journey tabs, place selector, theme lenses, reflection controls. Update data inside `stages`, `places`, and `data`.
- `assets/interview-01.m4a` — audio from the interview video. The HTML audio player loads this relative file.
- `interview-transcript.txt` — convenient separate text transcript for editing and verifying uncertain words.

## Adding more interviews
Duplicate the `<section class="interview-media">` block in `index.html`, change headings and text,
put the next recording in `assets/`, and update the `src` for that new audio player.
Replace any unclear transcription with verified words after listening to the recording.

## Additional media
Place photos in `assets/` and insert an image in index.html, e.g.:
`<img src="assets/library.jpg" alt="TTU library study space">`
Use meaningful alt text, and request permission for identifiable people.

## Important research notes
- This site currently draws on ONE interview; avoid making claims about all international students.
- The interview participant's identity is not displayed. The interviewer states they have consent to include the audio.
- The caption-based transcript contains `[unclear]` markers. Verify exact quotations before final submission.
- Proposed observations and later interviews are labelled as future research.
- `index.html` is the main file to submit/publish along with the entire folder and media, not by itself.
- A separate formal Statement of Goals and Choices of at least 750 words is still required for the final assignment.
