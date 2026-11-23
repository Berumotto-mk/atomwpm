(() => {
  const root=document.querySelector('.forecast-results');
  if(!root)return;
  const charts=root.querySelector('.forecast-charts');
  const buttons=[...root.querySelectorAll('.forecast-scope button')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const scope=button.dataset.scope;
    buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    charts.dataset.scope=scope;
    root.querySelectorAll('.forecast-image').forEach(image=>{image.src=`assets/charts/prediction-${image.dataset.metric}-${scope}.svg`;image.width=scope==='all'?3000:1300;});
    root.querySelectorAll('.forecast-download').forEach(a=>a.href=`assets/charts/prediction-${a.dataset.metric}-${scope}.svg`);
    root.querySelector('.forecast-scope-note').textContent=scope==='all'?'Every variant reported in Table 1, including static and constant-velocity baselines. Missing Real results are marked N/A, not zero. Scroll horizontally to see all methods.':'Post-trained, endpoint-conditioned methods reported in both tables. AtomWPM uses H3/F30 and four denoising steps.';
  }));
})();
