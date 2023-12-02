$(document).ready(function () {
  const contentContainer = $('#content');
  const navbar = $('nav');

  // Initial content to display when the SPA loads
  loadContent(location.hash.substr(1));

  // Handle navigation links
  $('nav a').on('click', function (event) {
    event.preventDefault();

    const target = $(this).attr('href').substr(1); // Remove the '#' symbol
    navigateTo(target);
  });

  // Function to load content into the main container
  function loadContent(viewName) {
    // Remove any extra extensions from the viewName
    viewName = viewName.replace('.html', '');

    // Check if the loaded content is not the navbar
    if (viewName !== 'home') {
      contentContainer.fadeOut(200, function () {
        contentContainer.load(`views/${viewName}.html`, function () {
          contentContainer.fadeIn(200);
        });
      });
    } else {
      // Load home content without fading
      contentContainer.load(`views/home.html`);
      contentContainer.fadeIn(200);
    }
  }

  // Function to update the URL and content
  function navigateTo(path) {
    // Update the URL hash without triggering a page reload
    location.hash = path;

    // Load content based on the path
    loadContent(path);

    // Highlight the active navigation link
    $('nav a').removeClass('app-nav-btn-active');
    $('nav a[href="#' + path + '"]').addClass('app-nav-btn-active');
  }

  // Example: handle back/forward buttons
  $(window).on('popstate', function () {
    // Load content based on the current URL hash
    loadContent(location.hash.substr(1));
  });
});