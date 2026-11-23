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
        "src": "assets/videos/pick-place-prediction-aligned.mp4",
        "playbackNote": "2.50× playback; matched to robot execution.",
        "poster": "assets/videos/pick-place-prediction.jpg"
    },
    {
        "title": "Fold the paper bag",
        "description": "AtomWPM-predicted point trajectories for folding the paper bag.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/fold-bag-prediction-aligned.mp4",
        "playbackNote": "2.73× playback; matched to robot execution.",
        "poster": "assets/videos/fold-bag-prediction.jpg"
    },
    {
        "title": "Wipe the table",
        "description": "AtomWPM-predicted point trajectories for wiping the table.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/wipe-table-prediction-aligned.mp4",
        "playbackNote": "1.25× playback; matched to robot execution.",
        "poster": "assets/videos/wipe-table-prediction.jpg"
    },
    {
        "title": "Open the drawer",
        "description": "AtomWPM-predicted point trajectories for opening the drawer.",
        "protocol": "AtomWPM prediction",
        "src": "assets/videos/open-drawer-prediction-aligned.mp4",
        "playbackNote": "1.30× playback; matched to robot execution.",
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
  humanTransferVideos: [
    {
        "title": "Pick and place",
        "reference": {
            "title": "Human demonstration",
            "src": "assets/videos/human-transfer/pick-place-reference.mp4",
            "poster": "assets/videos/human-transfer/pick-place-reference.jpg"
        },
        "execution": {
            "title": "Robot execution",
            "src": "assets/videos/human-transfer/pick-place-execution.mp4",
            "poster": "assets/videos/human-transfer/pick-place-execution.jpg"
        }
    },
    {
        "title": "Fold the paper bag",
        "reference": {
            "title": "Human demonstration",
            "src": "assets/videos/human-transfer/fold-bag-reference.mp4",
            "poster": "assets/videos/human-transfer/fold-bag-reference.jpg"
        },
        "execution": {
            "title": "Robot execution",
            "src": "assets/videos/human-transfer/fold-bag-execution.mp4",
            "poster": "assets/videos/human-transfer/fold-bag-execution.jpg"
        }
    },
    {
        "title": "Wipe the table",
        "reference": {
            "title": "Human demonstration",
            "src": "assets/videos/human-transfer/wipe-table-reference.mp4",
            "poster": "assets/videos/human-transfer/wipe-table-reference.jpg"
        },
        "execution": {
            "title": "Robot execution",
            "src": "assets/videos/human-transfer/wipe-table-execution.mp4",
            "poster": "assets/videos/human-transfer/wipe-table-execution.jpg"
        }
    },
    {
        "title": "Open the drawer",
        "reference": {
            "title": "Human demonstration",
            "src": "assets/videos/human-transfer/open-drawer-reference.mp4",
            "poster": "assets/videos/human-transfer/open-drawer-reference.jpg"
        },
        "execution": {
            "title": "Robot execution",
            "src": "assets/videos/human-transfer/open-drawer-execution.mp4",
            "poster": "assets/videos/human-transfer/open-drawer-execution.jpg"
        }
    },
    {
        "title": "Pour",
        "reference": {
            "title": "Human demonstration",
            "src": "assets/videos/human-transfer/pour-reference.mp4",
            "poster": "assets/videos/human-transfer/pour-reference.jpg"
        },
        "execution": {
            "title": "Robot execution",
            "src": "assets/videos/human-transfer/pour-execution.mp4",
            "poster": "assets/videos/human-transfer/pour-execution.jpg"
        }
    }
],
  realWorldVideos: [
    {
        "title": "Pick and place",
        "description": "Pick up the cup and place it at the target position.",
        "protocol": "",
        "src": "assets/videos/real-world/01_pick_and_place_cup.mp4",
        "poster": "assets/videos/real-world/01_pick_and_place_cup.jpg"
    },
    {
        "title": "Pour with the cup",
        "description": "Move the cup toward the bowl, pour, and return the cup to the table.",
        "protocol": "",
        "src": "assets/videos/real-world/02_pour_with_cup.mp4",
        "poster": "assets/videos/real-world/02_pour_with_cup.jpg"
    },
    {
        "title": "Wipe the table",
        "description": "Wipe the table with the blue sponge.",
        "protocol": "",
        "src": "assets/videos/real-world/03_wipe_table.mp4",
        "poster": "assets/videos/real-world/03_wipe_table.jpg"
    },
    {
        "title": "Fold the paper bag",
        "description": "Fold the brown paper bag on the table.",
        "protocol": "",
        "src": "assets/videos/real-world/04_fold_paper_bag.mp4",
        "poster": "assets/videos/real-world/04_fold_paper_bag.jpg"
    },
    {
        "title": "Pull out the drawer",
        "description": "Pull out the appliance drawer by its handle.",
        "protocol": "",
        "src": "assets/videos/real-world/05_pull_out_drawer.mp4",
        "poster": "assets/videos/real-world/05_pull_out_drawer.jpg"
    }
],
  simulationVideos: [
    {
        "title": "LIBERO Spatial",
        "description": "Pick up the black bowl and place it on the plate.",
        "protocol": "Endpoint input \u00b7 118 frames \u00b7 4 chunks",
        "src": "assets/videos/simulation/01_libero_spatial.mp4",
        "poster": "assets/videos/simulation/01_libero_spatial.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "LIBERO Object",
        "description": "Pick up the butter and place it in the basket.",
        "protocol": "Endpoint input \u00b7 135 frames \u00b7 5 chunks",
        "src": "assets/videos/simulation/02_libero_object.mp4",
        "poster": "assets/videos/simulation/02_libero_object.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "LIBERO Goal",
        "description": "Put the wine bottle on top of the cabinet.",
        "protocol": "Endpoint input \u00b7 248 frames \u00b7 9 chunks",
        "src": "assets/videos/simulation/03_libero_goal.mp4",
        "poster": "assets/videos/simulation/03_libero_goal.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "LIBERO Long",
        "description": "Put the alphabet soup into the basket.",
        "protocol": "Endpoint input \u00b7 142 frames \u00b7 5 chunks",
        "src": "assets/videos/simulation/04_libero_long.mp4",
        "poster": "assets/videos/simulation/04_libero_long.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "RoboTwin 2.0: Adjust bottle",
        "description": "Take the green bottle and keep it upright.",
        "protocol": "Endpoint input \u00b7 81 frames \u00b7 3 chunks",
        "src": "assets/videos/simulation/05_robotwin_adjust_bottle.mp4",
        "poster": "assets/videos/simulation/05_robotwin_adjust_bottle.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "RoboTwin 2.0: Lift pot",
        "description": "Lift the pot with both arms, keeping the handles upright.",
        "protocol": "Endpoint input \u00b7 32 frames \u00b7 2 chunks",
        "src": "assets/videos/simulation/06_robotwin_lift_pot.mp4",
        "poster": "assets/videos/simulation/06_robotwin_lift_pot.jpg",
        "aspectRatio": "1440 / 760"
    },
    {
        "title": "RoboTwin 2.0: Place can in box",
        "description": "Place the selected red can inside the plastic box. Shown through 0:05.",
        "protocol": "Endpoint input \u00b7 first 5 seconds",
        "src": "assets/videos/simulation/08_robotwin_place_cans_plasticbox.mp4?v=5s",
        "poster": "assets/videos/simulation/08_robotwin_place_cans_plasticbox.jpg?v=5s",
        "aspectRatio": "1440 / 760"
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
