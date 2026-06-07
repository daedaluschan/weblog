(function () {
  function getSharedUrl(link) {
    if (link.dataset.shareUrl) {
      return link.dataset.shareUrl;
    }

    try {
      var linkUrl = new URL(link.href);
      return linkUrl.searchParams.get("u") || linkUrl.searchParams.get("url") || link.href;
    } catch (error) {
      return link.href;
    }
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest('a[data-share-platform="facebook"]');

    if (!link || !navigator.share) {
      return;
    }

    var url = getSharedUrl(link);
    var title = link.dataset.shareTitle || document.title;
    var text = link.dataset.shareText || title;

    event.preventDefault();

    navigator.share({
      title: title,
      text: text,
      url: url,
    }).catch(function (error) {
      if (error && error.name === "AbortError") {
        return;
      }

      window.open(link.href, link.target || "_blank", "noopener");
    });
  });
})();
