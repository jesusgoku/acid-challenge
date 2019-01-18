export default function googleMapsLoadAsync(key, options = {}) {
  return new Promise(resolve => {
    const callback = '__googleMapsInit';
    const params = new URLSearchParams({ callback, key });

    window[callback] = function() {
      resolve(window.google.maps);
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = `https://maps.googleapis.com/maps/api/js?${params}`;
    document.body.appendChild(scriptTag);
  });
}
