var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Skip if not a div or the entire dashboard div (it shouldn't have any classes
    // attached). This is a bit of a hack: our selector should be specific enough
    // not to accidentally hit any broader elements.
    // if (mutation.target.nodeName !== 'DIV' || mutation.target.classList.length === 0 ) return;

    // Check if mutation is an item on dashboard with a filtered tag inside it.
    // If so, hide it entirely.
    var is_filtered = mutation.target.querySelector(':scope > div > div > article > div > a[href="/settings/account#tagfiltering"]'
      + ', :scope > div > div > article > div > a[href="/settings/account#contentfiltering"]');
    if (is_filtered !== null) {
        mutation.target.style.border = "10px solid red";
        mutation.target.style.display = "none";
        console.log("Filtering: " + is_filtered.text);
    }
  });
});
observer.observe(document, { attributes: true, childList: true, subtree: true });

// Hide filtered tags on initial load (not part of mutations in initial page of
// dashboard elements).
document.querySelectorAll('a[href="/settings/account#tagfiltering"], a[href="/settings/account#contentfiltering"]').forEach(function(elem) {
  var filtered = elem.parentElement.parentElement.parentElement.parentElement.parentElement;
  filtered.style.border = "10px solid red";
  filtered.style.display = "none";
});

console.log("Loaded TumblrFix.");
// document.body.style.border = "5px solid yellow";
