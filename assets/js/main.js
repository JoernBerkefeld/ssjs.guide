(function () {
  'use strict';

  // ── Mobile sidebar toggle ───────────────────────────────────────────────────

  var toggle = document.getElementById('mobile-menu-toggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('is-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // ── Sidebar section expand/collapse ────────────────────────────────────────

  var sectionTitles = document.querySelectorAll('.sidebar-section-title');
  sectionTitles.forEach(function (title) {
    title.addEventListener('click', function (e) {
      var section = title.parentElement;
      var children = section.querySelector('.sidebar-children');
      if (children) {
        // Only prevent default if it's a collapsible section (has children)
        var isOpen = children.classList.contains('is-open');
        if (isOpen) {
          children.classList.remove('is-open');
          section.classList.remove('is-active');
        } else {
          children.classList.add('is-open');
          section.classList.add('is-active');
        }
        // Only prevent default navigation when toggling collapsed section
        // Let active-section links through
      }
    });
  });

  // ── Copy code buttons ───────────────────────────────────────────────────────

  document.querySelectorAll('pre').forEach(function (pre) {
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    var btn = document.createElement('button');
    btn.className = 'copy-button';
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M1 4v7h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Copy';
    btn.setAttribute('aria-label', 'Copy code');
    wrapper.appendChild(btn);

    btn.addEventListener('click', function () {
      var code = pre.querySelector('code') || pre;
      var text = code.innerText || code.textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.classList.add('is-copied');
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied!';
        setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M1 4v7h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg> Copy';
        }, 2000);
      }).catch(function () {
        // Fallback for older browsers
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(ta);
        btn.classList.add('is-copied');
        setTimeout(function () { btn.classList.remove('is-copied'); }, 2000);
      });
    });
  });

  // ── Keyboard shortcut for search ────────────────────────────────────────────

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      var input = document.getElementById('search-input');
      if (input) {
        input.focus();
        input.select();
      }
    }
    if (e.key === 'Escape') {
      var results = document.getElementById('search-results');
      if (results) {
        results.hidden = true;
      }
      var input2 = document.getElementById('search-input');
      if (input2) {
        input2.blur();
      }
    }
  });

})();
