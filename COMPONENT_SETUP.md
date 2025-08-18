# Component System Instructions

## How to Convert Existing Pages to Use Components

To convert your existing HTML pages to use the new component system:

### 1. Replace the Navigation Section
**Find this in your HTML:**
```html
<!-- Navigation -->
<nav class="bg-white shadow-sm fixed w-full top-0 z-50 transition-shadow duration-300">
    <!-- ... entire navigation code ... -->
</nav>
```

**Replace with:**
```html
<!-- Navigation Placeholder -->
<div id="header-placeholder"></div>
```

### 2. Replace the Footer Section
**Find this in your HTML:**
```html
<!-- Footer -->
<footer class="bg-gray-900 text-white py-12">
    <!-- ... entire footer code ... -->
</footer>
```

**Replace with:**
```html
<!-- Footer Placeholder -->
<div id="footer-placeholder"></div>
```

### 3. Benefits
- ✅ Edit header once, updates all pages
- ✅ Edit footer once, updates all pages  
- ✅ Automatic active page highlighting
- ✅ Consistent navigation across all pages
- ✅ Works perfectly on GitHub Pages

### 4. Files to Update
You need to apply these changes to:
- `index.html`
- `about.html`
- `services.html` 
- `privacy.html`

The `contact.html` file has already been updated as an example.

### 5. Form Handling Options

Since GitHub Pages doesn't support server-side form processing, consider:

1. **Formspree** (Recommended): Add `action="https://formspree.io/f/YOUR_ID"` to form
2. **EmailJS**: Client-side email sending
3. **Direct Contact**: Encourage phone/email contact (already implemented)

### 6. Testing Locally
To test locally with a simple server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then visit `http://localhost:8000`
