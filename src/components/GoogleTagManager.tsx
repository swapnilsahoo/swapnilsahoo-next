/* eslint-disable @next/next/next-script-for-ga -- Keep the owner's manual snippets in the server-rendered head. */

export function GoogleTag() {
  return (
    <>
      <script
        id="google-tag"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-PTGSDRSVK3"
      />
      <script
        id="google-tag-config"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-PTGSDRSVK3');`,
        }}
      />
    </>
  );
}

export function GoogleTagManagerScript() {
  return (
    <script
      id="google-tag-manager"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){var started=false;function start(){if(started)return;started=true;
w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
var tag=d.getElementById('google-tag');if(tag&&typeof w.gtag==='function'){
tag.addEventListener('error',start,{once:true});w.gtag('get','G-PTGSDRSVK3','client_id',start);
}else{start();}
})(window,document,'script','dataLayer','GTM-KJMH54BC');`,
      }}
    />
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-KJMH54BC"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
