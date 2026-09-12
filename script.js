(async()=>{const t={en:{skip:'Skip to content',home:'Home',menu:'Menu',about:'About',reservation:'Reservation',contact:'Contact',book:'Book a table',cuisines:'Casual dining · Simple · Welcoming',since:'Since 2026 · Gastro Bar',tagline:'Simple. Casual. Good company.',seeMenu:'See the menu',image:'Image coming soon',ourStory:'Our story',storyTitle:'A casual kitchen',storyLead:'Nabo is a casual place in Bergen, serving simple food made to be shared around the table.',storyBody:'We cook for evenings made to be shared — relaxed, warm, with room for familiar favourites and new discoveries.',fromMenu:'From the menu',menuTitle:'A taste of what we make',dish1:'Small plates',dish2:'From the sea',dish3:'Something sweet',fullMenu:'See the full menu →',opening:'Opening hours',when:"When we're here",monThu:'Monday–Thursday',friSat:'Friday–Saturday',sun:'Sunday',kitchen:'Kitchen closes 30 minutes before closing time. Reservations recommended.',welcome:'We look forward to seeing you',occasion:"Whether it's a weeknight or a special occasion, we'll set a table for you.",groups:'Groups from 2 to 20 people.',call:'Call to book',footTag:'Casual food. Good evenings. At home with Nabo in Bergen.',find:'Find us',recommended:'Reservations recommended',contactTitle:'Send us a message',contactName:'Name',contactEmail:'Your email',contactMessage:'Message',contactSend:'Prepare email',contactNote:'Your email application will open so you can review and send the message.'},nb:{}};document.querySelectorAll('[data-i18n]').forEach(n=>t.nb[n.dataset.i18n]=n.innerHTML);try{const response=await fetch('content/site.json',{cache:'no-cache'});if(response.ok){const content=await response.json();Object.assign(t.nb,content.nb||{});Object.assign(t.en,content.en||{})}}catch{}const s=document.querySelector('#language');function set(l){l=l==='en'?'en':'nb';document.querySelectorAll('[data-i18n]').forEach(n=>{if(t[l][n.dataset.i18n])n.innerHTML=t[l][n.dataset.i18n]});document.documentElement.lang=l;s.value=l;document.querySelector('meta[name="description"]').content=l==='en'?'Nabo Gastro Bar in Bergen — casual food and good evenings.':'Nabo Gastro Bar i Bergen — uformell mat og gode kvelder.'}let saved='nb';try{saved=localStorage.getItem('nabo-language')||'nb'}catch{}set(saved);s.addEventListener('change',()=>{set(s.value);try{localStorage.setItem('nabo-language',s.value)}catch{}});const b=document.querySelector('#toggle'),n=document.querySelector('#nav');b.addEventListener('click',()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!o));n.classList.toggle('open',!o)});n.addEventListener('click',e=>{if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}})})();




(()=>{const dialog=document.querySelector('#contact-dialog'),open=document.querySelector('#contact-open'),close=document.querySelector('#contact-close'),form=document.querySelector('#contact-form');if(!dialog||!open||!close||!form)return;open.addEventListener('click',event=>{if(typeof dialog.showModal==='function'){event.preventDefault();dialog.showModal()}});close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form),name=String(data.get('name')||''),email=String(data.get('email')||''),message=String(data.get('message')||''),subject=`Message from ${name} via nabobergen.no`,body=`Name: ${name}\nEmail: ${email}\n\n${message}`,recipient=form.dataset.recipient||'restaurant@nabobergen.com';window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;dialog.close()})})();

(async()=>{
  const gallery=document.querySelector('.static-gallery');
  if(!gallery)return;
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
      if(photo.caption){const caption=document.createElement('figcaption');caption.lang='en';caption.textContent=photo.caption;figure.append(caption)}
      fragment.append(figure);
    });
    gallery.replaceChildren(fragment);
  }catch{}
})();
