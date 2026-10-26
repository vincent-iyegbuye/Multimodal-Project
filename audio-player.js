/* Shared audio controls. The original native players remain available without JavaScript. */
(() => {
  const recordings = [...document.querySelectorAll('audio')];
  const icons = {
    play: '<path d="m9 5 11 7-11 7V5Z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8 5v14M16 5v14" stroke-width="4"/>',
    volume: '<path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
    muted: '<path d="m11 5-5 4H3v6h3l5 4V5Z"/><path d="m16 9 6 6m0-6-6 6"/>'
  };
  const icon = name => '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  const clock = seconds => {
    if (!Number.isFinite(seconds)) return '–:––';
    const total = Math.max(0, Math.floor(seconds));
    return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
  };
  const spokenTime = seconds => {
    const total = Math.max(0, Math.floor(seconds));
    return Math.floor(total / 60) + ' minutes ' + (total % 60) + ' seconds';
  };

  recordings.forEach(audio => {
    const title = audio.getAttribute('aria-label') || 'Interview recording';
    const excerpt = audio.classList.contains('excerpt-player');
    const kind = excerpt ? 'excerpt' : 'interview';
    const player = element('div', 'audio-player');
    player.setAttribute('role', 'group');
    player.setAttribute('aria-label', title + ' — audio controls');

    const main = element('div', 'audio-player__main');
    const toggle = element('button', 'audio-player__toggle');
    toggle.type = 'button';
    const timeline = element('div', 'audio-player__timeline');
    const readout = element('div', 'audio-player__readout');
    const status = element('span', 'audio-player__state');
    status.setAttribute('role', 'status');
    const times = element('span', 'audio-player__times');
    times.setAttribute('aria-hidden', 'true');
    const elapsed = element('span', '', '0:00');
    const divider = element('span', 'audio-player__divider', '/');
    const duration = element('span', '', '–:––');
    times.append(elapsed, divider, duration);
    readout.append(status, times);

    const seek = element('input', 'audio-player__seek');
    seek.type = 'range';
    seek.min = '0';
    seek.max = '0';
    seek.step = '0.1';
    seek.value = '0';
    seek.disabled = true;
    seek.setAttribute('aria-label', 'Seek in ' + title);
    timeline.append(readout, seek);
    main.append(toggle, timeline);

    const toolbar = element('div', 'audio-player__toolbar');
    const format = element('span', 'audio-player__format', excerpt ? 'Short excerpt' : 'Full interview');
    const tools = element('div', 'audio-player__tools');
    const mute = element('button', 'audio-player__mute');
    mute.type = 'button';
    const speed = element('select', 'audio-player__speed');
    speed.setAttribute('aria-label', 'Playback speed for ' + title);
    [['0.75', '0.75×'], ['1', '1×'], ['1.25', '1.25×'], ['1.5', '1.5×'], ['2', '2×']].forEach(([value, label]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      speed.append(option);
    });
    speed.value = String(audio.playbackRate);
    tools.append(mute, speed);
    toolbar.append(format, tools);
    player.append(main, toolbar);

    let failed = false;
    let buffering = false;
    let starting = false;
    const sources = [...audio.querySelectorAll('source')];
    const failedSources = new Set();
    const hasDuration = () => Number.isFinite(audio.duration) && audio.duration > 0;
    const updateProgress = () => {
      const ready = hasDuration();
      const current = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
      seek.disabled = !ready || failed;
      seek.max = ready ? String(audio.duration) : '0';
      seek.value = ready ? String(current) : '0';
      seek.style.setProperty('--audio-progress', ready ? Math.min(100, current / audio.duration * 100) + '%' : '0%');
      seek.setAttribute('aria-valuetext', ready ? spokenTime(current) + ' of ' + spokenTime(audio.duration) : 'Duration not yet available');
      elapsed.textContent = clock(current);
      duration.textContent = clock(ready ? audio.duration : NaN);
    };
    const updatePlayback = () => {
      const playing = !audio.paused && !audio.ended;
      let message;
      if (failed) message = 'Could not load audio. Retry?';
      else if (starting || (buffering && playing)) message = 'Loading audio…';
      else if (audio.ended) message = 'Play again';
      else if (playing) message = 'Now playing';
      else if (audio.currentTime > 0) message = 'Paused';
      else message = 'Play ' + kind;
      // Only announce playback state changes, never the ticking time display.
      if (status.textContent !== message) status.textContent = message;
      const action = playing ? 'Pause' : failed ? 'Retry' : audio.ended ? 'Replay' : 'Play';
      toggle.setAttribute('aria-label', action + ': ' + title);
      toggle.title = action;
      toggle.innerHTML = icon(playing ? 'pause' : 'play');
      player.dataset.state = failed ? 'error' : playing ? 'playing' : 'paused';
    };
    const updateVolume = () => {
      const muted = audio.muted || audio.volume === 0;
      const action = muted ? 'Unmute' : 'Mute';
      mute.innerHTML = icon(muted ? 'muted' : 'volume');
      mute.setAttribute('aria-label', action + ': ' + title);
      mute.title = action;
    };

    toggle.addEventListener('click', async () => {
      if (!audio.paused) {
        audio.pause();
        return;
      }
      if (starting) return;
      if (failed || audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        failed = false;
        failedSources.clear();
        audio.load();
      }
      if (audio.ended) audio.currentTime = 0;
      starting = true;
      updatePlayback();
      try {
        await audio.play();
      } catch (error) {
        // A pause or a new source may cancel a pending play request normally.
        if (error.name !== 'AbortError') failed = true;
      } finally {
        starting = false;
        updateProgress();
        updatePlayback();
      }
    });
    seek.addEventListener('input', () => {
      if (!hasDuration()) return;
      audio.currentTime = Math.min(Number(seek.value), audio.duration);
      updateProgress();
    });
    mute.addEventListener('click', () => {
      const wasMuted = audio.muted || audio.volume === 0;
      if (wasMuted && audio.volume === 0) audio.volume = 1;
      audio.muted = !wasMuted;
    });
    speed.addEventListener('change', () => { audio.playbackRate = Number(speed.value); });
    audio.addEventListener('ratechange', () => { speed.value = String(audio.playbackRate); });
    audio.addEventListener('volumechange', updateVolume);
    ['loadedmetadata', 'durationchange', 'timeupdate', 'seeked', 'emptied'].forEach(event => audio.addEventListener(event, updateProgress));
    ['play', 'pause', 'ended'].forEach(event => audio.addEventListener(event, updatePlayback));
    audio.addEventListener('play', () => {
      recordings.forEach(other => { if (other !== audio) other.pause(); });
    });
    audio.addEventListener('waiting', () => { buffering = true; updatePlayback(); });
    ['playing', 'canplay'].forEach(event => audio.addEventListener(event, () => {
      buffering = false;
      updatePlayback();
    }));
    const reportError = () => {
      failed = true;
      starting = false;
      buffering = false;
      audio.pause();
      updateProgress();
      updatePlayback();
    };
    audio.addEventListener('error', reportError);
    // Nested <source> failures are not forwarded to the audio element.
    sources.forEach(source => source.addEventListener('error', () => {
      failedSources.add(source);
      if (failedSources.size === sources.length) reportError();
    }));

    updateProgress();
    updatePlayback();
    updateVolume();
    // Swap controls only after the custom interface has been initialized.
    audio.before(player);
    player.prepend(audio);
    audio.controls = false;
    audio.hidden = true;
    audio.preload = 'metadata';
    audio.load();
  });
})();
