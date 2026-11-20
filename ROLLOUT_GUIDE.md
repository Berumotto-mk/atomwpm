# Rollout material for the AtomWPM project page

The current page already supports an overview video, prediction videos, and robot-execution videos through `dist/content.js`. These are suggested deliverables, not a request to run training or evaluation.

## Suggested first batch

| Placement | Suggested content | Suggested duration |
| --- | --- | --- |
| Overview | A short montage of the clearest trajectory and execution examples | 20–40 s |
| Real-world forecasting | Pick/place, fold bag, wipe, return sponge, pour, drawer | 5–12 s per task |
| Simulation forecasting | Representative LIBERO and RoboTwin tasks | 5–12 s per task |
| Robot execution | Input state, predicted trajectory, physical execution | 10–20 s per task |
| Human-to-robot transfer | Human demonstration, tracked points, robot execution | 10–20 s per task |

## Video layout

For prediction, use consistent panels: **observation / query points**, **ground truth**, **AtomWPM prediction**. Keep camera, point identity colors, spatial scale, and playback time aligned. When showing multiple methods, use the same scene, horizon, and endpoint setting. Do not use the video playhead position as a substitute for physical timestamps if predictions have irregular time steps.

For robot execution, show the initial state and predicted trajectories before the physical rollout. If using a human demonstration as trajectory input, label it explicitly rather than labeling it an AtomWPM forecast.

## Metadata to send with each result

- Dataset, task/instruction, episode/sample identifier, and split.
- Checkpoint/run and configuration; H1/H3, horizon and number of denoising steps.
- Whether target endpoint XYZ was supplied. Separate endpoint-conditioned and no-endpoint examples.
- Physical time span, coordinate frame, and units (metres for exported trajectory coordinates).
- Which panels are prediction versus ground truth; any masks, missing tracking, out-of-frame predictions, camera alignment or smoothing.
- For baselines: matched input conditions and any known prediction coverage or missing result.

Endpoint agreement under a hard constraint should not be presented as evidence that the full forecast path is accurate. Keep quantitative results tied to their measured evaluation protocol. Selected successful videos do not estimate overall success rate.

## Export

Use MP4 with H.264 video and `yuv420p`, preferably 1080p landscape, 24 or 30 fps for playback, and fast-start metadata. Playback fps is distinct from the trajectory sampling frequency. Avoid audio unless it conveys necessary information; annotate the instruction in the video or caption. Include a WebP/JPEG poster from the corresponding real rollout.

Suggested names:

```text
assets/videos/overview.mp4
assets/videos/real-pour-endpoint.mp4
assets/videos/real-pour-endpoint.webp
assets/videos/libero-spatial-no-endpoint.mp4
assets/videos/robot-wipe.mp4
assets/videos/human-to-robot-fold.mp4
```

The names are examples; no files or results are assumed to exist. For paired baselines, a single already-synchronized comparison video is easiest to publish consistently. If result videos become large, use an appropriate media host and place its HTTPS file URL in `src` rather than placing large files in Git history.
