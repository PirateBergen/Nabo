(async()=>{const t={en:{skip:'Skip to content',home:'Home',menu:'Menu',about:'About',reservation:'Reservation',contact:'Contact',book:'Book a table',cuisines:"Casual dining · Seasonal plates · Fresh ingredients",since:'Since 2026 · Gastro Bar',tagline:"Good food. Good company. Make yourself at home.",seeMenu:'See the menu',image:'Image coming soon',ourStory:'Our story',storyTitle:"Fresh plates, good company",storyLead:"Nabo is a casual restaurant in Bergen where fresh ingredients and the seasons shape what’s on the plate. We put care into every dish, with bright flavours and little details that make you want another bite.",storyBody:"Pick a few plates, pass them around and pour a glass of something you like. Stay for a bite or settle in for the evening. there’s always time for good food and a little more conversation.",fromMenu:'From the menu',menuTitle:'A taste of what we make',dish1:'Small plates',dish2:'From the sea',dish3:'Something sweet',fullMenu:'See the full menu →',opening:'Opening hours',when:"When we're here",monThu:'Monday–Thursday',friSat:'Friday–Saturday',sun:'Sunday',kitchen:'Kitchen closes 30 minutes before closing time. Reservations recommended.',welcome:"Come on in, take a seat",occasion:"A catch up with friends, a drink after work or an evening worth celebrating. we’ll make room at the table.",call:'Call to book',footTag:"Fresh ingredients. Plates to share. Good company. At home with Nabo in Bergen.",find:'Find us',recommended:'Reservations recommended',contactTitle:'Send us a message',contactName:'Name',contactEmail:'Your email',contactMessage:'Message',contactSend:'Prepare email',contactNote:'Your email application will open so you can review and send the message.'},nb:{}};document.querySelectorAll('[data-i18n]').forEach(n=>t.nb[n.dataset.i18n]=n.innerHTML);try{const response=await fetch('content/site.json',{cache:'no-cache'});if(response.ok){const content=await response.json();Object.assign(t.nb,content.nb||{});Object.assign(t.en,content.en||{})}}catch{}const s=document.querySelector('#language');function set(l){l=l==='en'?'en':'nb';document.querySelectorAll('[data-i18n]').forEach(n=>{if(t[l][n.dataset.i18n])n.innerHTML=t[l][n.dataset.i18n]});document.documentElement.lang=l;s.value=l;document.querySelector('meta[name="description"]').content=l==='en'?'Nabo Gastro Bar in Bergen. casual food and good evenings.':'Nabo Gastro Bar i Bergen. uformell mat og gode kvelder.'}let saved='nb';try{saved=localStorage.getItem('nabo-language')||'nb'}catch{}set(saved);s.addEventListener('change',()=>{set(s.value);try{localStorage.setItem('nabo-language',s.value)}catch{}});const b=document.querySelector('#toggle'),n=document.querySelector('#nav');b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));n.classList.toggle('open',!o)});n.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}})})();




(()=>{const dialog=document.querySelector('#contact-dialog'),open=document.querySelector('#contact-open'),close=document.querySelector('#contact-close'),form=document.querySelector('#contact-form');if(!dialog||!open||!close||!form)return;open.addEventListener('click',event=>{if(typeof dialog.showModal==='function'){event.preventDefault();dialog.showModal()}});close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form),name=String(data.get('name')||''),email=String(data.get('email')||''),message=String(data.get('message')||''),subject=`Message from ${name} via nabobergen.no`,body=`Name: ${name}\nEmail: ${email}\n\n${message}`,recipient=form.dataset.recipient||'restaurant@nabobergen.com';window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;dialog.close()})})();

(async()=>{
  const gallery=document.querySelector('.static-gallery');
  if(!gallery)return;
  const viewer=document.createElement('dialog');
  viewer.className='photo-viewer';viewer.setAttribute('aria-label','Photo and description');
  const close=document.createElement('button'),full=document.createElement('img'),heading=document.createElement('h2'),body=document.createElement('p');
  close.type='button';close.className='photo-viewer-close';close.textContent='×';close.setAttribute('aria-label','Close');
  const overlay=document.createElement('div');overlay.className='photo-viewer-copy';overlay.append(heading,body);
  viewer.append(close,full,overlay);document.body.append(viewer);
  const dismiss=()=>viewer.close();close.addEventListener('click',dismiss);full.addEventListener('click',dismiss);
  viewer.addEventListener('click',event=>{if(event.target===viewer){const rect=viewer.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dismiss()}});
  viewer.addEventListener('close',()=>document.body.classList.remove('photo-viewer-open'));
  const openPhoto=photo=>{full.src=photo.desktop;full.alt=photo.alt||'';heading.textContent=photo.captionTitle||'';heading.hidden=!photo.captionTitle;body.textContent=photo.caption||'';viewer.showModal();viewer.scrollTop=0;document.body.classList.add('photo-viewer-open')};
  try {
    const response=await fetch('content/gallery.json',{cache:'no-cache'});
    if(!response.ok)return;
    const data=await response.json();
    if(!Array.isArray(data.photos)||!data.photos.length)return;
    const fragment=document.createDocumentFragment();
    data.photos.slice(0,3).forEach(photo=>{
      const figure=document.createElement('figure'),picture=document.createElement('picture'),img=document.createElement('img');
      if(photo.mobile){const source=document.createElement('source');source.media='(max-width: 600px)';source.srcset=photo.mobile;picture.append(source)}
      img.src=photo.desktop;img.alt=photo.alt||'';img.loading='lazy';picture.append(img);figure.append(picture);
      if(photo.caption){
        figure.classList.add('photo-story');
        const caption=document.createElement('figcaption'),details=document.createElement('details'),summary=document.createElement('summary'),text=document.createElement('p');
        caption.lang='en';summary.textContent=photo.captionTitle||photo.caption.split(/(?<=[.!?])\s/)[0];text.textContent=photo.caption;
        details.append(summary,text);caption.append(details);figure.append(caption);
        figure.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&matchMedia('(hover: hover)').matches)details.open=true});
        figure.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!details.contains(document.activeElement))details.open=false});
        figure.addEventListener('click',event=>{
          event.preventDefault();
          if(matchMedia('(max-width: 600px)').matches){details.open=false;openPhoto(photo);return}
          const opening=!details.open;
          if(opening)gallery.querySelectorAll('details[open]').forEach(other=>{if(other!==details)other.open=false});
          details.open=opening;
        });
        figure.addEventListener('keydown',event=>{if(event.key==='Escape'){details.open=false;summary.focus()}});
      }
      fragment.append(figure);
    });
    gallery.replaceChildren(fragment);
  }catch{}
})();
