// ===== AUTH NAV: Show user avatar + name instead of Sign In button =====
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('epicUser') || 'null');
    if (!user) return;

    // SVG Icons for the dropdown
    const icons = {
      achievements: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h8M12 17v4M7 4h10M5 4h14v5c0 3.866-3.134 7-7 7s-7-3.134-7-7V4z"/></svg>`,
      rewards: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`,
      wallet: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/></svg>`,
      gift: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="13" rx="1"/><path d="M12 8v13M3 13h18M12 8V5a3 3 0 0 0-3-3H6M12 8V5a3 3 0 0 1 3-3h3"/></svg>`,
      coupon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
      account: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      redeem: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"/><path d="M2 12h20M7 7v10M17 7v10"/></svg>`,
      wishlist: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
      support: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>`,
      externalLink: `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>`,
      signout: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>`
    };

    // Find the sign-in button link on any page
    const signinLinks = document.querySelectorAll('a[href="login.html"]');
    
    signinLinks.forEach(function (link) {
      const btn = link.querySelector('.signin-btn');
      if (!btn) return; // Skip if it doesn't have the signin-btn class (safety check)

      // 1. Create the container widget
      const wrapper = document.createElement('div');
      wrapper.className = 'user-profile-nav';
      wrapper.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        position: relative;
        padding: 6px 12px;
        border-radius: 8px;
        transition: background-color 0.2s ease;
      `;
      wrapper.addEventListener('mouseenter', () => { wrapper.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; });
      wrapper.addEventListener('mouseleave', () => { wrapper.style.backgroundColor = 'transparent'; });

      // 2. Create the Avatar
      const avatar = document.createElement('div');
      avatar.className = 'user-avatar-circle';
      avatar.style.cssText = `
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #3a3a40;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        flex-shrink: 0;
      `;
      const displayName = user.display_name || user.first_name || 'U';
      avatar.textContent = displayName[0];

      // 3. Create the Display Name Text
      const nameEl = document.createElement('span');
      nameEl.className = 'user-display-name';
      nameEl.style.cssText = `
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        font-family: inherit;
      `;
      nameEl.textContent = displayName;

      wrapper.appendChild(avatar);
      wrapper.appendChild(nameEl);

      // Replace the old login link with the new interactive wrapper
      link.parentNode.replaceChild(wrapper, link);

      // 4. Create the new comprehensive Epic Games Modal (Dropdown)
      const dropdown = document.createElement('div');
      dropdown.className = 'user-dropdown-modal';
      dropdown.style.cssText = `
        display: none;
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: #202024;
        border: 1px solid #333338;
        border-radius: 12px;
        padding: 12px 0;
        min-width: 280px;
        z-index: 9999;
        box-shadow: 0 12px 32px rgba(0,0,0,0.6);
        cursor: default;
        font-family: inherit;
      `;

      // Header "STORE"
      const storeHeader = document.createElement('div');
      storeHeader.style.cssText = `
        padding: 8px 24px;
        font-size: 11px;
        font-weight: 700;
        color: #a0a0a5;
        letter-spacing: 0.5px;
      `;
      storeHeader.textContent = 'STORE';
      dropdown.appendChild(storeHeader);

      // Helper function to create menu items
      function createMenuItem(iconSvg, label, hasExternalIcon = false, isAction = false) {
        const item = document.createElement('a');
        item.href = '#';
        item.style.cssText = `
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 24px;
          color: #f5f5f5;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.15s ease;
        `;
        
        item.addEventListener('mouseenter', () => { item.style.backgroundColor = '#2a2a30'; });
        item.addEventListener('mouseleave', () => { item.style.backgroundColor = 'transparent'; });

        const iconContainer = document.createElement('div');
        iconContainer.style.cssText = 'color: #d0d0d0; display: flex; align-items: center; justify-content: center;';
        iconContainer.innerHTML = iconSvg;

        const textContainer = document.createElement('span');
        textContainer.style.flex = '1';
        textContainer.textContent = label;

        item.appendChild(iconContainer);
        item.appendChild(textContainer);

        if (hasExternalIcon) {
          const extIcon = document.createElement('div');
          extIcon.style.cssText = 'color: #a0a0a5; display: flex; align-items: center;';
          extIcon.innerHTML = icons.externalLink;
          item.appendChild(extIcon);
        }

        return item;
      }

      // Add main store items
      dropdown.appendChild(createMenuItem(icons.achievements, 'My Achievements'));
      dropdown.appendChild(createMenuItem(icons.rewards, 'Epic Rewards'));
      dropdown.appendChild(createMenuItem(icons.wallet, 'Account Balance'));
      dropdown.appendChild(createMenuItem(icons.gift, 'Gifts'));
      dropdown.appendChild(createMenuItem(icons.coupon, 'Coupons'));
      dropdown.appendChild(createMenuItem(icons.account, 'Account'));
      dropdown.appendChild(createMenuItem(icons.redeem, 'Redeem Code'));
      dropdown.appendChild(createMenuItem(icons.redeem, 'Redeem Fortnite Gift Card')); // Using same icon as redeem code for simplicity or Fortnite specific
      dropdown.appendChild(createMenuItem(icons.wishlist, 'Wishlist'));

      // Divider
      const divider = document.createElement('div');
      divider.style.cssText = 'height: 1px; background-color: #333338; margin: 8px 0; width: 100%;';
      dropdown.appendChild(divider);

      // Support (External)
      dropdown.appendChild(createMenuItem(icons.support, 'Support', true));

      // Sign Out
      const signoutBtn = createMenuItem(icons.signout, 'Sign Out');
      signoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('epicUser');
        fetch('http://localhost:3000/api/logout', { method: 'POST' }).catch(() => {});
        window.location.href = 'login.html';
      });
      dropdown.appendChild(signoutBtn);

      wrapper.appendChild(dropdown);

      // Handle dropdown toggling
      let isOpen = false;

      wrapper.addEventListener('click', function (e) {
        e.stopPropagation();
        isOpen = !isOpen;
        dropdown.style.display = isOpen ? 'block' : 'none';
        wrapper.style.backgroundColor = isOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent';
      });

      // Prevent closing when clicking inside the dropdown
      dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
      });

      // Close when clicking outside
      document.addEventListener('click', function () {
        if (isOpen) {
          isOpen = false;
          dropdown.style.display = 'none';
          wrapper.style.backgroundColor = 'transparent';
        }
      });
    });
  });
})();
