(function() {
  'use strict';

  let pyodide = null;
  let pyodideReady = false;
  let currentMarkdown = '';
  let selectedTemplate = 'neumorphism';
  let historyItems = [];
  let isGenerating = false;
  let lastRenderedMarkdown = '';
  let lastCompatContent = '';
  let lastCompatResult = null;
  let selectedTemplateId = null;
  const INCLUDE_EXTERNAL_CAPSULES = false;

  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var ctx = this, args = arguments;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function() { fn.apply(ctx, args); }, delay);
    };
  }

  function isValidGitHubUsername(username) {
    if (!username || typeof username !== 'string') return false;
    return /^(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/.test(username.trim());
  }

  const DEMO_DATA = {
    name: 'Surya K',
    username: 'Suryakumar45',
    title: 'BCA Student & Aspiring Full-Stack Developer',
    bio: 'Passionate BCA student who enjoys building modern web applications, learning new technologies and solving real-world problems.',
    location: 'Coimbatore, India',
    email: 'suryakumar45@example.com',
    education: 'Bachelor of Computer Applications',
    college: 'PSG College of Arts and Science',
    aboutMe: 'I am a dedicated BCA student with a strong passion for full-stack web development. I love turning ideas into functional, beautiful web applications.',
    learning: 'Full-Stack Web Development with React, Python, FastAPI, and modern database technologies',
    funFact: 'I debug better with chai than with console.log!'
  };

  const TYPING_LINES = {
    neumorphism: ['Hi there 👋', 'Soft shadows, clean code', 'Minimal by design'],
    glassmorphism: ['💎 Ruby Frost', 'UI/UX Designer', 'Frosted elegance'],
    skeuomorphism: ['📒 Ada Lovelace', 'Code Poet', 'Real and tangible'],
    claymorphism: ['🧸 Molly Clay', 'Creative Coder', 'Soft and playful'],
    auroraism: ['🌌 Nova Star', 'Space Engineer', 'Northern lights glow'],
    frostedmorphism: ['❄️ Winter Dev', 'Frost Engineer', 'Crisp and icy'],
    gradientmorphism: ['🌈 Chroma Dev', 'Full-Stack Artist', 'Colors in motion'],
    layermorphism: ['🗂️ Layered One', 'Depth Architect', 'Stacked dimensions'],
    polymorphism: ['🔷 Geo Coder', 'Algorithm Artist', 'Shapes and logic'],
    metamorphism: ['🦋 Morph Dev', 'Shape Shifter', 'Ever evolving']
  };

  const TEMPLATE_CONFIGS = {
    neumorphism: { emoji: '⚪', name: 'Neumorphism', filter: 'soft' },
    glassmorphism: { emoji: '💎', name: 'Glassmorphism', filter: 'glass' },
    skeuomorphism: { emoji: '📒', name: 'Skeuomorphism', filter: 'real' },
    claymorphism: { emoji: '🧸', name: 'Claymorphism', filter: 'playful' },
    auroraism: { emoji: '🌌', name: 'Auroraism', filter: 'dark' },
    frostedmorphism: { emoji: '❄️', name: 'Frostedmorphism', filter: 'icy' },
    gradientmorphism: { emoji: '🌈', name: 'Gradientmorphism', filter: 'vibrant' },
    layermorphism: { emoji: '🗂️', name: 'Layermorphism', filter: 'depth' },
    polymorphism: { emoji: '🔷', name: 'Polymorphism', filter: 'geo' },
    metamorphism: { emoji: '🦋', name: 'Metamorphism', filter: 'dynamic' }
  };

  const TEMPLATE_THEMES = {
    neumorphism: { pageBg: '#e0e5ec', cardBg: '#d1d8e0', primaryText: '#111827', secondaryText: '#4b5563', headingColor: '#0f172a', accent: '#6c5ce7', border: '#c0c7cf', progressFill: '#6c5ce7', iconColor: '#6c5ce7' },
    glassmorphism: { pageBg: '#1a0533', cardBg: 'rgba(255,255,255,0.06)', primaryText: '#f1f5f9', secondaryText: '#94a3b8', headingColor: '#c4b5fd', accent: '#a78bfa', border: 'rgba(255,255,255,0.12)', progressFill: '#a78bfa', iconColor: '#a78bfa' },
    skeuomorphism: { pageBg: '#f5f0e8', cardBg: '#faf6ee', primaryText: '#3e2c1a', secondaryText: '#6b4c14', headingColor: '#8b4513', accent: '#8b4513', border: '#d4c5a9', progressFill: '#8b4513', iconColor: '#8b6914' },
    claymorphism: { pageBg: '#fce4ec', cardBg: 'rgba(255,255,255,0.5)', primaryText: '#2d1b2e', secondaryText: '#5c3d5a', headingColor: '#e91e63', accent: '#e91e63', border: 'rgba(233,30,99,0.12)', progressFill: '#e91e63', iconColor: '#e91e63' },
    auroraism: { pageBg: '#0a0e1a', cardBg: 'rgba(10,14,26,0.8)', primaryText: '#e8f0f0', secondaryText: '#8899aa', headingColor: '#00ff88', accent: '#00ff88', border: 'rgba(0,255,136,0.15)', progressFill: '#00ff88', iconColor: '#00ff88' },
    frostedmorphism: { pageBg: '#e3f2fd', cardBg: 'rgba(255,255,255,0.35)', primaryText: '#0d2137', secondaryText: '#1a237e', headingColor: '#1565c0', accent: '#1565c0', border: 'rgba(255,255,255,0.5)', progressFill: '#1565c0', iconColor: '#1565c0' },
    gradientmorphism: { pageBg: '#0f0c29', cardBg: 'rgba(255,255,255,0.04)', primaryText: '#ffffff', secondaryText: '#a5b4fc', headingColor: '#f472b6', accent: '#f472b6', border: 'rgba(255,255,255,0.08)', progressFill: '#f472b6', iconColor: '#f472b6' },
    layermorphism: { pageBg: '#1a1a2e', cardBg: '#222240', primaryText: '#e0e0f0', secondaryText: '#6b6b80', headingColor: '#a78bfa', accent: '#a78bfa', border: '#2a2a4e', progressFill: '#a78bfa', iconColor: '#a78bfa' },
    polymorphism: { pageBg: '#0f0a1e', cardBg: 'rgba(244,114,182,0.04)', primaryText: '#e8e0f0', secondaryText: '#a088b0', headingColor: '#f472b6', accent: '#f472b6', border: 'rgba(244,114,182,0.12)', progressFill: '#f472b6', iconColor: '#f472b6' },
    metamorphism: { pageBg: '#0d0d1a', cardBg: 'rgba(192,132,252,0.04)', primaryText: '#f0e8ff', secondaryText: '#8890a8', headingColor: '#c084fc', accent: '#c084fc', border: 'rgba(192,132,252,0.12)', progressFill: '#c084fc', iconColor: '#c084fc' }
  };

  const TEMPLATE_WIDGET_TYPES = {
    neumorphism: { stats: 'flatTiles', langs: 'thinBars', activity: 'contributionGrid', skills: 'flatBadges' },
    glassmorphism: { stats: 'frostPanels', langs: 'gradientBars', activity: 'calendarGrid', skills: 'glassChips' },
    skeuomorphism: { stats: 'journalCards', langs: 'notebookBars', activity: 'paperGraph', skills: 'retroTags' },
    claymorphism: { stats: 'softCards', langs: 'pillBars', activity: 'roundedGrid', skills: 'clayBadges' },
    auroraism: { stats: 'neonPanels', langs: 'segmentedBars', activity: 'waveGraph', skills: 'outlineTags' },
    frostedmorphism: { stats: 'iceTiles', langs: 'frozenBars', activity: 'crystalGrid', skills: 'frostChips' },
    gradientmorphism: { stats: 'spectrumCards', langs: 'rainbowBars', activity: 'auroraGraph', skills: 'shimmerTags' },
    layermorphism: { stats: 'stackedLayers', langs: 'depthBars', activity: 'timelineGraph', skills: 'layerTags' },
    polymorphism: { stats: 'hexTiles', langs: 'angularBars', activity: 'geometricGrid', skills: 'diamondTags' },
    metamorphism: { stats: 'morphCards', langs: 'fluidBars', activity: 'morphingGraph', skills: 'phaseTags' }
  };

  function getEl(id) { return document.getElementById(id); }

  function showToast(msg, type = 'info') {
    const container = getEl('toastContainer');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    container.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; setTimeout(() => t.remove(), 300); }, 3000);
  }

  function openModal(title, content) {
    getEl('modalTitle').textContent = title;
    getEl('modalBody').innerHTML = content;
    getEl('modalOverlay').classList.add('open');
  }

  function closeModal() { getEl('modalOverlay')?.classList.remove('open'); }
  getEl('modalClose')?.addEventListener('click', closeModal);
  getEl('modalOverlay')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });

  function getFormData() {
    const data = {
      template: selectedTemplate,
      name: getEl('name').value.trim() || 'User',
      username: getEl('username').value.trim() || 'user',
      title: getEl('title').value.trim() || 'Developer',
      bio: getEl('bio').value.trim() || '',
      location: getEl('location').value.trim() || '',
      email: getEl('email').value.trim() || '',
      education: getEl('education').value.trim() || '',
      college: getEl('college').value.trim() || '',
      portfolio: getEl('portfolio').value.trim() || '',
      aboutMe: getEl('aboutMe').value.trim() || '',
      currentProject: getEl('currentProject').value.trim() || '',
      learning: getEl('learning').value.trim() || '',
      collab: getEl('collab').value.trim() || '',
      expertise: getEl('expertise').value.trim() || '',
      goal: getEl('goal').value.trim() || '',
      funFact: getEl('funFact').value.trim() || '',
      status: getEl('status').value || '',
      accentColor: getEl('accentColor').value.replace('#', ''),
      typingFont: getEl('typingFont').value,
      typingSpeed: parseInt(getEl('typingSpeed').value) || 3000,
      typingLines: getEl('typingLines').value.trim().split('\n').filter(Boolean),
      skills: getSkillsData(),
      socialLinks: getSocialLinks(),
      projects: getProjects(),
      certifications: getCerts(),
      achievements: getAchievements(),
      showAbout: getEl('showAbout')?.checked ?? true,
      showLearning: getEl('showLearning')?.checked ?? true,
      showSkills: getEl('showSkills')?.checked ?? true,
      showGithubStats: getEl('showGithubStats')?.checked ?? true,
      showStreak: getEl('showStreak')?.checked ?? true,
      showTopLangs: getEl('showTopLangs')?.checked ?? true,
      showTrophy: getEl('showTrophy')?.checked ?? false,
      showActivityGraph: getEl('showActivityGraph')?.checked ?? true,
      showSnake: getEl('showSnake')?.checked ?? false,
      showVisitorCounter: getEl('showVisitorCounter')?.checked ?? true,
      showFooter: getEl('showFooter')?.checked ?? true,
      useExternalCapsules: INCLUDE_EXTERNAL_CAPSULES,
    };
    return data;
  }

  function getSkillsData() {
    const skills = {};
    document.querySelectorAll('.skill-chips').forEach(container => {
      const cat = container.dataset.category;
      const active = [];
      container.querySelectorAll('.chip.active').forEach(chip => active.push(chip.dataset.value));
      container.parentElement.querySelectorAll('.custom-chip').forEach(chip => active.push(chip.dataset.value));
      if (active.length) skills[cat] = active;
    });
    return skills;
  }

  function getSocialLinks() {
    const links = [];
    document.querySelectorAll('.social-input').forEach(input => {
      const val = input.value.trim();
      if (val) {
        links.push({ platform: input.dataset.platform, url: val });
      }
    });
    return links;
  }

  function getProjects() {
    const projects = [];
    document.querySelectorAll('.project-entry').forEach(entry => {
      const name = entry.querySelector('.project-name')?.value?.trim();
      if (name) {
        projects.push({
          name,
          desc: entry.querySelector('.project-desc')?.value?.trim() || '',
          repo: entry.querySelector('.project-repo')?.value?.trim() || '',
          demo: entry.querySelector('.project-demo')?.value?.trim() || '',
          techs: (entry.querySelector('.project-techs')?.value?.trim() || '').split(',').map(t => t.trim()).filter(Boolean)
        });
      }
    });
    return projects;
  }

  function getCerts() {
    const certs = [];
    document.querySelectorAll('.cert-entry').forEach(entry => {
      const name = entry.querySelector('.cert-name')?.value?.trim();
      if (name) {
        certs.push({
          name,
          org: entry.querySelector('.cert-org')?.value?.trim() || '',
          url: entry.querySelector('.cert-url')?.value?.trim() || ''
        });
      }
    });
    return certs;
  }

  function getAchievements() {
    const achievements = [];
    document.querySelectorAll('.achievement-entry').forEach(entry => {
      const title = entry.querySelector('.achievement-title')?.value?.trim();
      if (title) {
        achievements.push({
          title,
          desc: entry.querySelector('.achievement-desc')?.value?.trim() || ''
        });
      }
    });
    return achievements;
  }

  function validateForm(data) {
    const errors = [];
    if (!data.name) errors.push('Full name is required.');
    if (!data.username) errors.push('GitHub username is required.');
    if (!/^[a-zA-Z0-9_-]+$/.test(data.username)) errors.push('GitHub username contains invalid characters.');
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format.');
    if (data.portfolio && !data.portfolio.startsWith('http')) errors.push('Portfolio URL must start with http:// or https://.');
    return errors;
  }

  function showErrors(errors) {
    document.querySelectorAll('.form-error').forEach(e => e.remove());
    errors.forEach(err => {
      showToast(err, 'error');
    });
  }

  async function generateREADME() {
    const data = getFormData();
    const errors = validateForm(data);
    if (errors.length) { showErrors(errors); return; }

    if (!pyodideReady) {
      showToast('Loading Python engine... Please wait.', 'info');
      await initPyodide();
    }

    const btn = getEl('generateBtn');
    btn.disabled = true;
    btn.innerHTML = '<span class="loading-spinner"></span> Generating...';
    isGenerating = true;

    try {
      const inputJson = JSON.stringify(data);
      pyodide.globals.set('input_json', inputJson);
      const result = await pyodide.runPythonAsync(
        "import json; generate_readme(json.loads(input_json))"
      );
      currentMarkdown = typeof result === 'string' ? result : String(result);
      if (currentMarkdown !== lastCompatContent) {
        compatibilityCheck(currentMarkdown);
        lastCompatContent = currentMarkdown;
        lastCompatResult = null;
      }
      renderPreview(currentMarkdown);
      if (result && typeof result.destroy === 'function') result.destroy();
      showToast('README generated successfully!', 'success');
    } catch (err) {
      console.warn('Generation error:', err);
      const msg = err.message || 'Unknown error during generation';
      showToast('Failed to generate README: ' + msg, 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Generate README';
      isGenerating = false;
    }
  }



  function compatibilityCheck(md) {
    var issues = [];
    var lines = md.split('\n');
    var inFence = false;
    var inHtmlComment = false;

    var patterns = [
      { re: /<style[^>]*>/gi, label: '<style> tag', severity: 'Error' },
      { re: /\bstyle\s*=\s*["']/gi, label: 'inline style attribute', severity: 'Error' },
      { re: /\bdisplay\s*:\s*(flex|grid|inline-flex|inline-grid)\b/gi, label: 'display:flex/grid', severity: 'Error' },
      { re: /\bposition\s*:\s*(absolute|fixed|relative|sticky)\b/gi, label: 'CSS position', severity: 'Error' },
      { re: /\bborder-radius\b/gi, label: 'border-radius', severity: 'Warning' },
      { re: /\banimation\s*:/gi, label: 'CSS animation', severity: 'Error' },
      { re: /@keyframes\b/gi, label: '@keyframes', severity: 'Error' },
      { re: /\btransform\s*:/gi, label: 'CSS transform', severity: 'Error' },
      { re: /\bbox-shadow\b/gi, label: 'box-shadow', severity: 'Warning' },
      { re: /\bfilter\s*:/gi, label: 'CSS filter', severity: 'Error' },
      { re: /\bbackdrop-filter\s*:/gi, label: 'backdrop-filter', severity: 'Error' },
      { re: /\b(?:flex|grid)\s*:/gi, label: 'flex/grid CSS property', severity: 'Warning' },
    ];

    lines.forEach(function(line, idx) {
      var trimmed = line.trim();
      var lineNum = idx + 1;

      // Track code fences
      if (/^```/.test(trimmed)) {
        inFence = !inFence;
        return;
      }
      if (inFence) { return; }

      // Track multi-line HTML comments
      if (/^<!--/.test(trimmed) && !/-->/.test(trimmed)) {
        inHtmlComment = true;
        return;
      }
      if (inHtmlComment) {
        if (/-->/.test(trimmed)) { inHtmlComment = false; }
        return;
      }
      // Single-line HTML comment
      if (/^<!--[\s\S]*-->$/.test(trimmed)) { return; }

      // Strip inline code first (so URLs inside backticks are fully removed)
      var cleaned = line.replace(/`[^`]+`/g, '');
      // Strip URLs (http/https up to whitespace or closing quote/bracket/backtick)
      cleaned = cleaned.replace(/https?:\/\/[^\s"'<>`]+/gi, '');
      // Strip single-line HTML comments that start mid-line
      cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

      patterns.forEach(function(p) {
        p.re.lastIndex = 0;
        var m;
        while ((m = p.re.exec(cleaned)) !== null) {
          issues.push({
            line: lineNum,
            text: trimmed.substring(0, 100),
            reason: p.label,
            severity: p.severity
          });
        }
      });
    });

    // Build console report
    var report = 'Compatibility Check\n\n';
    var checkLabels = [
      { label: 'No inline CSS', check: 'inline style attribute' },
      { label: 'No <style> tags', check: '<style> tag' },
      { label: 'No JavaScript', check: '@keyframes' },
      { label: 'No unsupported HTML', check: '' },
      { label: 'No flex/grid', check: '' },
      { label: 'No animation CSS', check: 'CSS animation' },
    ];
    checkLabels.forEach(function(c) {
      var pass = c.check ? !issues.some(function(i) { return i.reason === c.check; }) : !issues.some(function(i) { return i.severity === 'Error'; });
      report += (pass ? '  \u2713' : '  \u2717') + ' ' + c.label + '\n';
    });

    if (issues.length > 0) {
      report += '\n  \u2717 Unsupported CSS found\n\n';
      issues.forEach(function(i) {
        report += '  Line ' + i.line + ':\n';
        report += '    ' + i.text + '\n';
        report += '    Reason: ' + i.reason + '\n';
        report += '    Severity: ' + i.severity + '\n\n';
      });
    } else {
      report += '\n  \u2713 All checks passed\n';
    }
    console.log(report);

    // Store for modal
    window.__compatIssues = issues;

    var errors = issues.filter(function(i) { return i.severity === 'Error'; });
    var warnings = issues.filter(function(i) { return i.severity === 'Warning'; });

    if (errors.length > 0) {
      var msg = 'Compatibility issues found: ' + errors.slice(0, 3).map(function(i) { return i.reason; }).join(', ');
      if (errors.length > 3) { msg += ', and ' + (errors.length - 3) + ' more'; }
      showToast(msg, 'error');
      return false;
    } else if (warnings.length > 0) {
      showToast('Some features may not render on GitHub (see Console)', 'info');
      return true;
    } else {
      showToast('README is GitHub compatible', 'success');
      return true;
    }
  }

  function showCompatReport() {
    var issues = window.__compatIssues || [];
    if (issues.length === 0) {
      openModal('Compatibility Report', '<p style="color:var(--accent-3);">All checks passed. No compatibility issues found.</p>');
      return;
    }
    var html = '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
    html += '<thead><tr style="background:var(--bg-card);"><th style="padding:8px;text-align:left;border-bottom:1px solid var(--border);">Line</th><th style="padding:8px;text-align:left;border-bottom:1px solid var(--border);">Reason</th><th style="padding:8px;text-align:left;border-bottom:1px solid var(--border);">Severity</th><th style="padding:8px;text-align:left;border-bottom:1px solid var(--border);">Content</th></tr></thead>';
    html += '<tbody>';
    issues.forEach(function(i) {
      var sevColor = i.severity === 'Error' ? '#FF5F57' : i.severity === 'Warning' ? '#FFBD2E' : '#28C840';
      html += '<tr style="border-bottom:1px solid var(--border);">';
      html += '<td style="padding:6px 8px;color:var(--text-muted);font-family:var(--font-mono);font-size:12px;">' + i.line + '</td>';
      html += '<td style="padding:6px 8px;">' + i.reason + '</td>';
      html += '<td style="padding:6px 8px;color:' + sevColor + ';font-weight:600;">' + i.severity + '</td>';
      html += '<td style="padding:6px 8px;font-family:var(--font-mono);font-size:12px;color:var(--text-secondary);word-break:break-all;max-width:300px;"><code>' + i.text.replace(/</g, '&lt;') + '</code></td>';
      html += '</tr>';
    });
    html += '</tbody></table>';
    openModal('Compatibility Report', html);
  }

  function enhancePreviewDOM(container, templateName) {
    if (!container) return;
    container.classList.add('preview-' + templateName);
    var theme = TEMPLATE_THEMES[templateName] || TEMPLATE_THEMES.neumorphism;
    container.style.setProperty('--tmpl-page-bg', theme.pageBg);
    container.style.setProperty('--tmpl-card-bg', theme.cardBg);
    container.style.setProperty('--tmpl-primary-text', theme.primaryText);
    container.style.setProperty('--tmpl-secondary-text', theme.secondaryText);
    container.style.setProperty('--tmpl-heading-color', theme.headingColor);
    container.style.setProperty('--tmpl-accent', theme.accent);
    container.style.setProperty('--tmpl-border', theme.border);
    container.style.setProperty('--tmpl-progress-fill', theme.progressFill);
    container.style.setProperty('--tmpl-icon-color', theme.iconColor);
  }

  var STATS_DOMAINS = [
    'github-readme-stats.vercel.app',
    'github-readme-streak-stats.herokuapp.com',
    'github-profile-summary-cards.vercel.app',
    'github-profile-trophy.vercel.app',
    'github-readme-activity-graph.vercel.app',
    'komarev.com/ghpvc',
    'capsule-render.vercel.app'
  ];

  function isStatsUrl(src) {
    if (!src || typeof src !== 'string') return false;
    for (var i = 0; i < STATS_DOMAINS.length; i++) {
      if (src.indexOf(STATS_DOMAINS[i]) !== -1) return true;
    }
    return false;
  }

  function getCardType(src) {
    if (src.indexOf('capsule-render.vercel.app') !== -1) {
      return src.indexOf('section=footer') !== -1 ? 'capsule-footer' : 'capsule-header';
    }
    if (src.indexOf('top-langs') !== -1) return 'langs';
    if (src.indexOf('streak-stats') !== -1) return 'streak';
    if (src.indexOf('trophy') !== -1) return 'trophy';
    if (src.indexOf('activity-graph') !== -1) return 'graph';
    if (src.indexOf('profile-summary') !== -1) return 'summary';
    if (src.indexOf('komarev') !== -1) return 'visitor';
    return 'stats';
  }

  function getWidthClass(width) {
    if (width === '48%') return 'local-card-half';
    if (width === '95%' || width === '100%') return 'local-card-full';
    return 'local-card-full';
  }

  function getLocalStatsRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.stats) {
      case 'flatTiles': return renderFlatTilesStats;
      case 'frostPanels': return renderFrostPanelsStats;
      case 'journalCards': return renderJournalStats;
      case 'softCards': return renderSoftStats;
      case 'neonPanels': return renderNeonStats;
      case 'iceTiles': return renderIceStats;
      case 'spectrumCards': return renderSpectrumStats;
      case 'stackedLayers': return renderLayerStats;
      case 'hexTiles': return renderHexStats;
      case 'morphCards': return renderMorphStats;
      default: return renderFlatTilesStats;
    }
  }

  function getLocalLangsRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.langs) {
      case 'thinBars': return renderThinLangBars;
      case 'gradientBars': return renderGradientLangBars;
      case 'notebookBars': return renderNotebookLangBars;
      case 'pillBars': return renderPillLangBars;
      case 'segmentedBars': return renderSegmentedLangBars;
      case 'frozenBars': return renderFrozenLangBars;
      case 'rainbowBars': return renderRainbowLangBars;
      case 'depthBars': return renderDepthLangBars;
      case 'angularBars': return renderAngularLangBars;
      case 'fluidBars': return renderFluidLangBars;
      default: return renderThinLangBars;
    }
  }

  function getLocalStreakRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.stats) {
      case 'flatTiles': return renderFlatStreak;
      case 'frostPanels': return renderFrostStreak;
      case 'journalCards': return renderJournalStreak;
      case 'softCards': return renderSoftStreak;
      case 'neonPanels': return renderNeonStreak;
      case 'iceTiles': return renderIceStreak;
      case 'spectrumCards': return renderSpectrumStreak;
      case 'stackedLayers': return renderLayerStreak;
      case 'hexTiles': return renderHexStreak;
      case 'morphCards': return renderMorphStreak;
      default: return renderFlatStreak;
    }
  }

  function getLocalActivityRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.activity) {
      case 'contributionGrid': return renderContributionGraph;
      case 'calendarGrid': return renderCalendarGraph;
      case 'paperGraph': return renderPaperGraph;
      case 'roundedGrid': return renderRoundedGraph;
      case 'waveGraph': return renderWaveGraph;
      case 'crystalGrid': return renderCrystalGraph;
      case 'auroraGraph': return renderAuroraGraph;
      case 'timelineGraph': return renderTimelineGraph;
      case 'geometricGrid': return renderGeometricGraph;
      case 'morphingGraph': return renderMorphingGraph;
      default: return renderContributionGraph;
    }
  }

  function getLocalTrophyRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.stats) {
      case 'flatTiles': return renderFlatTrophy;
      case 'frostPanels': return renderFrostTrophy;
      case 'journalCards': return renderJournalTrophy;
      case 'softCards': return renderSoftTrophy;
      case 'neonPanels': return renderNeonTrophy;
      case 'iceTiles': return renderIceTrophy;
      case 'spectrumCards': return renderSpectrumTrophy;
      case 'stackedLayers': return renderLayerTrophy;
      case 'hexTiles': return renderHexTrophy;
      case 'morphCards': return renderMorphTrophy;
      default: return renderFlatTrophy;
    }
  }

  function getLocalSummaryRenderer(template) {
    var types = TEMPLATE_WIDGET_TYPES[template] || TEMPLATE_WIDGET_TYPES.neumorphism;
    switch (types.stats) {
      case 'flatTiles': return renderFlatSummary;
      case 'frostPanels': return renderFrostSummary;
      case 'journalCards': return renderJournalSummary;
      case 'softCards': return renderSoftSummary;
      case 'neonPanels': return renderNeonSummary;
      case 'iceTiles': return renderIceSummary;
      case 'spectrumCards': return renderSpectrumSummary;
      case 'stackedLayers': return renderLayerSummary;
      case 'hexTiles': return renderHexSummary;
      case 'morphCards': return renderMorphSummary;
      default: return renderFlatSummary;
    }
  }

  function renderFlatTilesStats(width) { return '<div class="local-card lcard-stats-flat"><div class="local-card-title">📊 GitHub Stats</div><div class="lcard-grid-2x2">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-cell"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderFrostPanelsStats(width) { return '<div class="local-card lcard-stats-frost"><div class="local-card-title">📊 GitHub Stats</div><div class="lcard-frost-row">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-frost-panel"><div class="lcard-frost-icon">'+['📦','⚡','⭐','⑂'][i]+'</div><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderJournalStats(width) { return '<div class="local-card lcard-stats-journal"><div class="local-card-title" style="font-family:Georgia,serif;">📊 GitHub Stats</div><div class="lcard-journal-grid">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-journal-entry"><span class="lcard-journal-icon">'+['📁','📝','✨','🔗'][i]+'</span><div class="lcard-journal-body"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div></div>';}).join('')+'</div></div>'; }
  function renderSoftStats(width) { return '<div class="local-card lcard-stats-soft"><div class="local-card-title">📊 GitHub Stats</div><div class="lcard-soft-grid">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-soft-pill"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderNeonStats(width) { return '<div class="local-card lcard-stats-neon"><div class="local-card-title">📊 STATS</div><div class="lcard-neon-grid">' + ['REPOS','COMMITS','STARS','FORKS'].map(function(l,i){return '<div class="lcard-neon-cell"><div class="lcard-neon-bracket">&gt;</div><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderIceStats(width) { return '<div class="local-card lcard-stats-ice"><div class="local-card-title">📊 GitHub Stats</div><div class="lcard-ice-row">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-ice-crystal"><div class="lcard-ice-icon">'+['❄️','🧊','✨','💎'][i]+'</div><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderSpectrumStats(width) { return '<div class="local-card lcard-stats-spectrum"><div class="local-card-title">📊 GitHub Stats</div><div class="lcard-spectrum-row">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-spectrum-item lcard-spec-'+(i+1)+'"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderLayerStats(width) { return '<div class="local-card lcard-stats-layer"><div class="local-card-title">📊 Stats Layer</div><div class="lcard-layer-stack">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-layer-item lcard-layer-'+(i+1)+'"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderHexStats(width) { return '<div class="local-card lcard-stats-hex"><div class="local-card-title">⬡ GitHub Stats</div><div class="lcard-hex-grid">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-hex-cell"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderMorphStats(width) { return '<div class="local-card lcard-stats-morph"><div class="local-card-title">📊 Stats</div><div class="lcard-morph-row">' + ['Repos','Commits','Stars','Forks'].map(function(l,i){return '<div class="lcard-morph-blob"><div class="lcard-num">'+[12,'1.2k',45,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }

  function renderFlatStreak(width) { return '<div class="local-card lcard-streak-flat"><div class="local-card-title">🔥 GitHub Streak</div><div class="lcard-streak-3col">' + ['Current','Longest','Total Days'].map(function(l,i){return '<div class="lcard-cell"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderFrostStreak(width) { return '<div class="local-card lcard-streak-frost"><div class="local-card-title">🔥 Streak</div><div class="lcard-frost-row">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-frost-panel"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderJournalStreak(width) { return '<div class="local-card lcard-streak-journal"><div class="local-card-title" style="font-family:Georgia,serif;">🔥 Streak Log</div><div class="lcard-journal-grid">' + ['Current','Longest','Total Days'].map(function(l,i){return '<div class="lcard-journal-entry"><div class="lcard-journal-icon">'+['🔥','📏','📅'][i]+'</div><div class="lcard-journal-body"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div></div>';}).join('')+'</div></div>'; }
  function renderSoftStreak(width) { return '<div class="local-card lcard-streak-soft"><div class="local-card-title">🔥 Streak</div><div class="lcard-soft-grid">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-soft-pill"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderNeonStreak(width) { return '<div class="local-card lcard-streak-neon"><div class="local-card-title">🔥 STREAK</div><div class="lcard-neon-grid">' + ['CURRENT','LONGEST','TOTAL'].map(function(l,i){return '<div class="lcard-neon-cell"><div class="lcard-neon-bracket">#</div><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderIceStreak(width) { return '<div class="local-card lcard-streak-ice"><div class="local-card-title">🔥 Streak</div><div class="lcard-ice-row">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-ice-crystal"><div class="lcard-ice-icon">'+['🔥','🏆','📆'][i]+'</div><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderSpectrumStreak(width) { return '<div class="local-card lcard-streak-spectrum"><div class="local-card-title">🔥 Streak</div><div class="lcard-spectrum-row">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-spectrum-item lcard-spec-'+(i+1)+'"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderLayerStreak(width) { return '<div class="local-card lcard-streak-layer"><div class="local-card-title">🔥 Streak Layer</div><div class="lcard-layer-stack">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-layer-item lcard-layer-'+(i+1)+'"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderHexStreak(width) { return '<div class="local-card lcard-streak-hex"><div class="local-card-title">⬡ Streak</div><div class="lcard-hex-grid">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-hex-cell"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderMorphStreak(width) { return '<div class="local-card lcard-streak-morph"><div class="local-card-title">🔥 Streak</div><div class="lcard-morph-row">' + ['Current','Longest','Total'].map(function(l,i){return '<div class="lcard-morph-blob"><div class="lcard-num">'+[7,30,156][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }

  var LANG_DATA = [{name:'JavaScript',pct:40},{name:'Python',pct:25},{name:'TypeScript',pct:18},{name:'HTML/CSS',pct:10},{name:'Other',pct:7}];

  function renderThinLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-row"><span class="lbar-name">'+l.name+'</span><span class="lbar-track"><span class="lbar-fill" style="width:'+l.pct+'%"></span></span><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-thin"><div class="local-card-title">💻 Top Languages</div>'+b+'</div>'; }
  function renderGradientLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-grad-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-grad-track"><div class="lbar-grad-fill lbar-grad-'+(i+1)+'" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-grad"><div class="local-card-title">💻 Top Languages</div>'+b+'</div>'; }
  function renderNotebookLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-nb-row"><span class="lbar-name" style="font-family:Georgia,serif;">'+l.name+'</span><div class="lbar-nb-track"><div class="lbar-nb-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-nb"><div class="local-card-title" style="font-family:Georgia,serif;">💻 Languages</div>'+b+'</div>'; }
  function renderPillLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-pill-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-pill-track"><div class="lbar-pill-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-pill"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }
  function renderSegmentedLangBars(width) { var p=LANG_DATA;var total=100;var segs='';for(var i=0;i<p.length;i++){segs+='<span class="lbar-seg lbar-seg-'+(i+1)+'" style="width:'+p[i].pct+'%"><span class="lbar-seg-label">'+p[i].name.slice(0,3)+'</span></span>';} var list='';for(var i=0;i<p.length;i++){list+='<div class="lbar-seg-legend"><span class="lbar-seg-dot lbar-seg-dot-'+(i+1)+'"></span>'+p[i].name+' <strong>'+p[i].pct+'%</strong></div>';} return '<div class="local-card lcard-langs-seg"><div class="local-card-title">💻 Languages</div><div class="lbar-seg-bar">'+segs+'</div><div class="lbar-seg-legend-wrap">'+list+'</div></div>'; }
  function renderFrozenLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-ice-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-ice-track"><div class="lbar-ice-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-ice"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }
  function renderRainbowLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-rainbow-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-rainbow-track"><div class="lbar-rainbow-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-rainbow"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }
  function renderDepthLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-depth-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-depth-track"><div class="lbar-depth-fill lbar-depth-fill-'+(i+1)+'" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-depth"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }
  function renderAngularLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-ang-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-ang-track"><div class="lbar-ang-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-ang"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }
  function renderFluidLangBars(width) { var b='';for(var i=0;i<LANG_DATA.length;i++){var l=LANG_DATA[i];b+='<div class="lbar-fluid-row"><span class="lbar-name">'+l.name+'</span><div class="lbar-fluid-track"><div class="lbar-fluid-fill" style="width:'+l.pct+'%"></div></div><span class="lbar-pct">'+l.pct+'%</span></div>';} return '<div class="local-card lcard-langs-fluid"><div class="local-card-title">💻 Languages</div>'+b+'</div>'; }

  var ACT_PATTERN = [3,5,7,9,10,8,6,4,5,7,9,11,10,8,6,5,7,9,12,10,8,6,4,3,5,7];

  function renderContributionGraph(width) { var c='';for(var i=0;i<ACT_PATTERN.length;i++){c+='<span class="lact-cell" data-lvl="'+ACT_PATTERN[i]+'"></span>';} return '<div class="local-card lcard-act-grid"><div class="local-card-title">📈 Activity</div><div class="lact-cell-grid">'+c+'</div></div>'; }
  function renderCalendarGraph(width) { var c='';for(var i=0;i<28;i++){var lvl=Math.floor(Math.random()*4);c+='<span class="lact-cal-cell" data-lvl="'+lvl+'"></span>';} return '<div class="local-card lcard-act-cal"><div class="local-card-title">📈 Activity</div><div class="lact-cal-grid">'+c+'</div><div class="lact-cal-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div></div>'; }
  function renderPaperGraph(width) { var h='';for(var i=0;i<ACT_PATTERN.length;i++){var ht=ACT_PATTERN[i]*6;h+='<div class="lact-paper-bar" style="height:'+ht+'px"></div>';} return '<div class="local-card lcard-act-paper"><div class="local-card-title" style="font-family:Georgia,serif;">📈 Activity</div><div class="lact-paper-chart">'+h+'</div></div>'; }
  function renderRoundedGraph(width) { var c='';for(var i=0;i<ACT_PATTERN.length;i++){c+='<span class="lact-round-cell" data-lvl="'+ACT_PATTERN[i]+'"></span>';} return '<div class="local-card lcard-act-round"><div class="local-card-title">📈 Activity</div><div class="lact-round-grid">'+c+'</div></div>'; }
  function renderWaveGraph(width) { var h='';for(var i=0;i<ACT_PATTERN.length;i++){var ht=ACT_PATTERN[i]*5;h+='<div class="lact-wave-bar" style="height:'+ht+'px"></div>';} return '<div class="local-card lcard-act-wave"><div class="local-card-title">📈 Activity</div><div class="lact-wave-chart">'+h+'</div></div>'; }
  function renderCrystalGraph(width) { var c='';var icons=['◇','◆','❄','◆','◇'];for(var i=0;i<ACT_PATTERN.length;i++){c+='<span class="lact-crystal-cell" data-lvl="'+(ACT_PATTERN[i]%4)+'">'+(ACT_PATTERN[i]>6?icons[i%5]:'')+'</span>';} return '<div class="local-card lcard-act-crystal"><div class="local-card-title">📈 Activity</div><div class="lact-crystal-grid">'+c+'</div></div>'; }
  function renderAuroraGraph(width) { var h='';for(var i=0;i<ACT_PATTERN.length;i++){var ht=ACT_PATTERN[i]*5;h+='<div class="lact-aurora-bar" style="height:'+ht+'px"></div>';} return '<div class="local-card lcard-act-aurora"><div class="local-card-title">📈 Activity</div><div class="lact-aurora-chart">'+h+'</div></div>'; }
  function renderTimelineGraph(width) { var e='';var days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];for(var i=0;i<7;i++){e+='<div class="lact-timeline-entry"><span class="lact-timeline-day">'+days[i]+'</span><span class="lact-timeline-bar" style="width:'+(ACT_PATTERN[i]*5)+'px"></span><span class="lact-timeline-val">'+ACT_PATTERN[i]+'</span></div>';} return '<div class="local-card lcard-act-timeline"><div class="local-card-title">📈 Activity</div>'+e+'</div>'; }
  function renderGeometricGraph(width) { var c='';var shapes=['△','◇','○','□','☆','△','◇'];for(var i=0;i<ACT_PATTERN.length;i++){c+='<span class="lact-geo-cell" data-lvl="'+(ACT_PATTERN[i]%4)+'">'+shapes[i%7]+'</span>';} return '<div class="local-card lcard-act-geo"><div class="local-card-title">📈 Activity</div><div class="lact-geo-grid">'+c+'</div></div>'; }
  function renderMorphingGraph(width) { var h='';for(var i=0;i<ACT_PATTERN.length;i+=2){var ht=ACT_PATTERN[i]*5;h+='<div class="lact-morph-bar" style="height:'+ht+'px"></div>';} return '<div class="local-card lcard-act-morph"><div class="local-card-title">📈 Activity</div><div class="lact-morph-chart">'+h+'</div></div>'; }

  function renderFlatTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-flat-cell">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-flat"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-flat-grid">'+i+'</div></div>'; }
  function renderFrostTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-frost-cell"><span class="lcard-trophy-frost-icon">'+icons[j]+'</span></div>';} return '<div class="local-card lcard-trophy-frost"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-frost-grid">'+i+'</div></div>'; }
  function renderJournalTrophy(width) { var i='';var titles=['Champion','Runner Up','Bronze','Finalist','MVP','Achiever'];for(var j=0;j<titles.length;j++){i+='<div class="lcard-trophy-journal-entry"><span class="lcard-journal-icon">'+['🏆','🥇','🥈','🥉','⭐','🏅'][j]+'</span><div class="lcard-journal-body"><div class="lcard-label">'+titles[j]+'</div></div></div>';} return '<div class="local-card lcard-trophy-journal"><div class="local-card-title" style="font-family:Georgia,serif;">🏆 Trophies</div>'+i+'</div>'; }
  function renderSoftTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-soft-pill">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-soft"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-soft-grid">'+i+'</div></div>'; }
  function renderNeonTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-neon-cell">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-neon"><div class="local-card-title">🏆 TROPHIES</div><div class="lcard-trophy-neon-grid">'+i+'</div></div>'; }
  function renderIceTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-ice-cell"><span class="lcard-trophy-ice-icon">'+icons[j]+'</span></div>';} return '<div class="local-card lcard-trophy-ice"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-ice-grid">'+i+'</div></div>'; }
  function renderSpectrumTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-spec-cell lcard-spec-'+(j%3+1)+'">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-spec"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-spec-grid">'+i+'</div></div>'; }
  function renderLayerTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-layer-cell lcard-layer-'+(j%3+1)+'">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-layer"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-layer-grid">'+i+'</div></div>'; }
  function renderHexTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-hex-cell">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-hex"><div class="local-card-title">⬡ Trophies</div><div class="lcard-trophy-hex-grid">'+i+'</div></div>'; }
  function renderMorphTrophy(width) { var i='';var icons=['🏆','🥇','🥈','🥉','⭐','🏅'];for(var j=0;j<icons.length;j++){i+='<div class="lcard-trophy-morph-blob">'+icons[j]+'</div>';} return '<div class="local-card lcard-trophy-morph"><div class="local-card-title">🏆 Trophies</div><div class="lcard-trophy-morph-grid">'+i+'</div></div>'; }

  function renderFlatSummary(width) { return '<div class="local-card lcard-summary-flat"><div class="local-card-title">📋 Profile</div><div class="lcard-grid-2x2">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-cell"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderFrostSummary(width) { return '<div class="local-card lcard-summary-frost"><div class="local-card-title">📋 Profile</div><div class="lcard-frost-row">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-frost-panel"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderJournalSummary(width) { return '<div class="local-card lcard-summary-journal"><div class="local-card-title" style="font-family:Georgia,serif;">📋 Summary</div><div class="lcard-journal-grid">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-journal-entry"><span class="lcard-journal-icon">'+['📝','🔀','📁','⭐'][i]+'</span><div class="lcard-journal-body"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div></div>';}).join('')+'</div></div>'; }
  function renderSoftSummary(width) { return '<div class="local-card lcard-summary-soft"><div class="local-card-title">📋 Profile</div><div class="lcard-soft-grid">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-soft-pill"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderNeonSummary(width) { return '<div class="local-card lcard-summary-neon"><div class="local-card-title">📋 PROFILE</div><div class="lcard-neon-grid">' + ['COMMITS','PRS','REPOS','STARS'].map(function(l,i){return '<div class="lcard-neon-cell"><div class="lcard-neon-bracket">&gt;</div><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderIceSummary(width) { return '<div class="local-card lcard-summary-ice"><div class="local-card-title">📋 Profile</div><div class="lcard-ice-row">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-ice-crystal"><div class="lcard-ice-icon">'+['📝','🔀','📁','⭐'][i]+'</div><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderSpectrumSummary(width) { return '<div class="local-card lcard-summary-spec"><div class="local-card-title">📋 Profile</div><div class="lcard-spectrum-row">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-spectrum-item lcard-spec-'+(i+1)+'"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderLayerSummary(width) { return '<div class="local-card lcard-summary-layer"><div class="local-card-title">📋 Summary</div><div class="lcard-layer-stack">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-layer-item lcard-layer-'+(i+1)+'"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderHexSummary(width) { return '<div class="local-card lcard-summary-hex"><div class="local-card-title">⬡ Profile</div><div class="lcard-hex-grid">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-hex-cell"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }
  function renderMorphSummary(width) { return '<div class="local-card lcard-summary-morph"><div class="local-card-title">📋 Profile</div><div class="lcard-morph-row">' + ['Commits','PRs','Repos','Stars'].map(function(l,i){return '<div class="lcard-morph-blob"><div class="lcard-num">'+[156,45,12,8][i]+'</div><div class="lcard-label">'+l+'</div></div>';}).join('')+'</div></div>'; }

  function createLocalCapsuleHeader() {
    return '<div class="local-capsule local-capsule-header">' +
      '<div class="capsule-decoration"></div>' +
      '<div class="capsule-content">' +
        '<div class="capsule-emoji">✨</div>' +
        '<div class="capsule-title">Profile README</div>' +
        '<div class="capsule-subtitle">Developer &middot; Designer &middot; Creator</div>' +
      '</div></div>';
  }

  function createLocalCapsuleFooter() {
    return '<div class="local-capsule local-capsule-footer">' +
      '<div class="capsule-decoration"></div>' +
      '<div class="capsule-content">' +
        '<div class="capsule-text">Thanks for visiting ✨</div>' +
      '</div></div>';
  }

  function replaceStatsImagesInHtml(html) {
    var tmpl = selectedTemplate;
    return html.replace(/<img\b[^>]*?src\s*=\s*"([^"]*?)"[^>]*>/gi, function(match, src) {
      if (!isStatsUrl(src)) return match;
      var cardType = getCardType(src);
      if (cardType === 'visitor') return '';
      var widthMatch = match.match(/width\s*=\s*"([^"]*?)"/);
      var width = widthMatch ? widthMatch[1] : '';
      switch (cardType) {
        case 'capsule-header': return createLocalCapsuleHeader();
        case 'capsule-footer': return createLocalCapsuleFooter();
        case 'langs': return getLocalLangsRenderer(tmpl)(width);
        case 'streak': return getLocalStreakRenderer(tmpl)(width);
        case 'trophy': return getLocalTrophyRenderer(tmpl)(width);
        case 'graph': return getLocalActivityRenderer(tmpl)(width);
        case 'summary': return getLocalSummaryRenderer(tmpl)(width);
        default: return getLocalStatsRenderer(tmpl)(width);
      }
    });
  }

  function handleImageError(img) {
    img.addEventListener('error', function() {
      this.onerror = null;
      var text = this.getAttribute('alt') || 'Preview image';
      var div = document.createElement('div');
      div.className = 'local-card local-card-full local-card-fallback';
      div.textContent = '⚠️ ' + text + ' (unavailable)';
      this.parentNode.replaceChild(div, this);
    });
  }

  function renderPreview(md) {
    if (md === lastRenderedMarkdown) return;
    lastRenderedMarkdown = md;
    const container = getEl('renderContainer');
    container.innerHTML = '';
    if (!md) {
      container.innerHTML = '<div class="render-placeholder"><div class="placeholder-icon">📝</div><h3>No README Generated Yet</h3><p>Fill in your details and click <strong>Generate README</strong> to see the live preview.</p></div>';
      return;
    }
    container.className = 'render-container github-style';
    if (getEl('renderPane').querySelector('.mode-btn.active')?.dataset.mode === 'mobile') {
      container.classList.add('mobile');
    }
    try {
      var renderedHtml = marked.parse(md);
      renderedHtml = replaceStatsImagesInHtml(renderedHtml);
      var clean = DOMPurify.sanitize(renderedHtml, {
        ADD_TAGS: ['img'],
        ADD_ATTR: ['target', 'loading', 'referrerpolicy', 'decoding', 'width', 'height', 'style']
      });
      container.innerHTML = clean;
      container.querySelectorAll('a').forEach(function(a) {
        if (!a.getAttribute('target')) a.setAttribute('target', '_blank');
      });
      container.querySelectorAll('img').forEach(function(img) {
        handleImageError(img);
      });
      enhancePreviewDOM(container, selectedTemplate);
    } catch (error) {
      console.warn('Preview rendering error:', error);
      container.innerHTML = '<div>Preview could not be rendered.</div>';
    }
  }



  let previewTimer;

  function schedulePreviewUpdate(md) {
    if (previewTimer) clearTimeout(previewTimer);
    previewTimer = setTimeout(function() {
      renderPreview(md);
    }, 300);
  }

  function downloadREADME() {
    if (!currentMarkdown) { showToast('Nothing to download. Generate a README first.', 'error'); return; }
    const blob = new Blob([currentMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('README.md downloaded!', 'success');
  }

  function copyMarkdown() {
    if (!currentMarkdown) { showToast('Nothing to copy. Generate a README first.', 'error'); return; }
    navigator.clipboard.writeText(currentMarkdown).then(() => {
      showToast('Markdown copied to clipboard!', 'success');
    }).catch(() => {
      document.execCommand('copy');
      showToast('Markdown copied!', 'success');
    });
  }

  function saveHistory() {
    if (!currentMarkdown) { showToast('Generate a README before saving.', 'error'); return; }
    const data = getFormData();
    const record = {
      id: Date.now().toString(),
      name: data.name,
      username: data.username,
      template: selectedTemplate,
      date: new Date().toISOString(),
      markdown: currentMarkdown,
      config: JSON.stringify(data)
    };
    historyItems.unshift(record);
    localStorage.setItem('readmeHistory', JSON.stringify(historyItems));
    renderHistory();
    showToast('Saved to history!', 'success');
  }

  function loadHistory() {
    try {
      const saved = localStorage.getItem('readmeHistory');
      if (saved) historyItems = JSON.parse(saved);
    } catch(e) { historyItems = []; }
  }

  function renderHistory() {
    const grid = getEl('historyGrid');
    const search = getEl('historySearch').value.toLowerCase();
    const filter = getEl('historyFilter').value;

    let items = historyItems;
    if (search) items = items.filter(i => i.name.toLowerCase().includes(search) || i.username.toLowerCase().includes(search));
    if (filter !== 'all') items = items.filter(i => i.template === filter);

    if (items.length === 0) {
      grid.innerHTML = '<div class="history-empty"><p>No saved READMEs yet. Generate one and save it!</p></div>';
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="history-card">
        <h4>${escHtml(item.name)}</h4>
        <div class="h-meta">@${escHtml(item.username)} · ${item.template} · ${new Date(item.date).toLocaleDateString()}</div>
        <div class="h-actions">
          <button class="btn btn-sm btn-ghost" onclick="window.loadHistoryItem('${item.id}')">View</button>
          <button class="btn btn-sm btn-ghost" onclick="window.editHistoryItem('${item.id}')">Edit</button>
          <button class="btn btn-sm btn-ghost" onclick="window.dupHistoryItem('${item.id}')">Duplicate</button>
          <button class="btn btn-sm btn-ghost" onclick="window.copyHistoryMd('${item.id}')">Copy</button>
          <button class="btn btn-sm btn-danger" onclick="window.deleteHistoryItem('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  }

  function escHtml(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function setFormField(id, value) {
    var el = getEl(id);
    if (!el) return;
    if (el.type === 'checkbox') { el.checked = !!value; return; }
    el.value = value || '';
  }

  window.loadHistoryItem = function(id) {
    const item = historyItems.find(i => i.id === id);
    if (!item) return;
    currentMarkdown = item.markdown;
    renderPreview(currentMarkdown);
    try {
      const config = JSON.parse(item.config);
      if (config) Object.assign(config, {});
    } catch(e) {}
    showToast('Loaded from history.', 'info');
    getEl('preview').scrollIntoView({ behavior: 'smooth' });
  };

  window.editHistoryItem = function(id) {
    const item = historyItems.find(i => i.id === id);
    if (!item) return;
    try {
      var cfg = JSON.parse(item.config);
      setFormField('name', cfg.name);
      setFormField('username', cfg.username);
      setFormField('title', cfg.title);
      setFormField('bio', cfg.bio);
      setFormField('location', cfg.location);
      setFormField('email', cfg.email);
      setFormField('education', cfg.education);
      setFormField('college', cfg.college);
      setFormField('portfolio', cfg.portfolio);
      setFormField('aboutMe', cfg.aboutMe);
      setFormField('currentProject', cfg.currentProject);
      setFormField('learning', cfg.learning);
      setFormField('collab', cfg.collab);
      setFormField('expertise', cfg.expertise);
      setFormField('goal', cfg.goal);
      setFormField('funFact', cfg.funFact);
      setFormField('accentColor', cfg.accentColor);
      setFormField('typingFont', cfg.typingFont);
      setFormField('typingLines', cfg.typingLines ? cfg.typingLines.join('\n') : '');
      if (cfg.template) selectTemplate(cfg.template);
      showToast('Form populated from history.', 'success');
      getEl('generator').scrollIntoView({ behavior: 'smooth' });
    } catch(e) {
      showToast('Could not restore form data.', 'error');
    }
  };

  window.copyHistoryMd = function(id) {
    const item = historyItems.find(i => i.id === id);
    if (!item) return;
    navigator.clipboard.writeText(item.markdown).then(() => showToast('Copied!', 'success'));
  };

  window.dupHistoryItem = function(id) {
    const item = historyItems.find(i => i.id === id);
    if (!item) return;
    const dup = { ...item, id: Date.now().toString(), date: new Date().toISOString() };
    historyItems.unshift(dup);
    localStorage.setItem('readmeHistory', JSON.stringify(historyItems));
    renderHistory();
    showToast('Duplicated!', 'success');
  };

  window.deleteHistoryItem = function(id) {
    historyItems = historyItems.filter(i => i.id !== id);
    localStorage.setItem('readmeHistory', JSON.stringify(historyItems));
    renderHistory();
    showToast('Deleted.', 'info');
  };

  async function initPyodide() {
    try {
      if (!pyodide) {
        showToast('Loading Python runtime...', 'info');
        pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' });
      }
      const resp = await fetch('generator.py');
      const code = await resp.text();
      await pyodide.runPythonAsync(code);
      pyodideReady = true;
      showToast('Python engine ready!', 'success');
    } catch (err) {
      console.error('Pyodide init error:', err);
      showToast('Failed to load Python engine. Using fallback.', 'error');
      pyodideReady = true;
    }
  }

  function applyTemplate(name) {
    var config = TEMPLATE_CONFIGS[name] || TEMPLATE_CONFIGS.neumorphism;
    var container = getEl('renderContainer');
    if (!container) return;
    ['preview-neumorphism','preview-glassmorphism','preview-skeuomorphism','preview-claymorphism','preview-auroraism','preview-frostedmorphism','preview-gradientmorphism','preview-layermorphism','preview-polymorphism','preview-metamorphism'].forEach(function(cls) {
      container.classList.remove(cls);
    });
    container.classList.add('preview-' + name);
    var theme = TEMPLATE_THEMES[name] || TEMPLATE_THEMES.neumorphism;
    container.style.setProperty('--tmpl-page-bg', theme.pageBg);
    container.style.setProperty('--tmpl-card-bg', theme.cardBg);
    container.style.setProperty('--tmpl-primary-text', theme.primaryText);
    container.style.setProperty('--tmpl-secondary-text', theme.secondaryText);
    container.style.setProperty('--tmpl-heading-color', theme.headingColor);
    container.style.setProperty('--tmpl-accent', theme.accent);
    container.style.setProperty('--tmpl-border', theme.border);
    container.style.setProperty('--tmpl-progress-fill', theme.progressFill);
    container.style.setProperty('--tmpl-icon-color', theme.iconColor);
  }

  function selectTemplate(name) {
    if (name === selectedTemplateId) return;
    selectedTemplateId = name;
    selectedTemplate = name;
    lastRenderedMarkdown = '';
    document.querySelectorAll('.template-card').forEach(function(c) { c.classList.remove('selected'); });
    var card = document.querySelector('.template-card[data-template="' + name + '"]');
    if (card) card.classList.add('selected');
    var lines = TYPING_LINES[name] || TYPING_LINES.neumorphism;
    getEl('typingLines').value = lines.join('\n');
    applyTemplate(name);
  }

  function loadDemoData() {
    getEl('name').value = DEMO_DATA.name;
    getEl('username').value = DEMO_DATA.username;
    getEl('title').value = DEMO_DATA.title;
    getEl('bio').value = DEMO_DATA.bio;
    getEl('location').value = DEMO_DATA.location;
    getEl('email').value = DEMO_DATA.email;
    getEl('education').value = DEMO_DATA.education;
    getEl('college').value = DEMO_DATA.college;
    getEl('aboutMe').value = DEMO_DATA.aboutMe;
    getEl('learning').value = DEMO_DATA.learning;
    getEl('funFact').value = DEMO_DATA.funFact;

    document.querySelectorAll('.chip[data-value="HTML"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="CSS"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="JavaScript"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="Python"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="React"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="Tailwind CSS"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="MySQL"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="Git"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="GitHub"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="VS Code"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="FastAPI"]').forEach(c => c.classList.add('active'));
    document.querySelectorAll('.chip[data-value="SQLite"]').forEach(c => c.classList.add('active'));

    showToast('Demo data loaded!', 'success');
  }

  function clearForm() {
    getEl('generator').querySelectorAll('input, textarea, select').forEach(el => {
      if (el.type !== 'checkbox') el.value = '';
    });
    document.querySelectorAll('.chip.active').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.project-entry:not(:first-child)').forEach(e => e.remove());
    document.querySelectorAll('.cert-entry:not(:first-child)').forEach(e => e.remove());
    document.querySelectorAll('.achievement-entry:not(:first-child)').forEach(e => e.remove());
    document.querySelector('.project-entry')?.querySelectorAll('input').forEach(i => i.value = '');
    document.querySelector('.cert-entry')?.querySelectorAll('input').forEach(i => i.value = '');
    document.querySelector('.achievement-entry')?.querySelectorAll('input').forEach(i => i.value = '');
    document.querySelectorAll('.remove-project, .remove-cert, .remove-achievement').forEach(b => b.style.display = 'none');
    currentMarkdown = '';
    renderPreview('');
    showToast('Form cleared.', 'info');
  }

  function generateSnakeWorkflow() {
    const username = getEl('username').value.trim() || 'yourusername';
    const workflow = [
      'name: generate-snake',
      '',
      'on:',
      '  schedule:',
      '    - cron: "0 0 * * *"',
      '  workflow_dispatch:',
      '',
      'jobs:',
      '  build:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v3',
      '      - uses: Platane/snk@v3',
      '        with:',
      '          github_user_name: ${{ github.repository_owner }}',
      '          outputs: |',
      '            dist/github-contribution-grid-snake.svg',
      '            dist/github-contribution-grid-snake-dark.svg?palette=github-dark',
      '      - uses: actions/upload-artifact@v3',
      '        with:',
      '          name: snake',
      '          path: dist',
      '      - uses: crazy-max/ghaction-github-pages@v3.1.0',
      '        with:',
      '          target_branch: output',
      '          build_dir: dist',
      '        env:',
      '          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}',
    ].join('\n');

    const content = `<pre>${escHtml(workflow)}</pre>
<p>Create the file <code>.github/workflows/snake.yml</code> in your profile repository (${escHtml(username)}/${escHtml(username)}) with the content above.</p>
<button class="btn btn-sm btn-primary" onclick="window.copySnakeWorkflow()">Copy Workflow</button>
<button class="btn btn-sm btn-ghost" onclick="window.downloadSnakeWorkflow()">Download</button>`;
    window._snakeWorkflow = workflow;
    openModal('🐍 Contribution Snake Setup', content);
  }

  window.copySnakeWorkflow = function() {
    if (window._snakeWorkflow) {
      navigator.clipboard.writeText(window._snakeWorkflow).then(() => {
        showToast('Workflow copied!', 'success');
        closeModal();
      });
    }
  };

  window.downloadSnakeWorkflow = function() {
    if (!window._snakeWorkflow) return;
    const blob = new Blob([window._snakeWorkflow], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snake.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('snake.yml downloaded!', 'success');
    closeModal();
  };

  function downloadZip() {
    if (!currentMarkdown) { showToast('Generate a README first.', 'error'); return; }
    if (typeof JSZip === 'undefined') { showToast('ZIP library not loaded. Try again.', 'error'); return; }
    try {
      var zip = new JSZip();
      zip.file('README.md', currentMarkdown);
      var username = getEl('username').value.trim() || 'yourusername';
      var snakeYml = 'name: generate-snake\n\non:\n  schedule:\n    - cron: "0 0 * * *"\n  workflow_dispatch:\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: Platane/snk@v3\n        with:\n          github_user_name: ' + username + '\n          outputs: |\n            dist/github-contribution-grid-snake.svg\n            dist/github-contribution-grid-snake-dark.svg?palette=github-dark\n      - uses: actions/upload-artifact@v3\n        with:\n          name: snake\n          path: dist\n      - uses: crazy-max/ghaction-github-pages@v3.1.0\n        with:\n          target_branch: output\n          build_dir: dist\n        env:\n          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}';
      zip.file('.github/workflows/snake.yml', snakeYml);
      zip.generateAsync({ type: 'blob' }).then(function(blob) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = username + '-readme.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('GitHub-ready ZIP downloaded!', 'success');
      });
    } catch (err) {
      console.warn('ZIP error:', err);
      showToast('Failed to create ZIP.', 'error');
    }
  }

  getEl('generateBtn')?.addEventListener('click', generateREADME);
  getEl('copyBtn')?.addEventListener('click', copyMarkdown);
  getEl('downloadBtn')?.addEventListener('click', downloadREADME);
  getEl('saveHistoryBtn')?.addEventListener('click', saveHistory);
  getEl('loadDemoBtn')?.addEventListener('click', loadDemoData);
  getEl('clearFormBtn')?.addEventListener('click', clearForm);
  getEl('snakeWorkflowBtn')?.addEventListener('click', generateSnakeWorkflow);

  getEl('downloadZipBtn')?.addEventListener('click', downloadZip);

  getEl('fullscreenBtn')?.addEventListener('click', function() {
    getEl('preview')?.requestFullscreen?.() || getEl('preview')?.webkitRequestFullscreen?.();
  });

  getEl('themeToggle')?.addEventListener('click', function() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') !== 'light';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    getEl('themeIcon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      document.querySelectorAll('.template-card').forEach(card => {
        const tags = (card.dataset.filter || '').toLowerCase();
        card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
      });
    });
  });

  getEl('templateGrid')?.addEventListener('click', function(e) {
    var btn = e.target.closest('.select-template, .preview-template');
    if (!btn) return;
    var template = btn.dataset.template;
    if (!template) return;
    selectTemplate(template);
    if (btn.classList.contains('preview-template')) {
      getEl('preview')?.scrollIntoView({ behavior: 'smooth' });
      if (currentMarkdown) renderPreview(currentMarkdown);
    } else {
      getEl('generator')?.scrollIntoView({ behavior: 'smooth' });
      showToast('Template "' + template + '" selected!', 'success');
    }
  });

  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.form-tab-content').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      getEl(`tab-${this.dataset.tab}`)?.classList.add('active');
    });
  });

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const container = getEl('renderContainer');
      container.classList.toggle('mobile', this.dataset.mode === 'mobile');
    });
  });

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  document.querySelectorAll('.custom-skill-input').forEach(input => {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = this.value.trim();
        if (!val) return;
        const chips = this.parentElement.querySelector('.skill-chips');
        const span = document.createElement('span');
        span.className = 'chip active custom-chip';
        span.dataset.value = val;
        span.textContent = val;
        span.addEventListener('click', function() { this.remove(); });
        chips.appendChild(span);
        this.value = '';
      }
    });
  });

  document.querySelectorAll('.project-entry').forEach((entry, idx) => {
    const btn = entry.querySelector('.remove-project');
    if (idx > 0) btn.style.display = 'inline-flex';
    btn?.addEventListener('click', function() { entry.remove(); });
  });

  getEl('addProjectBtn')?.addEventListener('click', function() {
    const template = document.querySelector('.project-entry')?.cloneNode(true);
    if (!template) return;
    template.querySelectorAll('input').forEach(i => i.value = '');
    const btn = template.querySelector('.remove-project');
    if (btn) { btn.style.display = 'inline-flex'; btn.addEventListener('click', function() { template.remove(); }); }
    getEl('projectsContainer')?.appendChild(template);
  });

  getEl('addCertBtn')?.addEventListener('click', function() {
    const template = document.querySelector('.cert-entry')?.cloneNode(true);
    if (!template) return;
    template.querySelectorAll('input').forEach(i => i.value = '');
    const btn = template.querySelector('.remove-cert');
    if (btn) { btn.style.display = 'inline-flex'; btn.addEventListener('click', function() { template.remove(); }); }
    getEl('certsContainer')?.appendChild(template);
  });

  getEl('addAchievementBtn')?.addEventListener('click', function() {
    const template = document.querySelector('.achievement-entry')?.cloneNode(true);
    if (!template) return;
    template.querySelectorAll('input').forEach(i => i.value = '');
    const btn = template.querySelector('.remove-achievement');
    if (btn) { btn.style.display = 'inline-flex'; btn.addEventListener('click', function() { template.remove(); }); }
    getEl('achievementsContainer')?.appendChild(template);
  });

  getEl('historySearch')?.addEventListener('input', renderHistory);
  getEl('historyFilter')?.addEventListener('change', renderHistory);

  const heroLines = ['Generate beautiful GitHub Profile READMEs', '10 unique animated templates', 'Live preview with Markdown & Python', 'Powered by Python in the browser'];
  let heroIdx = 0;
  function typeHero() {
    const el = getEl('heroTyping');
    el.textContent = heroLines[heroIdx];
    heroIdx = (heroIdx + 1) % heroLines.length;
  }
  typeHero();
  setInterval(typeHero, 3500);

  (function init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'light') getEl('themeIcon').textContent = '☀️';

    loadHistory();
    renderHistory();

    selectTemplate('neumorphism');

    const img = new Image();
    img.onload = () => {};
    img.src = 'assets/logo.svg';

    initPyodide();
  })();

})();
