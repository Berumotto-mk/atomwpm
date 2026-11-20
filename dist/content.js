/* Public release configuration. Use relative asset paths for GitHub Pages. */
window.ATOMWPM = {
  resources: [
    { label: 'Paper', description: 'Manuscript & supplementary material', url: '' },
    { label: 'Code', description: 'Training & inference', url: '' },
    { label: 'Models', description: 'Pretrained checkpoints', url: '' },
    { label: 'Data', description: 'Atom4dData & Atom4dbench', url: '' }
  ],
  heroVideo: '',
  predictionVideos: [
    { title: 'Real-world trajectory prediction', description: 'Object motion across manipulation tasks.', protocol: '', src: '', poster: '' },
    { title: 'LIBERO & RoboTwin 2.0', description: 'Forecasting in simulated manipulation environments.', protocol: '', src: '', poster: '' }
  ],
  executionVideos: [
    { title: 'Trajectory-guided robot execution', description: 'Predicted 4D trajectories followed by the action expert.', protocol: '', src: '', poster: '' },
    { title: 'Human-to-robot transfer', description: 'Human demonstration trajectories used by the action expert.', protocol: '', src: '', poster: '' }
  ],
  /* Draft citation: replace with the final public paper metadata at release. */
  bibtex: `@misc{atomwpm,
  title = {AtomWPM: Fast 4D Prediction from Pretrained Video Representations},
  author = {Ma, Kai and chong bocheng and Liruoyang and Zeng, Xianzhu
            and Li, Haozhe and Li, Tao and Li, Shiqian and Wang, Dong},
  note = {Manuscript; publication details forthcoming}
}`
};
