(() => {
  'use strict';
  const config = window.ATOMWPM;
  const make = (tag, cls, text) => { const el = document.createElement(tag); if(cls) el.className=cls; if(text) el.textContent=text; return el; };
  const safeURL = value => {
    if (!value || !value.trim()) return '';
    const url = new URL(value, document.baseURI);
    return ['http:', 'https:'].includes(url.protocol) ? value : '';
  };
  config.resources.forEach(resource => {
    const url = safeURL(resource.url);
    const button = make(url?'a':'span', `resource-button${url?'':' unreleased'}`, resource.label);
    if(url){button.href=url;button.target='_blank';button.rel='noopener noreferrer';}
    else button.append(make('small','', 'Coming soon'));
    document.querySelector('#hero-resources').append(button);
    const item = make('div','resource-item'); const title=make('h3','',resource.label);
    if(url){const a=make('a','',resource.label); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; title.replaceChildren(a);}
    item.append(title,make('p','',resource.description),make('p','',url?'Available':'Coming soon'));
    document.querySelector('#resource-list').append(item);
  });
  const videoNode = item => {
    const v=make('video');v.src=safeURL(item.src);v.controls=true;v.playsInline=true;v.preload='metadata';v.setAttribute('aria-label',item.title);
    if(safeURL(item.poster))v.poster=item.poster;
    v.append(make('p','', 'Your browser does not support video playback.'));
    return v;
  };
  if(safeURL(config.heroVideo)){
    document.querySelector('#hero-media').replaceChildren(videoNode({src:config.heroVideo,title:'AtomWPM overview'}));
    document.querySelector('.figure-note').textContent='AtomWPM overview video';
  }
  const renderMedia = (items,target) => items.forEach(item=>{
    const card=make('article','media-card');
    if(safeURL(item.src)) card.append(videoNode(item));
    else {const empty=make('div','media-placeholder');empty.innerHTML='<svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><rect x="3" y="6" width="30" height="24" rx="4" stroke-width="1.4"/><path d="m15 12 9 6-9 6z" stroke-width="1.4"/></svg>';empty.append(make('strong','','Rollout video coming soon'),make('span','','This space is reserved for a recorded result.'));card.append(empty);}
    const copy=make('div','media-copy');copy.append(make('h3','',item.title),make('p','',item.description));
    if(item.protocol)copy.append(make('span','media-tag',item.protocol));card.append(copy);document.querySelector(target).append(card);
  });
  renderMedia(config.predictionVideos,'#prediction-videos');renderMedia(config.executionVideos,'#execution-videos');
  const tabs=[...document.querySelectorAll('[role=tab]')];
  const selectTab = tab => {tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected;});};
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();selectTab(tabs[next]);tabs[next].focus();});});
  document.querySelector('#bibtex').textContent=config.bibtex;
  document.querySelector('#copy-citation').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(config.bibtex);document.querySelector('#copy-status').textContent='Citation copied.';}
    catch{const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);document.querySelector('#copy-status').textContent='Citation selected. Use your device’s copy command.';}
  });
})();
