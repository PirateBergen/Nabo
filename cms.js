(async()=>{
  const get=async path=>{try{const r=await fetch(path,{cache:'no-cache'});return r.ok?await r.json():null}catch{return null}};
  const [details,menu,custom]=await Promise.all([get('content/details.json'),get('content/menu.json'),get('content/sections.json')]);
  if(details){
    if(details.bookingUrl){try{const url=new URL(details.bookingUrl);if(url.protocol==='https:')document.querySelectorAll('a[data-booking]').forEach(a=>a.href=url.href)}catch{}}
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.href='tel:'+details.phoneLink);
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.href='mailto:'+details.email);
    document.querySelectorAll('a[href^="tel:"]:not([data-i18n])').forEach(a=>a.textContent=details.phoneDisplay);
    const email=[...document.querySelectorAll('footer a[href^="mailto:"]')][0];if(email)email.textContent=details.email;
    const address=document.querySelector('footer address');if(address)address.innerHTML=`${details.addressLine1}<br>${details.addressLine2}`;
    const times=document.querySelectorAll('.hours dd');[details.mondayThursday,details.fridaySaturday,details.sunday].forEach((v,i)=>{if(times[i])times[i].textContent=v});
    const footerHours=document.querySelector('footer>div:nth-child(2) p');if(footerHours)footerHours.innerHTML=`Man–tor ${details.mondayThursday}<br>Fre–lør ${details.fridaySaturday}<br>Søn ${details.sunday}`;
    const form=document.querySelector('#contact-form');if(form)form.dataset.recipient=details.email;
  }
  if(menu?.categories?.length){
    const columns=document.querySelectorAll('.menu-column');columns.forEach(c=>c.replaceChildren());
    menu.categories.forEach((category,index)=>{const section=document.createElement('section');section.className='menu-category'+(category.style&&category.style!=='standard'?' '+category.style:'');const h=document.createElement('h2');h.textContent=category.title;if(index===0)h.id='menu-title';section.append(h);(category.items||[]).forEach(item=>{const article=document.createElement('article'),h3=document.createElement('h3'),left=document.createElement('span'),price=document.createElement('span');left.textContent=item.name+' ';if(item.allergens||item.diet!=='none'){const small=document.createElement('small');if(item.allergens)small.append(`[${item.allergens}] `);if(item.diet&&item.diet!=='none'){const b=document.createElement('b');b.textContent='V';if(item.diet==='vegan')b.className='vegan';small.append(b)}left.append(small)}price.textContent=item.price;h3.append(left,price);const p=document.createElement('p');p.textContent=item.description;article.append(h3,p);section.append(article)});(columns[(Number(category.column)||1)-1]||columns[0]).append(section)});
    const notes=document.querySelectorAll('.allergens p');if(notes[0])notes[0].textContent=menu.dietLegend;if(notes[1])notes[1].textContent=menu.allergenLegend;if(notes[2])notes[2].textContent=menu.footerNote;
  }
  if(custom?.sections?.length){const menuSection=document.querySelector('#menu');custom.sections.forEach(item=>{const section=document.createElement('section');section.className='section custom-section';const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=item.eyebrow||'';const title=document.createElement('h2');title.textContent=item.title||'';const body=document.createElement('p');body.textContent=item.text||'';section.append(eyebrow,title,body);if(item.image){const img=document.createElement('img');img.src=item.image;img.alt=item.title||'';img.loading='lazy';section.append(img)}menuSection.before(section)})}
})();
