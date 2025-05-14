# Manual Testing Script: Events Archive & Team Grid Components

This document provides step-by-step instructions for manually testing the Events Archive and Team Grid components. Following the PLAN_TESTSCRIPT guidelines, this ensures that each component functions correctly in a real environment.

## Prerequisites

1. Ensure the development server is running (`npm run dev`)
2. Navigate to the test page at `/events-team`
3. Have DevTools open to observe console for errors
4. Test on both desktop and mobile viewports

## Phase 1: Events Archive Component Tests

### 1.1 Basic Rendering & Layout

**Actions:**
1. Load the page
2. Scroll to the Events Archive section

**Expected Results:**
- [ ] Section title "Events Archive" is visible
- [ ] Description text is visible below the title
- [ ] Events are displayed in a masonry layout (multiple columns on desktop)
- [ ] Each event shows a title, date, and preview image
- [ ] Sponsor CTA card is visible within the layout

**Observations & Issues:**
- Record any layout issues or rendering problems
- Note any console errors

### 1.2 Video Modal Functionality

**Actions:**
1. Click on any event tile with video
2. Observe the modal opening
3. Watch a few seconds of video
4. Click the close button
5. Open the modal again
6. Press ESC key

**Expected Results:**
- [ ] Modal opens smoothly with fade-in animation
- [ ] Video loads and plays automatically
- [ ] Body scroll is locked when modal is open
- [ ] Close button works
- [ ] ESC key closes the modal
- [ ] Body scroll is restored when modal closes

**Observations & Issues:**
- Note any playback issues
- Check for memory leaks (open/close modal repeatedly)

### 1.3 Sponsor CTA Integration

**Actions:**
1. Click on the "Become a Sponsor" card
2. Observe the Calendly modal
3. Close the Calendly modal

**Expected Results:**
- [ ] Calendly modal opens correctly
- [ ] Modal shows the correct title
- [ ] Close button works properly

**Observations & Issues:**
- Record any issues with Calendly integration

### 1.4 Error Handling

**Actions:**
1. Use DevTools to block network requests for video files
2. Click on an event tile with video

**Expected Results:**
- [ ] Error message is displayed in the modal
- [ ] Close button still works
- [ ] Error is logged to console

**Observations & Issues:**
- Note how the error is presented to the user

### 1.5 Responsive Behavior

**Actions:**
1. Resize browser window to tablet size (768px width)
2. Resize to mobile size (375px width)
3. Check layout at each size

**Expected Results:**
- [ ] Layout adjusts properly to viewport size
- [ ] Single column on mobile
- [ ] Two columns on tablet
- [ ] Three columns on desktop
- [ ] Content remains readable at all sizes
- [ ] Modal is usable on small screens

**Observations & Issues:**
- Note any layout breaks or overflow issues

## Phase 2: Team Grid Component Tests

### 2.1 Basic Rendering & Layout

**Actions:**
1. Scroll to Team Grid section
2. Observe the layout and content

**Expected Results:**
- [ ] Section title "Our Team" is visible
- [ ] Description text is visible below the title
- [ ] Team members are displayed in a grid
- [ ] Each card shows name, role, photo, and social links
- [ ] Bio text is displayed when available
- [ ] Dark mode styling is correctly applied

**Observations & Issues:**
- Record any layout issues or rendering problems
- Note any console errors

### 2.2 Social Links Functionality

**Actions:**
1. Click on various social links for team members
2. Check that links open in new tabs

**Expected Results:**
- [ ] Links open in new tabs/windows
- [ ] Correct URLs are loaded
- [ ] Hover state shows visual feedback

**Observations & Issues:**
- Check that all link types work (twitter, linkedin, github, email)

### 2.3 Responsive Behavior

**Actions:**
1. Resize browser window to tablet size (768px width)
2. Resize to mobile size (375px width)
3. Check layout at each size

**Expected Results:**
- [ ] Grid adjusts properly to viewport size
- [ ] Single column on mobile
- [ ] Two columns on tablet
- [ ] Three or more columns on desktop
- [ ] Photos and text remain properly sized
- [ ] No overflow issues with long names or roles

**Observations & Issues:**
- Note any layout breaks or overflow issues

## Phase 3: Accessibility Testing

### 3.1 Keyboard Navigation

**Actions:**
1. Use Tab key to navigate through interactive elements
2. Open video modal with Enter key
3. Navigate within modal using Tab
4. Close modal with ESC key

**Expected Results:**
- [ ] All interactive elements are keyboard focusable
- [ ] Focus order is logical
- [ ] Focus is trapped inside modal when open
- [ ] Focus returns to trigger element when modal closes
- [ ] Visible focus indicators on all interactive elements

**Observations & Issues:**
- Note any keyboard traps or navigation issues

### 3.2 Screen Reader Compatibility

**Actions:**
1. Turn on VoiceOver (Mac) or NVDA (Windows)
2. Navigate through the page
3. Interact with events and team cards

**Expected Results:**
- [ ] All images have proper alt text
- [ ] Interactive elements have appropriate roles
- [ ] Modal has correct ARIA attributes
- [ ] Video controls are accessible

**Observations & Issues:**
- Note any screen reader announcement issues

## Phase 4: Performance Testing

### 4.1 Load Time & Performance

**Actions:**
1. Open Network tab in DevTools
2. Hard refresh the page (Ctrl+Shift+R)
3. Observe load times and rendering

**Expected Results:**
- [ ] Events section loads in under 2 seconds
- [ ] Images load with proper resolution
- [ ] No layout shifts during image loading
- [ ] Smooth animations and transitions

**Measurements:**
- Time to first meaningful paint: ___ ms
- Time until interactive: ___ ms
- Largest Contentful Paint: ___ ms

### 4.2. Masonry Layout Recalculation

**Actions:**
1. Open Performance tab in DevTools
2. Start recording
3. Resize window several times
4. Stop recording and analyze

**Expected Results:**
- [ ] Masonry recalculation on resize takes < 100ms
- [ ] No visible layout glitches during resize
- [ ] Smooth transition between layout changes

**Measurements:**
- Recalculation time: ___ ms

## Test Results Summary

**Pass/Fail Status:**
- Events Archive: [PASS/FAIL]
- Team Grid: [PASS/FAIL]

**Critical Issues:**
1. 
2. 

**Non-Critical Issues:**
1. 
2. 

**Performance Results:**
- Load Time: 
- Interaction Speed:
- Animation Smoothness:

**Next Steps:**
1. 
2. 

---

Test completed by: ________________
Date: ________________ 