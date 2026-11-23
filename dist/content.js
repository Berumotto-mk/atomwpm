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
    {
        "title": "Pick and place",
        "description": "AtomWPM-predicted point trajectories for placing the cup.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/pick-place-prediction.mp4",
        "poster": "assets/videos/pick-place-prediction.jpg"
    },
    {
        "title": "Fold the paper bag",
        "description": "AtomWPM-predicted point trajectories for folding the paper bag.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/fold-bag-prediction.mp4",
        "poster": "assets/videos/fold-bag-prediction.jpg"
    },
    {
        "title": "Wipe the table",
        "description": "AtomWPM-predicted point trajectories for wiping the table.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/wipe-table-prediction.mp4",
        "poster": "assets/videos/wipe-table-prediction.jpg"
    },
    {
        "title": "Open the drawer",
        "description": "AtomWPM-predicted point trajectories for opening the drawer.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/open-drawer-prediction.mp4",
        "poster": "assets/videos/open-drawer-prediction.jpg"
    }
],
  executionVideos: [
    {
        "title": "Pick and place",
        "description": "Robot placing the cup, using AtomWPM trajectories as input to the action decoder.",
        "protocol": "AtomWPM + action decoder",
        "src": "assets/videos/pick-place-execution.mp4",
        "poster": "assets/videos/pick-place-execution.jpg"
    },
    {
        "title": "Fold the paper bag",
        "description": "Robot folding the paper bag, using AtomWPM trajectories as input to the action decoder.",
        "protocol": "AtomWPM + action decoder",
        "src": "assets/videos/fold-bag-execution.mp4",
        "poster": "assets/videos/fold-bag-execution.jpg"
    },
    {
        "title": "Wipe the table",
        "description": "Robot wiping the table, using AtomWPM trajectories as input to the action decoder.",
        "protocol": "AtomWPM + action decoder",
        "src": "assets/videos/wipe-table-execution.mp4",
        "poster": "assets/videos/wipe-table-execution.jpg"
    },
    {
        "title": "Open the drawer",
        "description": "Robot opening the drawer, using AtomWPM trajectories as input to the action decoder.",
        "protocol": "AtomWPM + action decoder",
        "src": "assets/videos/open-drawer-execution.mp4",
        "poster": "assets/videos/open-drawer-execution.jpg"
    }
],
  /* Draft citation: replace with the final public paper metadata at release. */
  bibtex: `@misc{atomwpm,
  title = {AtomWPM: Fast 4D Prediction from Pretrained Video Representations},
  author = {Ma, Kai and chong bocheng and Liruoyang and Zeng, Xianzhu
            and Li, Haozhe and Li, Tao and Li, Shiqian and Wang, Dong},
  note = {Manuscript; publication details forthcoming}
}`
};
